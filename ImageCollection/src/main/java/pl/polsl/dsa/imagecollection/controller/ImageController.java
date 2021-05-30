package pl.polsl.dsa.imagecollection.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.polsl.dsa.imagecollection.PaginatedResult;
import pl.polsl.dsa.imagecollection.specification.SearchCriteria;
import pl.polsl.dsa.imagecollection.dto.ApiResponse;
import pl.polsl.dsa.imagecollection.dto.ImageRequest;
import pl.polsl.dsa.imagecollection.dto.ImageResponse;
import pl.polsl.dsa.imagecollection.dto.ImageThumbResponse;
import pl.polsl.dsa.imagecollection.model.ImageEntity;
import pl.polsl.dsa.imagecollection.service.ImageService;
import pl.polsl.dsa.imagecollection.specification.ImageSpecification;
import pl.polsl.dsa.imagecollection.specification.Searchable;

import javax.validation.Valid;

@RestController
@RequestMapping("/images")
public class ImageController {
    private final ImageService imageService;

    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse> addImage(@Valid @RequestBody ImageRequest request) {
        //TODO Add user authorization
        imageService.createImage(request, "Some name");
        return ResponseEntity.ok(
                new ApiResponse(true, "Added image")
        );
    }

    @PutMapping("/{imageId}")
    public ResponseEntity<ApiResponse> editImage(
            @PathVariable Long imageId,
            @Valid @RequestBody ImageRequest request) {
        //TODO Add user authorization
        imageService.editImage(request, imageId, "Some name");
        return ResponseEntity.ok(
                new ApiResponse(true, "Edited image")
        );
    }

    @GetMapping("/{imageId}")
    public ResponseEntity<ImageResponse> getImage(@PathVariable Long imageId) {
        return ResponseEntity.ok(imageService.getImage(imageId));
    }

    @GetMapping
    @Searchable(specification = ImageSpecification.class)
    public ResponseEntity<PaginatedResult<ImageThumbResponse>> getImageThumbs(
            SearchCriteria<ImageEntity> searchCriteria) {
        return ResponseEntity.ok(imageService.getImageThumbnails(searchCriteria));
    }

    @DeleteMapping("/{imageId}")
    public ResponseEntity<ApiResponse> deleteImage(@PathVariable Long imageId) {
        //TODO Add user authentication
        imageService.deleteImage(imageId, "Some name");
        return ResponseEntity.ok(
                new ApiResponse(true, "Deleted image")
        );
    }
}
