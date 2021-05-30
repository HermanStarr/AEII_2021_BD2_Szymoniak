package pl.polsl.dsa.imagecollection.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.polsl.dsa.imagecollection.PaginatedResult;
import pl.polsl.dsa.imagecollection.SearchCriteria;
import pl.polsl.dsa.imagecollection.dto.ApiResponse;
import pl.polsl.dsa.imagecollection.dto.ImageRequest;
import pl.polsl.dsa.imagecollection.dto.ImageResponse;
import pl.polsl.dsa.imagecollection.dto.ImageThumbResponse;
import pl.polsl.dsa.imagecollection.model.ImageEntity;
import pl.polsl.dsa.imagecollection.service.ImageService;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

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
        imageService.createImage(request);
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

    @GetMapping("/image/{imageId}")
    public ResponseEntity<ImageResponse> getImage(@PathVariable Long imageId) {
        return ResponseEntity.ok(imageService.getImage(imageId));
    }

    @GetMapping()
    public ResponseEntity<PaginatedResult<ImageThumbResponse>> getImageThumbs() {
        //TODO Add user authentication
        //return ResponseEntity.ok(imageService.getImageThumbnails(null));
        return ResponseEntity.ok(new PaginatedResult<>(new ArrayList<>()));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<ImageThumbResponse>> getUserImageThumbs(@PathVariable Long userId) {
        //TODO Add user authentication
        return ResponseEntity.ok(imageService.getImageThumbnails(userId));
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
