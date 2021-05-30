package pl.polsl.dsa.imagecollection.dto;

import pl.polsl.dsa.imagecollection.model.ImageEntity;

import java.time.LocalDateTime;

public class ImageResponse {
    private Long id;
    private String name;
    private Long ownerId;
    private String ownerNickname;
    private byte[] image;
    private LocalDateTime creationDate;
    private Integer size;
    private String resolution;
    private String description;

    public static ImageResponse fromEntity(ImageEntity entity) {
        ImageResponse dto = new ImageResponse();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setOwnerId(entity.getOwner().getId());
        dto.setOwnerNickname(entity.getOwner().getNickname());
        dto.setImage(entity.getOriginalImage());
        dto.setCreationDate(entity.getCreationDate());
        dto.setSize(entity.getSize());
        dto.setResolution(String.format("%d x %d", entity.getResolutionX(), entity.getResolutionY()));
        dto.setDescription(entity.getDescription());

        //TODO Set categories and tags

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

    public Long getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(Long ownerId) {
        this.ownerId = ownerId;
    }

    public String getOwnerNickname() {
        return ownerNickname;
    }

    public void setOwnerNickname(String ownerNickname) {
        this.ownerNickname = ownerNickname;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public LocalDateTime getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDateTime creationDate) {
        this.creationDate = creationDate;
    }

    public Integer getSize() {
        return size;
    }

    public void setSize(Integer size) {
        this.size = size;
    }

    public String getResolution() {
        return resolution;
    }

    public void setResolution(String resolution) {
        this.resolution = resolution;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
