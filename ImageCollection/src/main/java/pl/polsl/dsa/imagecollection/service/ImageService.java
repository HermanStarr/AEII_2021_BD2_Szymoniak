package pl.polsl.dsa.imagecollection.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.polsl.dsa.imagecollection.dao.ImageRepository;
import pl.polsl.dsa.imagecollection.dao.UserRepository;
import pl.polsl.dsa.imagecollection.dto.ImageRequest;
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

    }

}
