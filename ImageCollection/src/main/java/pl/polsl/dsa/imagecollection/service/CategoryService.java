package pl.polsl.dsa.imagecollection.service;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import pl.polsl.dsa.imagecollection.dao.CategoryRepository;
import pl.polsl.dsa.imagecollection.dao.UserRepository;
import pl.polsl.dsa.imagecollection.dto.CategoryResponse;
import pl.polsl.dsa.imagecollection.model.CategoryEntity;
import pl.polsl.dsa.imagecollection.specification.SearchCriteria;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository, UserRepository userRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Transactional(readOnly = true)
    public List<CategoryResponse> getCategories(SearchCriteria<CategoryEntity> criteria) {
        return categoryRepository
                .findAll(criteria.getSpecification())
                .stream()
                .map(CategoryResponse::fromEntity)
                .collect(Collectors.toList());
    }

    public void addCategory(MultipartFile icon, String name) {

    }
}
