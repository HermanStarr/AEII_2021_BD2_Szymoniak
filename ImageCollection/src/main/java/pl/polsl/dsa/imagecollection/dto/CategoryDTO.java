package pl.polsl.dsa.imagecollection.dto;

import pl.polsl.dsa.imagecollection.model.CategoryEntity;

public class CategoryDTO {
    private Long id;
    private String name;
    private Boolean backup;

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

    public Boolean getBackup() {
        return backup;
    }

    public void setBackup(Boolean backup) {
        this.backup = backup;
    }

    public static CategoryDTO fromEntity(CategoryEntity entity) {
        CategoryDTO dto = new CategoryDTO();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setBackup(entity.getBackup());
        return dto;
    }

    public static CategoryEntity fromDto(CategoryDTO dto) {
        CategoryEntity category = new CategoryEntity();
        category.setId(dto.getId());
        category.setName(dto.getName());
        category.setBackup(dto.getBackup());
        return category;
    }

}
