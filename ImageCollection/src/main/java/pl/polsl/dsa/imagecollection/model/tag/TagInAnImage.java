package pl.polsl.dsa.imagecollection.model.tag;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import pl.polsl.dsa.imagecollection.model.ImageEntity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "tag_in_an_image")
public class TagInAnImage {
    @EmbeddedId
    private TagInAnImageId tagInAnImageId;

    @ManyToOne
    @MapsId("tagId")
    @JoinColumn(name = "tag_id")
    private TagEntity tag;

    @ManyToOne
    @MapsId("imageId")
    @JoinColumn(name = "image_id")
    private ImageEntity image;

    public TagInAnImageId getTagInAnImageId() {
        return tagInAnImageId;
    }

    public void setTagInAnImageId(TagInAnImageId tagInAnImageId) {
        this.tagInAnImageId = tagInAnImageId;
    }

    public TagEntity getTag() {
        return tag;
    }

    public void setTag(TagEntity tag) {
        this.tag = tag;
    }

    public ImageEntity getImage() {
        return image;
    }

    public void setImage(ImageEntity image) {
        this.image = image;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if( o == null || getClass() != o.getClass()) {
            return false;
        }
        TagInAnImage tagInAnImage = (TagInAnImage) o;
        return Objects.equals(tag, tagInAnImage.tag)
                && Objects.equals(image, tagInAnImage.image);
    }

    @Override
    public int hashCode() {
        return Objects.hash(tag, image);
    }

    @Override
    public String toString() {
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode id = objectMapper.createObjectNode();
        id.put("tag_id", tag.getId());
        id.put("image_id", image.getId());
        try {
            return objectMapper.writeValueAsString(id);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return id.toString();
        }
    }
}
