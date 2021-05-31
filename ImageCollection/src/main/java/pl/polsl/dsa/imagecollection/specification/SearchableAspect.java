package pl.polsl.dsa.imagecollection.specification;

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

import javax.servlet.http.HttpServletRequest;
import java.lang.reflect.InvocationTargetException;
import java.util.Arrays;
import java.util.function.Supplier;
import java.util.stream.Stream;

@Aspect
@Component
public class SearchableAspect {
    private static final Logger logger = LoggerFactory.getLogger(SearchableAspect.class);

    @Around(value = "@annotation(searchable)")
    public Object injectSearchCriteria(ProceedingJoinPoint joinPoint, Searchable searchable) throws Throwable{
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder
                .currentRequestAttributes()).getRequest();

        String uri = request.getRequestURI();
        String query = request.getQueryString();
        String url = uri + "?" + query;

        MultiValueMap<String, String> parameters = UriComponentsBuilder.fromUriString(url).build().getQueryParams();

        String pageNumberParameter = parameters.getFirst("pageNumber");
        String pageSizeParameter = parameters.getFirst("pageSize");

        Integer pageNumber = pageNumberParameter != null
                ? Integer.parseInt(pageNumberParameter, 10) : searchable.defaultPageNumber();
        Integer pageSize = pageSizeParameter != null
                ? Integer.parseInt(pageSizeParameter, 10) : searchable.defaultPageSize();

        String sortBy = parameters.getFirst("sortBy");
        String sortOrderParameter = parameters.getFirst("sortOrder");
        Sort.Direction sortOrder = null;

        if (sortOrderParameter != null) {
            try {
                sortOrder = Sort.Direction.valueOf(sortOrderParameter.toUpperCase());
            } catch (IllegalArgumentException e) {
                return new ResponseEntity<>(
                        new ApiResponse(false, "Sort order passed is invalid"),
                        HttpStatus.BAD_REQUEST
                );
            }
        }
        CompositionType compositionType;
        String compositionTypeParameter = parameters.getFirst("searchType");
        if (compositionTypeParameter != null) {
            try {
                compositionType = CompositionType.valueOf(compositionTypeParameter.toUpperCase());
            } catch (IllegalArgumentException e) {
                return new ResponseEntity<>(
                        new ApiResponse(false, "Search type passed is invalid"),
                        HttpStatus.BAD_REQUEST
                );
            }
        } else {
            compositionType = CompositionType.AND;
        }

        String search = parameters.getFirst("search");

        Class specificationClass = searchable.specification();
        Supplier specificationSupplier = getSpecificationSupplier(specificationClass);

        SpecificationBuilder specificationBuilder = new SpecificationBuilder(specificationSupplier, compositionType);
        Specification specification = specificationBuilder.buildFromQuery(search);

        String sortingProperty;
        try {
            sortingProperty = ((SpecificationWithCriteria) getSpecificationSupplier(specificationClass).get()).getSortingProperty(sortBy);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(new ApiResponse(false, e.getMessage()), HttpStatus.BAD_REQUEST);
        }

        Pageable paging = getPaging(sortingProperty, sortOrder, pageNumber, pageSize);

        SearchCriteria searchCriteria = new SearchCriteria(specification, paging);
        Object[] existingArguments = joinPoint.getArgs();
        Object[] existingArgumentsWithoutSearchCriteria = Arrays.copyOfRange(existingArguments, 0, existingArguments.length - 1);
        Object[] newArguments = Stream.concat(Arrays.stream(existingArgumentsWithoutSearchCriteria), Stream.of(searchCriteria)).toArray();
        return joinPoint.proceed(newArguments);

    }

    private Pageable getPaging(String sortBy, Sort.Direction sortOrder, Integer pageNumber, Integer pageSize) {
        Sort sorting;
        if (sortBy != null) {
            if (sortOrder.isDescending()) {
                sorting = Sort.by(Sort.Order.desc(sortBy).ignoreCase());
            } else {
                sorting = Sort.by(Sort.Order.asc(sortBy).ignoreCase());
            }
        } else {
            sorting = Sort.unsorted();
        }
        return PageRequest.of(pageNumber, pageSize == -1 ? Integer.MAX_VALUE : pageSize, sorting);
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
}
