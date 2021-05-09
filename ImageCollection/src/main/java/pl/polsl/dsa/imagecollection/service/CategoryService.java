package pl.polsl.dsa.imagecollection.service;

import org.springframework.stereotype.Service;
import pl.polsl.dsa.imagecollection.dao.CategoryRepository;
import pl.polsl.dsa.imagecollection.dto.*;
import pl.polsl.dsa.imagecollection.exception.ResourceNotFoundException;
import pl.polsl.dsa.imagecollection.model.CategoryEntity;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public CategoryResponse getCategoryByName(CategoryRequest request) {
        if (checkIfExist(request)) {
            CategoryEntity category = categoryRepository.findByName(request.getName());
            return CategoryResponse.fromEntity(category);
        }
        else {
           throw new ResourceNotFoundException("Following category does not exitsts");
        }
    }

    public Boolean checkIfExist(CategoryRequest request) {
        //notsure czy bd działać
        return !categoryRepository.findByName(request.getName()).getName().equals("");
    }

    public List<CategoryResponse> getCategoryList(){
        return categoryRepository.getAll().map(CategoryResponse::fromEntity).collect(Collectors.toList());
    }
}
