package pl.polsl.dsa.imagecollection.specification;

import pl.polsl.dsa.imagecollection.model.ImageEntity;

import java.util.Map;

public class ImageSpecification extends MappedSpecificationWithCriteria<ImageEntity> {
    private static final Map<String, FieldInfo> map = fieldMap(
            field("id", "id"),
            field("name", "name"),
            field("ownerId", "owner", "id"),
            field("ownerNickname", "owner", "nickname"),
            field("creationDate", "creationDate"),
            field("categories", "categories"),
            field("tags", "tags")
    );

    @Override
    public Map<String, MappedSpecificationWithCriteria.FieldInfo> getFieldMap() {
        return map;
    }
}
