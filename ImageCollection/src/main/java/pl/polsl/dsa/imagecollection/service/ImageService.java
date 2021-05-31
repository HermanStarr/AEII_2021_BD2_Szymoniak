package pl.polsl.dsa.imagecollection.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import pl.polsl.dsa.imagecollection.PaginatedResult;
import pl.polsl.dsa.imagecollection.specification.SearchCriteria;
import pl.polsl.dsa.imagecollection.dao.ImageRepository;
import pl.polsl.dsa.imagecollection.dao.UserRepository;
import pl.polsl.dsa.imagecollection.dto.ImageRequest;
import pl.polsl.dsa.imagecollection.dto.ImageResponse;
import pl.polsl.dsa.imagecollection.dto.ImageThumbResponse;
import pl.polsl.dsa.imagecollection.exception.ForbiddenException;
import pl.polsl.dsa.imagecollection.exception.ResourceNotFoundException;
import pl.polsl.dsa.imagecollection.model.CategoryEntity;
import pl.polsl.dsa.imagecollection.model.ImageEntity;
import pl.polsl.dsa.imagecollection.model.TagEntity;
import pl.polsl.dsa.imagecollection.model.UserEntity;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.stream.Collectors;

@Service
public class ImageService {
    private final ImageRepository imageRepository;
    private final UserRepository userRepository;

    public ImageService(ImageRepository imageRepository, UserRepository userRepository) {
        this.imageRepository = imageRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public void createImage(ImageRequest imageRequest, MultipartFile imageFile, String nickname) throws IOException {
        UserEntity user = userRepository.findByNickname(nickname)
                .orElseThrow(() -> new ResourceNotFoundException("User", "nickname", nickname));

        //DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        ImageEntity image = new ImageEntity();
        image.setName(imageRequest.getName());
        image.setCreationDate(LocalDateTime.now().withNano(0));
        image.setOriginalImage(imageFile.getBytes());
        image.setSize(imageFile.getBytes().length);
        image.setFormat(imageRequest.getFormat());
        image.setResolutionX(imageRequest.getResolutionX());
        image.setResolutionY(imageRequest.getResolutionY());
        image.setDescription(imageRequest.getDescription());
        //set proper width and height
        image.setThumbnail(resizeImage(imageFile.getBytes(),100,100));
//        image.setCategories(imageRequest.getCategories()
//                .stream()
//                .map(category -> {
//                    CategoryEntity categoryEntity =  new CategoryEntity();
//                    categoryEntity.setId(category.getId());
//                    categoryEntity.setName(category.getName());
//                    return categoryEntity;
//                }).collect(Collectors.toSet()));
//
//        image.setTags(imageRequest.getTags()
//            .stream()
//            .map(tags -> {
//                TagEntity tagEntity =  new TagEntity();
//                tagEntity.setId(tags.getId());
//                tagEntity.setName(tags.getName());
//                return tagEntity;
//            }).collect(Collectors.toSet()));

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
            throw new ForbiddenException("User is not authorized to edit this image");
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
    public PaginatedResult<ImageThumbResponse> getImageThumbnails(SearchCriteria<ImageEntity> criteria) {
        return new PaginatedResult<>(imageRepository
                .findAll(criteria.getSpecification(), criteria.getPaging())
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
            throw new ForbiddenException("User is not authorized to delete this image");
        }
        imageRepository.deleteById(id);
    }

    public byte[] resizeImage(byte[] image, int targetWidth, int targetHeight) throws IOException {
        InputStream is = new ByteArrayInputStream(image);
        BufferedImage originalImage = ImageIO.read(is);

        BufferedImage resizedImage = new BufferedImage(targetWidth, targetHeight, BufferedImage.TYPE_INT_RGB);
        Graphics2D graphics2D = resizedImage.createGraphics();
        graphics2D.drawImage(originalImage, 0, 0, targetWidth, targetHeight, null);
        graphics2D.dispose();

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(resizedImage, "jpg", baos);
        return baos.toByteArray();
    }
}
