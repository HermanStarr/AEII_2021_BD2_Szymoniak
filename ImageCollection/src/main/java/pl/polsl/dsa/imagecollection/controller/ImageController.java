package pl.polsl.dsa.imagecollection.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pl.polsl.dsa.imagecollection.PaginatedResult;
import pl.polsl.dsa.imagecollection.specification.SearchCriteria;
import pl.polsl.dsa.imagecollection.dto.ApiResponse;
import pl.polsl.dsa.imagecollection.dto.ImageRequest;
import pl.polsl.dsa.imagecollection.dto.ImageResponse;
import pl.polsl.dsa.imagecollection.dto.ImageThumbResponse;
import pl.polsl.dsa.imagecollection.model.ImageEntity;
import pl.polsl.dsa.imagecollection.service.ImageService;
import pl.polsl.dsa.imagecollection.service.UserDetailsImpl;
import pl.polsl.dsa.imagecollection.specification.ImageSpecification;
import pl.polsl.dsa.imagecollection.specification.Searchable;


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
        imageService.editImage(request, imageId, getAuthorizedUser());
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
