package pl.polsl.dsa.imagecollection.model.category;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import pl.polsl.dsa.imagecollection.model.ImageEntity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "category_in_an_image")
public class CategoryInAnImage {

    @EmbeddedId
    private CategoryInAnImageId categoryInAnImageId;

    @ManyToOne
    @MapsId("categoryId")
    @JoinColumn(name = "category_id")
    private CategoryEntity category;

    @ManyToOne
    @MapsId("imageId")
    @JoinColumn(name = "image_id")
    private ImageEntity image;

    public CategoryInAnImageId getCategoryInAnImageId() {
        return categoryInAnImageId;
    }

    public void setCategoryInAnImageId(CategoryInAnImageId categoryInAnImageId) {
        this.categoryInAnImageId = categoryInAnImageId;
    }

    public CategoryEntity getCategory() {
        return category;
    }

    public void setCategory(CategoryEntity category) {
        this.category = category;
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
        CategoryInAnImage categoryInAnImage = (CategoryInAnImage) o;
        return Objects.equals(category, categoryInAnImage.category)
                && Objects.equals(image, categoryInAnImage.image);
    }

    @Override
    public int hashCode() {
        return Objects.hash(category, image);
    }

    @Override
    public String toString() {
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode id = objectMapper.createObjectNode();
        id.put("category_id", category.getId());
        id.put("image_id", image.getId());
        try {
            return objectMapper.writeValueAsString(id);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return id.toString();
        }
    }
}
