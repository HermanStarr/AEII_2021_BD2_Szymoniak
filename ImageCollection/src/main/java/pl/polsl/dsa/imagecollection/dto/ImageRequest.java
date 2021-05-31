package pl.polsl.dsa.imagecollection.dto;

import com.sun.istack.NotNull;

public class ImageRequest {
    @NotNull
    private String name;

    private byte[] image;
    @NotNull
    private String format;
    @NotNull
    private Integer resolutionX;
    @NotNull
    private Integer resolutionY;
    private String description;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
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
}
