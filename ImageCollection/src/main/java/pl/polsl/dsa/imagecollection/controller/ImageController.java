package pl.polsl.dsa.imagecollection.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pl.polsl.dsa.imagecollection.PaginatedResult;
import pl.polsl.dsa.imagecollection.SearchCriteria;
import pl.polsl.dsa.imagecollection.dto.ApiResponse;
import pl.polsl.dsa.imagecollection.dto.ImageRequest;
import pl.polsl.dsa.imagecollection.dto.ImageResponse;
import pl.polsl.dsa.imagecollection.dto.ImageThumbResponse;
import pl.polsl.dsa.imagecollection.model.ImageEntity;
import pl.polsl.dsa.imagecollection.service.ImageService;
import pl.polsl.dsa.imagecollection.service.UserDetailsImpl;

import javax.validation.Valid;
import java.io.IOException;

@RestController
@RequestMapping("/images")
public class ImageController {
    private final ImageService imageService;

    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    @PostMapping(consumes = {"multipart/form-data", MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<ApiResponse> addImage(
            @Valid @RequestPart("input") ImageRequest request,
            @Valid @RequestPart("image") MultipartFile image,
            Authentication auth) throws IOException {
        var principal = (UserDetailsImpl) auth.getPrincipal();
        imageService.createImage(request, image, principal.getUsername());
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

    @GetMapping("/{isOr}")
    public ResponseEntity<PaginatedResult<ImageThumbResponse>> getImageThumbs(
            @PathVariable Boolean isOr,
            SearchCriteria<ImageEntity> searchCriteria ) {
        //TODO Add user authentication
        return ResponseEntity.ok(imageService.getImageThumbnails(null, isOr, searchCriteria));
    }

    @GetMapping("/{userId}/{isOr}")
    public ResponseEntity<PaginatedResult<ImageThumbResponse>> getUserImageThumbs(
            @PathVariable Long userId,
            @PathVariable Boolean isOr,
            SearchCriteria<ImageEntity> searchCriteria) {
        //TODO Add user authentication
        return ResponseEntity.ok(imageService.getImageThumbnails(userId, isOr, searchCriteria));
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
