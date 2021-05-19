package pl.polsl.dsa.imagecollection.dto;

import pl.polsl.dsa.imagecollection.model.TagEntity;

public class TagResponse {
    private Long id;
    private String name;

    public static TagResponse fromEntity(TagEntity entity) {
        TagResponse dto = new TagResponse();
        dto.setId(entity.getId());
        dto.setName(entity.getName());

        return dto;
    }

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

}
