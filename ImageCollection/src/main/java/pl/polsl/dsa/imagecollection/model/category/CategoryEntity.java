package pl.polsl.dsa.imagecollection.model.category;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "category")
public class CategoryEntity {
    @Id
    @SequenceGenerator(
            name = "category_sequence_generator",
            sequenceName = "category_sequence",
            allocationSize = 1
    )
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "category_sequence_generator")
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

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

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if( o == null || getClass() != o.getClass()) {
            return false;
        }
        CategoryEntity categoryEntity = (CategoryEntity) o;
        return Objects.equals(id, categoryEntity.id) && Objects.equals(name, categoryEntity.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name);
    }
}
