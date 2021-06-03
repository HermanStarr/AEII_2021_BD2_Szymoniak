package pl.polsl.dsa.imagecollection.model;

import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "image")
public class ImageEntity {

    @Id
    @SequenceGenerator(
            name = "image_sequence_generator",
            sequenceName = "image_sequence",
            allocationSize = 1
    )
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "image_sequence_generator")
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Lob
    @Type(type = "org.hibernate.type.BinaryType")
    @Column(name = "thumb")
    private byte[] thumbnail;

    @Lob
    @Type(type = "org.hibernate.type.BinaryType")
    @Column(name = "image_proper")
    private byte[] originalImage;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name="many_category_has_many_image",
            joinColumns = @JoinColumn(name="id_image", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name="id_category", referencedColumnName = "id"))
    private Set<CategoryEntity> categories;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name="many_tag_has_many_image",
            joinColumns = @JoinColumn(name="id_image", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name="id_tag", referencedColumnName = "id"))
    private Set<TagEntity> tags;

    @Column(name = "creation_date")
    private LocalDateTime creationDate;

    @Column(name = "size")
    private Integer size;

    @Column(name = "format")
    private String format;

    @Column(name = "resolution_x")
    private Integer resolutionX;

    @Column(name = "resolution_y")
    private Integer resolutionY;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    public UserEntity getOwner() {
        return owner;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="id_user", referencedColumnName = "id")
    private UserEntity owner;

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

    public byte[] getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(byte[] thumbnail) {
        this.thumbnail = thumbnail;
    }

    public byte[] getOriginalImage() {
        return originalImage;
    }

    public void setOriginalImage(byte[] originalImage) {
        this.originalImage = originalImage;
    }

    public Set<CategoryEntity> getCategories() {
        return categories;
    }

    public void setCategories(Set<CategoryEntity> categories) {
        this.categories = categories;
    }

    public Set<TagEntity> getTags() {
        return tags;
    }

    public void setTags(Set<TagEntity> tagEntities) {
        this.tags = tagEntities;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if( o == null || getClass() != o.getClass()) {
            return false;
        }
        ImageEntity imageEntity = (ImageEntity) o;
        return Objects.equals(id, imageEntity.id)
                && Objects.equals(name, imageEntity.name)
                && Arrays.equals(thumbnail, imageEntity.thumbnail)
                && Arrays.equals(originalImage, imageEntity.originalImage)
                && Objects.equals(creationDate, imageEntity.creationDate)
                && Objects.equals(size, imageEntity.size)
                && Objects.equals(format, imageEntity.format)
                && Objects.equals(resolutionX, imageEntity.resolutionX)
                && Objects.equals(resolutionY, imageEntity.resolutionY)
                && Objects.equals(description, imageEntity.description)
                && Objects.equals(owner, imageEntity.owner);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, Arrays.hashCode(thumbnail), Arrays.hashCode(originalImage), creationDate, size, format, resolutionX, resolutionY, description, owner);
    }


    public void setOwner(UserEntity owner) {
        this.owner = owner;
    }
}
