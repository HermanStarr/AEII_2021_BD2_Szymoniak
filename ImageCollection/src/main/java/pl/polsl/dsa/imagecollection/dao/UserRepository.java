package pl.polsl.dsa.imagecollection.dao;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.polsl.dsa.imagecollection.model.UserEntity;

import java.util.Optional;


@Repository
public interface UserRepository extends CrudRepository<UserEntity, Long>, JpaSpecificationExecutor<UserEntity> {
    Boolean existsByNickname(String nickname);
    Boolean existsByEmail(String email);
    Optional<UserEntity> findByNickname(String nickname);
    Optional<UserEntity> findById(Long id);
}
