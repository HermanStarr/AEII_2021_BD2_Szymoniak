package pl.polsl.dsa.imagecollection.dto;

import pl.polsl.dsa.imagecollection.model.ImageEntity;

import java.time.LocalDateTime;
import java.util.Base64;
import java.util.Set;
import java.util.stream.Collectors;

public class ImageResponse {
    private Long id;
    private String name;
    private Long ownerId;
    private String ownerNickname;
    private String image;
    private LocalDateTime creationDate;
    private Integer size;
    private Integer resolutionX;
    private Integer resolutionY;
    private String description;
    private Set<TagResponse> tags;
    private Set<CategoryResponse> categories;

    public static ImageResponse fromEntity(ImageEntity entity) {
        ImageResponse dto = new ImageResponse();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setOwnerId(entity.getOwner().getId());
        dto.setOwnerNickname(entity.getOwner().getNickname());
        dto.setImage(Base64.getEncoder().encodeToString(entity.getOriginalImage()));
        dto.setCreationDate(entity.getCreationDate());
        dto.setSize(entity.getSize());
        dto.setResolutionX(entity.getResolutionX());
        dto.setResolutionY(entity.getResolutionY());
        dto.setDescription(entity.getDescription());
        dto.setTags(entity.getTags().stream().map(TagResponse::fromEntity).collect(Collectors.toSet()));
        dto.setCategories(entity.getCategories().stream().map(CategoryResponse::fromEntity).collect(Collectors.toSet()));

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

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public Set<TagResponse> getTags() {
        return tags;
    }

    public void setTags(Set<TagResponse> tags) {
        this.tags = tags;
    }

    public Set<CategoryResponse> getCategories() {
        return categories;
    }

    public void setCategories(Set<CategoryResponse> categories) {
        this.categories = categories;
    }
}
