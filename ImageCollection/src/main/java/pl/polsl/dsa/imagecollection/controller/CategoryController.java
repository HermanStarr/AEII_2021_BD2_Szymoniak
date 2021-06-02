package pl.polsl.dsa.imagecollection.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pl.polsl.dsa.imagecollection.dao.UserRepository;
import pl.polsl.dsa.imagecollection.dto.ApiResponse;
import pl.polsl.dsa.imagecollection.dto.CategoryResponse;
import pl.polsl.dsa.imagecollection.exception.ForbiddenException;
import pl.polsl.dsa.imagecollection.exception.ResourceNotFoundException;
import pl.polsl.dsa.imagecollection.model.CategoryEntity;
import pl.polsl.dsa.imagecollection.model.UserEntity;
import pl.polsl.dsa.imagecollection.service.CategoryService;
import pl.polsl.dsa.imagecollection.specification.CategorySpecification;
import pl.polsl.dsa.imagecollection.specification.SearchCriteria;
import pl.polsl.dsa.imagecollection.specification.Searchable;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoryController {
    private final CategoryService categoryService;
    private final UserRepository userRepository;

    public CategoryController(CategoryService categoryService, UserRepository userRepository) {
        this.categoryService = categoryService;
        this.userRepository = userRepository;
    }

    @PostMapping
    public ResponseEntity<ApiResponse> addCategory(@Valid @RequestPart("icon") MultipartFile icon, String name) {
        UserDetails u = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        UserEntity user = userRepository.findByNickname(u.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User", "nickname", u.getUsername()));
        if (!user.getAdmin()) {
            throw new ForbiddenException("User is not authorized to create new categories");
        }
        categoryService.addCategory(icon, name);
        return ResponseEntity.ok(new ApiResponse(true, "Category created"));
    }

    @GetMapping
    @Searchable(specification = CategorySpecification.class)
    public ResponseEntity<List<CategoryResponse>> getCategories(SearchCriteria<CategoryEntity> criteria) {
        return ResponseEntity.ok(categoryService.getCategories(criteria));
    }
}
