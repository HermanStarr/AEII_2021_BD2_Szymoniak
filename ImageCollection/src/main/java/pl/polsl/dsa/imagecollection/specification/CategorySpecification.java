package pl.polsl.dsa.imagecollection.specification;

import pl.polsl.dsa.imagecollection.model.CategoryEntity;

import java.util.Map;

public class CategorySpecification extends MappedSpecificationWithCriteria<CategoryEntity> {
    private static final Map<String, FieldInfo> map = fieldMap(
            field("id", "id"),
            field("name", "name")
    );

    @Override
    public Map<String, MappedSpecificationWithCriteria.FieldInfo> getFieldMap() {
        return map;
    }
}
