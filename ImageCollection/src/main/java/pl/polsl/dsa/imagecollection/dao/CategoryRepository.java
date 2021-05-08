package pl.polsl.dsa.imagecollection.dao;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;
import pl.polsl.dsa.imagecollection.model.CategoryEntity;
import pl.polsl.dsa.imagecollection.model.TagEntity;

import java.util.stream.Stream;

public interface CategoryRepository extends
        CrudRepository<CategoryEntity, Long>,
        JpaSpecificationExecutor<CategoryEntity> {
    Stream<CategoryEntity> getAll();
    CategoryEntity findByName (String name);
    }
