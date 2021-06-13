package pl.polsl.dsa.imagecollection.specification;

import pl.polsl.dsa.imagecollection.model.UserEntity;

import java.util.Map;

public class UserSpecification extends MappedSpecificationWithCriteria<UserEntity> {
    private static final Map<String, FieldInfo> map = fieldMap(
            field("id", "id"),
            field("nickname", "nickname"),
            field("email", "email"),
            field("isAdmin", "isAdmin"),
            field("icon", "icon")
    );

    @Override
    public Map<String, MappedSpecificationWithCriteria.FieldInfo> getFieldMap() {
        return map;
    }
}
