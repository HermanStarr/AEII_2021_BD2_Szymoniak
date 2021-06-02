package pl.polsl.dsa.imagecollection.specification;

import pl.polsl.dsa.imagecollection.dto.FilterCriteria;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Root;


public abstract class MappedSpecificationWithCriteria<T> implements SpecificationWithCriteria<T> {

    private FilterCriteria criteria;

    public abstract Map<String, FieldInfo> getFieldMap();

    @Override
    public FilterCriteria getCriteria() {
        return criteria;
    }

    @Override
    public void setCriteria(FilterCriteria criteria) {
        this.criteria = criteria;
    }

    public boolean shouldThrowException(String field) {
        return true;
    }

    @Override
    public Expression<T> getPredicatePath(Root<T> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
        String field = criteria.getKey();
        FieldInfo fieldInfo = getFieldInfo(field);

        if (!fieldInfo.isFilterEnabled()) {
            throw new IllegalArgumentException(String.format(
                    "Invalid key: '%s'.",
                    field));
        }

        Path<T> path = root;

        for (String subPath : fieldInfo.getPath()) {
            path = path.get(subPath);
        }

        return path;
    }

    @Override
    public String getSortingProperty(String field) {
        if (field == null) {
            return null;
        }

        FieldInfo fieldInfo = getFieldInfo(field);

        if (fieldInfo == null) {
            return null;
        }
        if (!fieldInfo.isSortEnabled()) {
            throw new IllegalArgumentException(String.format(
                    "Invalid key: '%s'.",
                    field));
        }

        return String.join("_", fieldInfo.getPath());
    }

    protected FieldInfo getFieldInfo(String field) {
        FieldInfo fieldInfo = getFieldMap().get(field);

        if (fieldInfo == null && shouldThrowException(field)) {
            throw new IllegalArgumentException(String.format("Invalid key: '%s'.", field));
        }
        return fieldInfo;
    }

    protected static Map<String, FieldInfo> fieldMap(FieldInfo... fields) {
        return Arrays.stream(fields).collect(Collectors.toMap(FieldInfo::getField, f -> f));
    }


    public static FieldInfo field(String field, String... path) {
        return new FieldInfo(field, List.of(path));
    }

    public static class FieldInfo {
        private String field;
        private List<String> path;

        private boolean sortEnabled = true;
        private boolean filterEnabled = true;

        public FieldInfo(String field, List<String> path) {
            this.field = field;
            this.path = path;
        }

        public FieldInfo(String field, List<String> path, boolean sortEnabled, boolean filterEnabled) {
            this.field = field;
            this.path = path;
            this.sortEnabled = sortEnabled;
            this.filterEnabled = filterEnabled;
        }

        public FieldInfo noSort() {
            return new FieldInfo(field, path, false, sortEnabled);
        }

        public FieldInfo noFilter() {
            return new FieldInfo(field, path, sortEnabled, false);
        }

        public String getField() {
            return field;
        }

        public List<String> getPath() {
            return path;
        }

        public boolean isSortEnabled() {
            return sortEnabled;
        }

        public boolean isFilterEnabled() {
            return filterEnabled;
        }
    }
}
