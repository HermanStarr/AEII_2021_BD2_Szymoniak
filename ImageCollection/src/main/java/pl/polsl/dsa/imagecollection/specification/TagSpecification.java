package pl.polsl.dsa.imagecollection.specification;

import pl.polsl.dsa.imagecollection.model.TagEntity;

import java.util.Map;

public class TagSpecification extends MappedSpecificationWithCriteria<TagEntity> {
    private static final Map<String, FieldInfo> map = fieldMap(
            field("id", "id"),
            field("name", "name")
    );

    @Override
    public Map<String, MappedSpecificationWithCriteria.FieldInfo> getFieldMap() {
        return map;
    }
}
