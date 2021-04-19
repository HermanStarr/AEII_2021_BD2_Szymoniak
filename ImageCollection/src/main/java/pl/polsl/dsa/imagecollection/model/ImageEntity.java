package pl.polsl.dsa.imagecollection.model;

import javax.persistence.*;
import java.time.LocalDateTime;
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
    @Column(name = "thumb")
    private Byte[] thumbnail;

    @Lob
    @Column(name = "image_proper")
    private Byte[] originalImage;

    @ManyToMany(mappedBy = "id_image", fetch = FetchType.LAZY)
    private Set<CategoryEntity> categories;

    @ManyToMany(mappedBy = "id_image", fetch = FetchType.LAZY)
    private Set<TagEntity> tags;

    @Column(name = "creation_date")
    private LocalDateTime creationDate;

    @Column(name = "size")
    private Integer size;

    @Column(name = "format")
    private String format;

    @Column(name = "resolution_x")
    private Short resolutionX;

    @Column(name = "resolution_y")
    private Short resolutionY;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

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

    public Byte[] getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(Byte[] thumbnail) {
        this.thumbnail = thumbnail;
    }

    public Byte[] getOriginalImage() {
        return originalImage;
    }

    public void setOriginalImage(Byte[] originalImage) {
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

    public Short getResolutionX() {
        return resolutionX;
    }

    public void setResolutionX(Short resolutionX) {
        this.resolutionX = resolutionX;
    }

    public Short getResolutionY() {
        return resolutionY;
    }

    public void setResolutionY(Short resolutionY) {
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
                && Objects.equals(creationDate, imageEntity.creationDate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, thumbnail, originalImage, creationDate, size, format, resolutionX, resolutionY, description);
    }


    public void setOwner(UserEntity owner) {
        this.owner = owner;
    }
}
