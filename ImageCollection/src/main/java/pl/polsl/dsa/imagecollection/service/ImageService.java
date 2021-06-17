package pl.polsl.dsa.imagecollection.service;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import pl.polsl.dsa.imagecollection.PaginatedResult;
import pl.polsl.dsa.imagecollection.dao.CategoryRepository;
import pl.polsl.dsa.imagecollection.dao.TagRepository;
import pl.polsl.dsa.imagecollection.dto.CategoryDTO;
import pl.polsl.dsa.imagecollection.model.CategoryEntity;
import pl.polsl.dsa.imagecollection.model.TagEntity;
import pl.polsl.dsa.imagecollection.specification.SearchCriteria;
import pl.polsl.dsa.imagecollection.dao.ImageRepository;
import pl.polsl.dsa.imagecollection.dao.UserRepository;
import pl.polsl.dsa.imagecollection.dto.ImageRequest;
import pl.polsl.dsa.imagecollection.dto.ImageResponse;
import pl.polsl.dsa.imagecollection.dto.ImageThumbResponse;
import pl.polsl.dsa.imagecollection.exception.ForbiddenException;
import pl.polsl.dsa.imagecollection.exception.ResourceNotFoundException;
import pl.polsl.dsa.imagecollection.model.ImageEntity;
import pl.polsl.dsa.imagecollection.model.UserEntity;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Locale;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.List;

@Service
public class ImageService {
    private final ImageRepository imageRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final TagRepository tagRepository;
    private final AzureBlobAdapterService azureBlobAdapterService;

    public ImageService(ImageRepository imageRepository, UserRepository userRepository, CategoryRepository categoryRepository,
                        TagRepository tagRepository, AzureBlobAdapterService azureBlobAdapterService ) {
        this.imageRepository = imageRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
        this.tagRepository = tagRepository;
        this.azureBlobAdapterService = azureBlobAdapterService;
    }

    @Transactional
    public void createImage(ImageRequest imageRequest, MultipartFile imageFile, String nickname) throws IOException {
        UserEntity user = userRepository.findByNickname(nickname)
                .orElseThrow(() -> new ResourceNotFoundException("User", "nickname", nickname));

        ImageEntity image = new ImageEntity();
        image.setName(imageRequest.getName());
        image.setCreationDate(LocalDateTime.now().withNano(0));
        float width = (imageRequest.getResolutionX() > imageRequest.getResolutionY()
                ? 1 : imageRequest.getResolutionX().floatValue() / imageRequest.getResolutionY());
        float height = (imageRequest.getResolutionY() > imageRequest.getResolutionX()
                ? 1 : imageRequest.getResolutionY().floatValue() / imageRequest.getResolutionX());
        image.setOriginalImage(resizeImage(imageFile.getBytes(), (int) (800 * width), (int) (800 * height)));
        image.setSize(image.getOriginalImage().length);
        image.setFormat(imageRequest.getFormat());
        image.setResolutionX((int)(width * 800));
        image.setResolutionY((int)(height * 800));
        image.setDescription(imageRequest.getDescription());
        image.setThumbnail(resizeImage(imageFile.getBytes(), (int) (200 * width), (int) (200 * height)));
        if (imageRequest.getCategories() != null) {
            image.setCategories(imageRequest.getCategories()
                    .stream()
                    .map(name -> categoryRepository.findByName(name.getName())
                            .orElseThrow(() -> new ResourceNotFoundException("Category", "name", name)))
                    .collect(Collectors.toSet()));
        }
        if (imageRequest.getTags() != null) {
            image.setTags(Arrays.stream(imageRequest.getTags().trim().split("\\s+"))
                    .map(name -> {
                        Optional<TagEntity> tag = tagRepository.findByNameIgnoreCase(name);
                        if (tag.isPresent()) {
                            return tag.get();
                        }
                        TagEntity newTag = new TagEntity();
                        newTag.setName(name.toLowerCase());
                        tagRepository.save(newTag);
                        return newTag;
                    })
                    .collect(Collectors.toSet()));
        }
        image.setOwner(user);
        imageRepository.save(image);
        if (image.getCategories().stream().anyMatch(CategoryEntity::getBackup)) {
            azureBlobAdapterService.upload(image);
        }
    }

    @Transactional
    public void manageBackedUpImagesAfterCategoryChange(Long categoryId, Boolean backupState) {
        imageRepository.findAllByCategoryId(categoryId).forEach(image -> {
            if (backupState) {
                if (image.getCategories().stream().noneMatch(category ->
                        category.getBackup().equals(true))) {
                    azureBlobAdapterService.upload(image);
                }
            } else {
                if (image.getCategories().stream().noneMatch(category ->
                        category.getBackup().equals(true)
                        && !category.getId().equals(categoryId))) {
                    azureBlobAdapterService.deleteFile(image, image.getName(), image.getCreationDate());
                }
            }
        });
    }

    @Transactional
    public void editImage(ImageRequest imageRequest, Long id, String nickname) {
        UserEntity user = userRepository.findByNickname(nickname)
                .orElseThrow(() -> new ResourceNotFoundException("User", "nickname", nickname));

        ImageEntity image = imageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Image", "id", id));
        if (!image.getOwner().equals(user) && !user.getAdmin()) {
            throw new ForbiddenException("User is not authorized to edit this image");
        }
        Boolean wasBackup = false;
        Boolean nameChanged = false;
        LocalDateTime oldDate = image.getCreationDate();
        for(CategoryEntity category : image.getCategories()) {
            if (category.getName().equalsIgnoreCase("backup")) {
                wasBackup = true;
                break;
            }
        }
        String oldName = "";
        if (!image.getName().equals(imageRequest.getName())){
            nameChanged = true;
            oldName = image.getName();
        }
        image.setName(imageRequest.getName());
        image.setDescription(imageRequest.getDescription());
        if (imageRequest.getCategories() != null) {
            image.setCategories(imageRequest.getCategories()
                    .stream()
                    .map(name -> categoryRepository.findByName(name.getName())
                            .orElseThrow(() -> new ResourceNotFoundException("Category", "name", name)))
                    .collect(Collectors.toSet()));
        }
        if (imageRequest.getTags() != null) {
            image.setTags(Arrays.stream(imageRequest.getTags().trim().split("\\s+"))
                    .map(name -> {
                        Optional<TagEntity> tag = tagRepository.findByNameIgnoreCase(name);
                        if (tag.isPresent()) {
                            return tag.get();
                        }
                        TagEntity newTag = new TagEntity();
                        newTag.setName(name.toLowerCase());
                        tagRepository.save(newTag);
                        return newTag;
                    })
                    .collect(Collectors.toSet()));
        }
        imageRepository.save(image);
        Boolean doBackup = false;
        for(CategoryDTO category : imageRequest.getCategories()) {
            if (category.getBackup()) {
                doBackup = true;
                break;
            }
        }
        if (doBackup && !wasBackup){
            azureBlobAdapterService.upload(image);
        }
        else if (!doBackup && wasBackup && !nameChanged){
            azureBlobAdapterService.deleteFile(image, image.getName(), oldDate);
        }
        else if (!doBackup && wasBackup && nameChanged) {
            azureBlobAdapterService.deleteFile(image, oldName, oldDate);
        }
        else if (doBackup && nameChanged){
            azureBlobAdapterService.deleteFile(image, oldName, oldDate);
            azureBlobAdapterService.upload(image);
        }
    }

    @Transactional(readOnly = true)
    public ImageResponse getImage(Long id) {
        ImageEntity image = imageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Image", "id", id));
        return ImageResponse.fromEntity(image);
    }

    @Transactional(readOnly = true)
    public PaginatedResult<ImageThumbResponse> getImageThumbnails(SearchCriteria<ImageEntity> criteria) {
        Page<ImageEntity> page = imageRepository.findAll(criteria.getSpecification(), criteria.getPaging());
        return new PaginatedResult<>(page.map(ImageThumbResponse::fromEntity));
    }

    @Transactional
    public void deleteImage(Long id, String nickname) {
        UserEntity user = userRepository.findByNickname(nickname)
                .orElseThrow(() -> new ResourceNotFoundException("User", "nickname", nickname));
        ImageEntity image = imageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Image", "id", id));
        if (!image.getOwner().equals(user) && !user.getAdmin()) {
            throw new ForbiddenException("User is not authorized to delete this image");
        }

        imageRepository.deleteById(id);
    }

    public byte[] resizeImage(byte[] image, int targetWidth, int targetHeight) throws IOException {
        ByteArrayInputStream is = new ByteArrayInputStream(image);
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
