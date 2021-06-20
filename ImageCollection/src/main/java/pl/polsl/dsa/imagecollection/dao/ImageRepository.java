package pl.polsl.dsa.imagecollection.dao;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pl.polsl.dsa.imagecollection.model.*;

import java.util.List;
import java.util.Set;

@Repository
public interface ImageRepository extends
        CrudRepository<ImageEntity, Long>,
        JpaSpecificationExecutor<ImageEntity> {

    @Query("select distinct i from ImageEntity i inner join i.categories c where c.id = :id")
    Set<ImageEntity> findAllByCategoryId(@Param("id") Long categoryId);

    public List<ImageEntity> getAllBySize(Integer size);
    public ImageEntity getById(Long id);
    List<ImageEntity> findAllByOwner(UserEntity user);
}