package pl.polsl.dsa.imagecollection.dto;

import pl.polsl.dsa.imagecollection.model.ImageEntity;

public class ImageDataToPrint {
    private String name;
    private String size;
    private String categories;
    private String tags;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public String getCategories() {
        return categories;
    }

    public void setCategories(String categories) {
        this.categories = categories;
    }

    public String getTags() {
        return tags;
    }

    public void setTags(String tags) {
        this.tags = tags;
    }

    public static ImageDataToPrint fromEntity(ImageEntity entity) {
        ImageDataToPrint dto = new ImageDataToPrint();

        dto.setName(entity.getName());
        dto.setCategories(entity.getCategories().toString());
        dto.setSize(entity.getSize().toString());
        dto.setTags(entity.getTags().toString());

        return dto;
    }
}
