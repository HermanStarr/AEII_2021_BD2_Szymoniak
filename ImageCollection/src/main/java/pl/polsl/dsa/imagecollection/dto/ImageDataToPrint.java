package pl.polsl.dsa.imagecollection.dto;

import pl.polsl.dsa.imagecollection.model.ImageEntity;
import java.util.stream.Collectors;

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
        dto.setCategories(entity.getCategories().stream().map(CategoryResponse::fromEntity).map(CategoryResponse::getName).collect(Collectors.joining(", ")));
        dto.setTags(entity.getTags().stream().map(TagResponse::fromEntity).map(TagResponse::getName).collect(Collectors.joining(", ")));
        dto.setSize(entity.getSize().toString());

        return dto;
    }
}
