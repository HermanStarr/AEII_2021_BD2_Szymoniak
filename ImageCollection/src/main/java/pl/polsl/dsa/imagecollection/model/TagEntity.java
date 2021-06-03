package pl.polsl.dsa.imagecollection.model;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "tag")
public class TagEntity {
    @Id
    @SequenceGenerator(
            name = "tag_sequence_generator",
            sequenceName = "tag_sequence",
            allocationSize = 1
    )
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "tag_sequence_generator")
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
        TagEntity tagEntity = (TagEntity) o;
        return Objects.equals(id, tagEntity.id) && Objects.equals(name, tagEntity.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name);
    }
}
