package pl.polsl.dsa.imagecollection.dao;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.polsl.dsa.imagecollection.model.ImageEntity;

@Repository
public interface ImageRepository extends CrudRepository<ImageEntity, Integer>, JpaSpecificationExecutor<ImageEntity> {

}