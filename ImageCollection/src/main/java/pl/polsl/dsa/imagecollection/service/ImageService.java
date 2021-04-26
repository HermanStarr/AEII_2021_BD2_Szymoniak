package pl.polsl.dsa.imagecollection.service;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.polsl.dsa.imagecollection.PaginatedResult;
import pl.polsl.dsa.imagecollection.SearchCriteria;
import pl.polsl.dsa.imagecollection.dao.ImageRepository;
import pl.polsl.dsa.imagecollection.dao.UserRepository;
import pl.polsl.dsa.imagecollection.dto.ImageRequest;
import pl.polsl.dsa.imagecollection.dto.ImageResponse;
import pl.polsl.dsa.imagecollection.dto.ImageThumbResponse;
import pl.polsl.dsa.imagecollection.exception.UnauthorizedException;
import pl.polsl.dsa.imagecollection.exception.ResourceNotFoundException;
import pl.polsl.dsa.imagecollection.model.ImageEntity;
import pl.polsl.dsa.imagecollection.model.UserEntity;

import java.time.LocalDateTime;

@Service
public class ImageService {
    private final ImageRepository imageRepository;
    private final UserRepository userRepository;

    public ImageService(ImageRepository imageRepository, UserRepository userRepository) {
        this.imageRepository = imageRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public void createImage(ImageRequest imageRequest, String nickname) {
        UserEntity user = userRepository.findByNickname(nickname)
                .orElseThrow(() -> new ResourceNotFoundException("User", "nickname", nickname));

        ImageEntity image = new ImageEntity();
        image.setName(imageRequest.getName());
        image.setCreationDate(LocalDateTime.now());
        image.setOriginalImage(imageRequest.getImage());
        image.setSize(imageRequest.getImage().length);
        image.setFormat(imageRequest.getFormat());
        image.setResolutionX(imageRequest.getResolutionX());
        image.setResolutionY(imageRequest.getResolutionY());
        image.setDescription(imageRequest.getDescription());
        image.setOwner(user);

        //TODO Add thumbnail processing, set categories and tags

        imageRepository.save(image);
    }

    public void editImage(ImageRequest imageRequest, Long id, String nickname) {
        UserEntity user = userRepository.findByNickname(nickname)
                .orElseThrow(() -> new ResourceNotFoundException("User", "nickname", nickname));

        ImageEntity image = imageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Image", "id", id));
        if (!image.getOwner().equals(user)) {
            throw new UnauthorizedException("User is not authorized to edit this image");
        }
        image.setName(imageRequest.getName());
        image.setDescription(imageRequest.getDescription());

        //TODO Set categories and tags

        imageRepository.save(image);
    }

    @Transactional(readOnly = true)
    public ImageResponse getImage(Long id) {
        ImageEntity image = imageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Image", "id", id));
        return ImageResponse.fromEntity(image);
    }

    @Transactional(readOnly = true)
    public PaginatedResult<ImageThumbResponse> getImageThumbnails(Long userId, Boolean mode, SearchCriteria<ImageEntity> criteria) {

        Specification<ImageEntity> specification;
        if (mode) {
            specification = criteria.getSpecification();
            //TODO Search with OR
        } else {
            specification = criteria.getSpecification();
        }
        if (userId != null) {
            specification = specification.and((Specification<ImageEntity>) (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("owner").get("nickname"), userId));
        }
        return new PaginatedResult<>(imageRepository
                .findAll(specification, criteria.getPaging())
                .map(ImageThumbResponse::fromEntity)
        );
    }

    @Transactional
    public void deleteImage(Long id, String nickname) {
        UserEntity user = userRepository.findByNickname(nickname)
                .orElseThrow(() -> new ResourceNotFoundException("User", "nickname", nickname));
        ImageEntity image = imageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Image", "id", id));
        if (!image.getOwner().equals(user)) {
            throw new UnauthorizedException("User is not authorized to delete this image");
        }
        imageRepository.deleteById(id);
    }
}
