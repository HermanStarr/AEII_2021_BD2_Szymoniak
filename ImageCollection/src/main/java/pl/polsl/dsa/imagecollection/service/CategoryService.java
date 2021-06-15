package pl.polsl.dsa.imagecollection.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import pl.polsl.dsa.imagecollection.dao.CategoryRepository;
import pl.polsl.dsa.imagecollection.dao.ImageRepository;
import pl.polsl.dsa.imagecollection.dao.UserRepository;
import pl.polsl.dsa.imagecollection.dto.CategoryDTO;
import pl.polsl.dsa.imagecollection.exception.BadRequestException;
import pl.polsl.dsa.imagecollection.exception.ResourceNotFoundException;
import pl.polsl.dsa.imagecollection.model.CategoryEntity;
import pl.polsl.dsa.imagecollection.specification.SearchCriteria;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final ImageRepository imageRepository;
    private final ImageService imageService;

    public CategoryService(CategoryRepository categoryRepository, UserRepository userRepository, ImageRepository imageRepository, ImageService imageService) {
        this.categoryRepository = categoryRepository;
        this.imageRepository = imageRepository;
        this.imageService = imageService;
    }

    @Transactional(readOnly = true)
    public List<CategoryDTO> getCategories(SearchCriteria<CategoryEntity> criteria) {
        return categoryRepository
                .findAll(criteria.getSpecification())
                .stream()
                .map(CategoryDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional
    public void addCategory(MultipartFile icon, CategoryDTO dto) {
        CategoryEntity category;
        if (dto.getId() == null) {
            category = new CategoryEntity();
        } else {
            category = categoryRepository.findById(dto.getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Category", "id", dto.getId()));
            if (!dto.getBackup().equals(category.getBackup())) {
                imageService.manageBackedUpImagesAfterCategoryChange(category.getId(), dto.getBackup());
            }
        }
        category.setName(dto.getName());
        if (icon != null) {
            try {
                category.setIcon(imageService.resizeImage(icon.getBytes(), 150, 150));
            } catch (IOException e) {
                throw new BadRequestException("Icon could not be processed");
            }
        }
        category.setBackup(dto.getBackup() != null ? dto.getBackup() : false);
        categoryRepository.save(category);
    }

    @Transactional
    public void deleteCategory(Long id) {
        if (!categoryRepository.existsById(id)) {
            throw new ResourceNotFoundException("Category", "id", id);
        }
        imageRepository.findAllByCategoryId(id).forEach(image -> {
            image.setCategories(image.getCategories()
                    .stream()
                    .filter(cat -> !cat.getId().equals(id))
                    .collect(Collectors.toSet()));
            imageRepository.save(image);
        });
        categoryRepository.deleteById(id);
    }

    @Transactional
    public byte[] getCategoryIcon(Long id) {
        return categoryRepository.findById(id).orElseThrow().getIcon();
    }
}
