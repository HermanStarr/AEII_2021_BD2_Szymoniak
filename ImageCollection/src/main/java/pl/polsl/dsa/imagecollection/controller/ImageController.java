package pl.polsl.dsa.imagecollection.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
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

@RestController
@RequestMapping("/images")
public class ImageController {
    private final ImageService imageService;

    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse> addImage(@Valid @RequestBody ImageRequest request) {
        imageService.createImage(request, getAuthorizedUser());
        return ResponseEntity.ok(
                new ApiResponse(true, "Added image")
        );
    }

    @PutMapping("/{imageId}")
    public ResponseEntity<ApiResponse> editImage(
            @PathVariable Long imageId,
            @Valid @RequestBody ImageRequest request) {
        imageService.editImage(request, imageId, getAuthorizedUser());
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
        imageService.deleteImage(imageId, getAuthorizedUser());
        return ResponseEntity.ok(
                new ApiResponse(true, "Deleted image")
        );
    }

    String getAuthorizedUser() {
        UserDetails u = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return u.getUsername();
    }
}
