package pl.polsl.dsa.imagecollection.specification;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Supplier;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import org.apache.commons.text.StringEscapeUtils;
import org.springframework.data.jpa.domain.Specification;
import pl.polsl.dsa.imagecollection.dto.FilterCriteria;
import pl.polsl.dsa.imagecollection.exception.BadRequestException;


public class SpecificationBuilder<E, S extends SpecificationWithCriteria<E>> {

    private final Supplier<S> specificationSupplier;
    private CompositionType compositionType;


    public SpecificationBuilder(Supplier<S> specificationSupplier, CompositionType compositionType) {
        this.specificationSupplier = specificationSupplier;
        this.compositionType = compositionType;
    }


    public Specification<E> buildFromQuery(String query) {
        if (query == null) {
            return null;
        }

        String decodedQuery;

        try {
            decodedQuery = URLDecoder.decode(query, StandardCharsets.UTF_8);
        } catch (Exception e) {
            throw new BadRequestException("Search parameter is coded wrong");
        }

        List<FilterCriteria> params = new ArrayList<>();

        Pattern pattern = Pattern.compile("([\\w%\\-.]+?)([:<>~])([\\w%\\- .\\\\/]+),?");

        Matcher matcher = pattern.matcher(decodedQuery + ",");

        while (matcher.find()) {

            String rawValue = matcher.group(3);

            try {
                String value = StringEscapeUtils.unescapeJava(rawValue);

                params.add(new FilterCriteria(
                        matcher.group(1),
                        matcher.group(2),
                        value));
            } catch (Exception e) {
                params.add(new FilterCriteria(
                        matcher.group(1),
                        matcher.group(2),
                        rawValue));
            }
        }

        if (params.isEmpty()) {
            return null;
        }

        List<Specification<E>> specs = params.stream()
                .map(p -> {
                    S specification = specificationSupplier.get();
                    specification.setCriteria(p);
                    return specification;
                }).collect(Collectors.toList());

        Specification<E> result = specs.get(0);

        for (int i = 1; i < params.size(); i++) {
            result = Specification.where(result);
            if (compositionType == CompositionType.AND) {
                result = result.and(specs.get(i));
            } else {
                result = result.or(specs.get(i));
            }
        }
        return result;
    }

}
