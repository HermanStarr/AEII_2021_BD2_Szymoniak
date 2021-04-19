package pl.polsl.dsa.imagecollection.dao;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;
import pl.polsl.dsa.imagecollection.model.CategoryEntity;

public interface CategoryRepository extends
        CrudRepository<CategoryEntity, Integer>,
        JpaSpecificationExecutor<CategoryEntity> {

}
