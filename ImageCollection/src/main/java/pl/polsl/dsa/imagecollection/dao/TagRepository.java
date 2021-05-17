package pl.polsl.dsa.imagecollection.dao;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;
import pl.polsl.dsa.imagecollection.model.TagEntity;
import java.util.Optional;
import java.util.stream.Stream;

public interface TagRepository extends
        CrudRepository<TagEntity, Long>,
        JpaSpecificationExecutor<TagEntity> {
    TagEntity findByName (String name);
    Stream<TagEntity> getAll();
}
