package pl.polsl.dsa.imagecollection.specification;

import java.math.BigDecimal;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;
import pl.polsl.dsa.imagecollection.dto.FilterCriteria;
import pl.polsl.dsa.imagecollection.exception.BadRequestException;


public interface SpecificationWithCriteria<E> extends Specification<E> {

    void setCriteria(FilterCriteria criteria);

    FilterCriteria getCriteria();

    Expression getPredicatePath(Root<E> root, CriteriaQuery<?> query, CriteriaBuilder builder);

    String getSortingProperty(String queryArgument);

    @Override
    default Predicate toPredicate(Root<E> root, CriteriaQuery<?> query, CriteriaBuilder builder) {

        FilterCriteria criteria = getCriteria();

        Expression path;
        try {
            path = getPredicatePath(root, query, builder);
        } catch (IllegalArgumentException e) {
            throw new BadRequestException(e.getMessage());
        }
        if (criteria.getOperation().equalsIgnoreCase(">")) {
            if ("java.util.Date".equals(path.getJavaType().getName())
                    || "java.sql.Date".equals(path.getJavaType().getName())) {
                String dateString = criteria.getValue().toString();
                DateFormat format;
                if (dateString.length() == 10) {
                    format = new SimpleDateFormat("yyyy-MM-dd");
                } else {
                    format = new SimpleDateFormat("yyyy-MM-dd hh-mm");
                }
                try {
                    Date date = format.parse(dateString);
                    return builder.greaterThanOrEqualTo(path, date);
                } catch (ParseException e) {
                    return null;
                }
            } else if (path.getJavaType() == String.class) {
                return builder.greaterThanOrEqualTo(path, criteria.getValue().toString());
            } else if ("int".equals(path.getJavaType().getName()) || path.getJavaType().equals(Integer.class)
                    || path.getJavaType().equals(BigDecimal.class)) {
                return builder.greaterThanOrEqualTo(path, Double.valueOf(criteria.getValue().toString()));
            } else if (path.getJavaType().equals(LocalDate.class)) {
                return builder.greaterThanOrEqualTo(path, parseLocalDate(criteria.getValue().toString()));
            } else if (path.getJavaType().equals(LocalDateTime.class)) {
                return builder.greaterThanOrEqualTo(path, parseLocalDateTime(criteria.getValue().toString()));
            }
        } else if (criteria.getOperation().equalsIgnoreCase("<")) {
            if ("java.util.Date".equals(path.getJavaType().getName())
                    || "java.sql.Date".equals(path.getJavaType().getName())) {
                String dateString = criteria.getValue().toString();
                DateFormat format;
                if (dateString.length() == 10) {
                    format = new SimpleDateFormat("yyyy-MM-dd");
                } else {
                    format = new SimpleDateFormat("yyyy-MM-dd hh-mm");
                }
                try {
                    Date date = format.parse(dateString);
                    return builder.lessThanOrEqualTo(path, date);
                } catch (ParseException e) {
                    return null;
                }
            } else if (path.getJavaType() == String.class) {
                return builder.lessThanOrEqualTo(path, criteria.getValue().toString());
            } else if ("int".equals(path.getJavaType().getName()) || path.getJavaType().equals(Integer.class)
                    || path.getJavaType().equals(BigDecimal.class)) {
                return builder.lessThanOrEqualTo(path, Double.valueOf(criteria.getValue().toString()));
            } else if (path.getJavaType().equals(LocalDate.class)) {
                return builder.lessThanOrEqualTo(path, parseLocalDate(criteria.getValue().toString()));
            } else if (path.getJavaType().equals(LocalDateTime.class)) {
                return builder.lessThanOrEqualTo(path, parseLocalDateTime(criteria.getValue().toString()));
            }
        } else if (criteria.getOperation().equalsIgnoreCase(":")) {
            if (path.getJavaType() == String.class) {
                String value = criteria.getValue()
                        .toString()
                        .toLowerCase()
                        .replace("\\", "\\\\")
                        .replace("_", "\\_");

                return builder.like(builder.lower(path), "%" + value + "%");
            } else if (path.getJavaType() == Date.class
                    || path.getJavaType() == java.sql.Date.class
                    || path.getJavaType().isEnum()) {
                return builder.equal(path.as(String.class), criteria.getValue());
            } else if (path.getJavaType().equals(LocalDate.class)) {
                return builder.equal(path, parseLocalDate(criteria.getValue().toString()));
            } else if (path.getJavaType() == Boolean.class) {
                return builder.equal(path.as(Boolean.class), criteria.getValue().equals("true"));
            } else if (path.getJavaType() == Set.class) {
                return builder.like(path, criteria.getValue().toString());
            } else {
                if (criteria.getValue() == null) {
                    return builder.isNull(path);
                }
                return builder.equal(path, criteria.getValue());
            }
        } else if (criteria.getOperation().equalsIgnoreCase("=")) {
            if (path.getJavaType() == String.class) {
                return builder.equal(path, criteria.getValue());
            } else {
                if (criteria.getValue() == null) {
                    return builder.isNull(path);
                }
                return builder.equal(path, criteria.getValue());
            }

        } else if (criteria.getOperation().equalsIgnoreCase("~")) {
            if (path.getJavaType() == String.class) {
                List<String> values = Arrays.stream(criteria.getValue()
                        .toString()
                        .split("\\|")).collect(Collectors.toList());
                return builder.isTrue(path.in(values));
            } else if (path.getJavaType() == boolean.class || path.getJavaType() == Boolean.class) {
                List<Boolean> values = Arrays.stream(criteria.getValue()
                        .toString()
                        .split("\\|"))
                        .map(val -> val.equalsIgnoreCase("true"))
                        .collect(Collectors.toList());
                return builder.isTrue(path.in(values));
            } else if (path.getJavaType().isEnum()) {
                List<String> values = Arrays.stream(criteria.getValue()
                        .toString()
                        .split("\\|"))
                        .collect(Collectors.toList());
                return builder.isTrue(path.as(String.class).in(values));
            }
        }
        return null;
    }

    static LocalDate parseLocalDate(String dateString) {
        if (dateString == null) {
            return null;
        }

        return LocalDate.parse(
                dateString.substring(0, Math.min(10, dateString.length())),
                DateTimeFormatter.ISO_DATE
        );
    }

    static LocalDateTime parseLocalDateTime(String dateString) {
        if (dateString == null) {
            return null;
        }

        DateTimeFormatter format = DateTimeFormatter.ofPattern("yyyy-MM-dd HH-mm");
        return LocalDateTime.parse(dateString, format);
    }
}