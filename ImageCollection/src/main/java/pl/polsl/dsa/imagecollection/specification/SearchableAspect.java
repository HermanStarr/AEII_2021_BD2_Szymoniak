package pl.polsl.dsa.imagecollection.specification;

import java.io.UnsupportedEncodingException;
import java.lang.reflect.InvocationTargetException;
import java.util.Arrays;
import java.util.List;
import java.util.function.Supplier;
import java.util.stream.Stream;
import javax.servlet.http.HttpServletRequest;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.MultiValueMap;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.util.UriComponentsBuilder;
import pl.polsl.dsa.imagecollection.dto.ApiResponse;


@Aspect
@Component
public class SearchableAspect {

    private static final Logger logger = LoggerFactory.getLogger(SearchableAspect.class);

    @Around(value = "@annotation(searchable)")
    public Object injectSearchCriteria(ProceedingJoinPoint joinPoint, Searchable searchable) throws Throwable {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder
                .currentRequestAttributes()).getRequest();

        String uri = request.getRequestURI();
        String queryString = request.getQueryString();
        String fullQueryString = uri + '?' + queryString;

        MultiValueMap<String, String> parameters =
                UriComponentsBuilder.fromUriString(fullQueryString).build().getQueryParams();

        String pageNumberParam = parameters.getFirst("pageNumber");
        String pageSizeParam = parameters.getFirst("pageSize");

        int pageNumber = searchable.defaultPageNumber();
        int pageSize = searchable.defaultPageSize();

        if (pageNumberParam != null && pageSizeParam != null) {
            pageNumber = Integer.parseInt(pageNumberParam);
            pageSize = Integer.parseInt(pageSizeParam);
        }

        String sortBy = parameters.getFirst("sortBy");

        String sortOrderParam = parameters.getFirst("sortOrder");
        Sort.Direction sortOrder = null;
        if (sortOrderParam != null) {
            try {
                sortOrder = Sort.Direction.valueOf(sortOrderParam.toUpperCase());
            } catch (IllegalArgumentException e) {
                return new ResponseEntity<>(
                        new ApiResponse(false, "Given sorting order is invalid"),
                        HttpStatus.BAD_REQUEST);
            }
        }

        CompositionType compositionType;
        String compositionTypeParam = parameters.getFirst("searchType");
        if (compositionTypeParam != null) {
            try {
                compositionType = CompositionType.valueOf(compositionTypeParam.toUpperCase());
            } catch (IllegalArgumentException e) {
                return new ResponseEntity<>(
                        new ApiResponse(false, "Given composition type is invalid"),
                        HttpStatus.BAD_REQUEST);
            }
        } else {
            compositionType = CompositionType.AND;
        }

        String search = parameters.getFirst("search");

        Class specificationClass = searchable.specification();

        Specification specification = getSpecification(search, specificationClass, compositionType);

        String sortingProperty;
        try {
            sortingProperty =
                    ((SpecificationWithCriteria) getSpecificationSupplier(specificationClass).get()).getSortingProperty(sortBy);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(new ApiResponse(
                    false, e.getMessage()),
                    HttpStatus.BAD_REQUEST);
        }

        Sort sorting = getSorting(sortingProperty, sortOrder);
        Pageable paging = getPaging(pageNumber, pageSize, sorting);

        List<String> visibleColumns = null;
        String visibleColumnsParam = parameters.getFirst("visibleColumns");
        if (visibleColumnsParam != null) {
            visibleColumns = Arrays.asList(visibleColumnsParam.split(","));
        }

        SearchCriteria searchCriteria = new SearchCriteria(specification, paging, visibleColumns);

        Object[] existingArguments = joinPoint.getArgs();
        Object[] existingArgumentsWithoutSearchCriteria =
                Arrays.copyOfRange(existingArguments, 0, existingArguments.length - 1);
        Object[] newArguments = Stream.concat(
                Arrays.stream(existingArgumentsWithoutSearchCriteria),
                Stream.of(searchCriteria)).toArray();

        return joinPoint.proceed(newArguments);
    }

    private Specification getSpecification(String search, Class specificationClass, CompositionType compositionType)
            throws UnsupportedEncodingException {
        Supplier specificationSupplier = getSpecificationSupplier(specificationClass);
        SpecificationBuilder builder = new SpecificationBuilder(specificationSupplier, compositionType);
        return builder.buildFromQuery(search);
    }

    private Supplier getSpecificationSupplier(Class specificationClass) {
        return () -> {
            try {
                return specificationClass.getConstructor().newInstance();
            } catch (InstantiationException | IllegalAccessException | InvocationTargetException | NoSuchMethodException e) {
                logger.error(e.getMessage());
                return null;
            }
        };
    }

    private Sort getSorting(String sortBy, Sort.Direction sortDirection) {
        if (sortBy != null) {
            if (sortDirection == Sort.Direction.DESC) {
                return Sort.by(Sort.Order.desc(sortBy).ignoreCase());
            } else {
                return Sort.by(Sort.Order.asc(sortBy).ignoreCase());
            }
        } else {
            return Sort.unsorted();
        }
    }

    private Pageable getPaging(int pageNumber, int pageSize, Sort sorting) {
        int size;

        if (pageSize == -1) {
            size = Integer.MAX_VALUE;
        } else {
            size = pageSize;
        }

        return PageRequest.of(pageNumber, size, sorting);
    }

}
