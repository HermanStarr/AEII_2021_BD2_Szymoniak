package pl.polsl.dsa.imagecollection.dto;

import com.sun.istack.NotNull;

import java.util.Set;

public class ImageRequest {
    @NotNull
    private String name;

    @NotNull
    private String format;
    @NotNull
    private Integer resolutionX;
    @NotNull
    private Integer resolutionY;
    private String description;
    private Integer size;
    private Set<CategoryResponse> categories;
    private String tags;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFormat() {
        return format;
    }

    public void setFormat(String format) {
        this.format = format;
    }

    public Integer getResolutionX() {
        return resolutionX;
    }

    public void setResolutionX(Integer resolutionX) {
        this.resolutionX = resolutionX;
    }

    public Integer getResolutionY() {
        return resolutionY;
    }

    public void setResolutionY(Integer resolutionY) {
        this.resolutionY = resolutionY;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getSize() { return size; }

    public void setSize(Integer size) { this.size = size; }

    public Set<CategoryResponse> getCategories() { return categories; }

    public void setCategories(Set<CategoryResponse> categories) { this.categories = categories; }

    public String getTags() { return tags; }

    public void setTags(String tags) { this.tags = tags; }
}
