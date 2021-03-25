package pl.polsl.dsa.imagecollection.model.category;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class CategoryInAnImageId implements Serializable {

    @Column(name = "category_id")
    private Long categoryId;

    @Column(name = "image_id")
    private Long imageId;

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
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
        CategoryInAnImageId categoryInAnImageId = (CategoryInAnImageId) o;
        return Objects.equals(categoryId, categoryInAnImageId.categoryId)
                && Objects.equals(imageId, categoryInAnImageId.imageId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(categoryId, imageId);
    }
}
