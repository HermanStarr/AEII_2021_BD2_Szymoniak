package pl.polsl.dsa.imagecollection.dao;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.polsl.dsa.imagecollection.model.TagEntity;

@Repository
public interface TagRepository extends
        CrudRepository<TagEntity, Long>,
        JpaSpecificationExecutor<TagEntity> {
    TagEntity findByName (String name);
}
