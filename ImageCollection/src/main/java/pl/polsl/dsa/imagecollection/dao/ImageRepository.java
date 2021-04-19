package pl.polsl.dsa.imagecollection.dao;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.polsl.dsa.imagecollection.model.*;

import java.util.List;

@Repository
public interface ImageRepository extends CrudRepository<ImageEntity, Integer>, JpaSpecificationExecutor<ImageEntity> {
    public List<ImageEntity> getAllBySize(Integer size);
    public ImageEntity getById(Long id);
}