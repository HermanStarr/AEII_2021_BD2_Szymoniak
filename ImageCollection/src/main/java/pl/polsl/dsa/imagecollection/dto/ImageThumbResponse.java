package pl.polsl.dsa.imagecollection.dto;

import pl.polsl.dsa.imagecollection.model.ImageEntity;

public class ImageThumbResponse {
    private Long id;
    private String name;
    private Long ownerId;
    private String ownerNickname;
    private Byte[] thumb;

    public static ImageThumbResponse fromEntity(ImageEntity entity) {
        ImageThumbResponse dto = new ImageThumbResponse();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setOwnerId(entity.getOwner().getId());
        dto.setOwnerNickname(entity.getOwner().getNickname());
        dto.setThumb(entity.getThumbnail());

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

    public Byte[] getThumb() {
        return thumb;
    }

    public void setThumb(Byte[] thumb) {
        this.thumb = thumb;
    }
}
