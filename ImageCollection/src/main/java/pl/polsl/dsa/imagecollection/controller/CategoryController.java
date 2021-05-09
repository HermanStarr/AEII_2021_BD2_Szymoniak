package pl.polsl.dsa.imagecollection.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.polsl.dsa.imagecollection.dto.CategoryRequest;
import pl.polsl.dsa.imagecollection.dto.CategoryResponse;
import pl.polsl.dsa.imagecollection.service.CategoryService;

import java.util.List;

@RestController
@RequestMapping("/category")
public class CategoryController {
    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public ResponseEntity<List<CategoryResponse>> getCategoryList(){
        return ResponseEntity.ok(categoryService.getCategoryList());
    }

    @GetMapping
    public ResponseEntity<CategoryResponse> getCategoryByName(CategoryRequest categoryRequest){
        return ResponseEntity.ok(categoryService.getCategoryByName(categoryRequest));
    }

    
}
