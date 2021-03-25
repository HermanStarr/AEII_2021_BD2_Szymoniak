package pl.polsl.dsa.imagecollection.model.tag;


import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class TagInAnImageId implements Serializable {
    @Column(name = "tag_id")
    private Long tagId;

    @Column(name = "image_id")
    private Long imageId;

    public Long getTagId() {
        return tagId;
    }

    public void setTagId(Long categoryId) {
        this.tagId = categoryId;
    }

    public Long getImageId() {
        return imageId;
    }

    public void setImageId(Long imageId) {
        this.imageId = imageId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if( o == null || getClass() != o.getClass()) {
            return false;
        }
        TagInAnImageId tagInAnImageId = (TagInAnImageId) o;
        return Objects.equals(tagId, tagInAnImageId.tagId)
                && Objects.equals(imageId, tagInAnImageId.imageId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(tagId, imageId);
    }
}
