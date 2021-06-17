package pl.polsl.dsa.imagecollection.dto;

import pl.polsl.dsa.imagecollection.model.CategoryEntity;

public class CategoryDTO {
    private Long id;
    private String name;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public static CategoryDTO fromEntity(CategoryEntity entity) {
        CategoryDTO dto = new CategoryDTO();
        dto.setId(entity.getId());
        dto.setName(entity.getName());

        return dto;
    }
}
