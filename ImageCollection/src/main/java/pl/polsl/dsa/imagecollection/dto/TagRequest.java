package pl.polsl.dsa.imagecollection.dto;

import pl.polsl.dsa.imagecollection.model.TagEntity;

public class TagRequest {
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}