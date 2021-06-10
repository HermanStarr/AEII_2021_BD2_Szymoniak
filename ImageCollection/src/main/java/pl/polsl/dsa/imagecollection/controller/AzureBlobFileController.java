package pl.polsl.dsa.imagecollection.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.polsl.dsa.imagecollection.dao.ImageRepository;
import pl.polsl.dsa.imagecollection.dao.UserRepository;
import pl.polsl.dsa.imagecollection.dto.ApiResponse;
import pl.polsl.dsa.imagecollection.exception.ResourceNotFoundException;
import pl.polsl.dsa.imagecollection.model.ImageEntity;
import pl.polsl.dsa.imagecollection.service.AzureBlobAdapterService;
import pl.polsl.dsa.imagecollection.service.ImageService;
import pl.polsl.dsa.imagecollection.specification.SearchCriteria;

import java.io.IOException;
import java.util.List;


@RestController
@RequestMapping("/backup")
public class AzureBlobFileController {
    @Autowired
    AzureBlobAdapterService azureAdapter;
    @Autowired
    UserRepository userRepository;
    @Autowired
    ImageRepository imageRepository;
    @Autowired
    ImageService imageService;

/*
    @PostMapping(path = "/upload", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public Map<String, String> uploadFile(@RequestPart(value = "file", required = true) MultipartFile files)  {
        String name = azureAdapter.upload(files, "prefix");
        Map<String, String> result = new HashMap<>();
        result.put("key", name);
        return result;
    }
*/

    @PostMapping(path = "/upload")
    public ResponseEntity<ApiResponse> uploadFile(SearchCriteria<ImageEntity> criteria) {
        List<ImageEntity> images = imageService.getImageThumbnailsBackup(criteria);
        if (images.isEmpty()) {
            throw new ResourceNotFoundException("No images found");
        }
        for (ImageEntity image : images) {
            azureAdapter.upload(image);
        }
        return ResponseEntity.ok(
                new ApiResponse(true,"Backup executed successfully!"));
    }



    @GetMapping(path = "/download")
    public ResponseEntity<ByteArrayResource> downloadFile(@RequestParam(value = "file") String file) throws IOException {
        byte[] data = azureAdapter.getFile(file);
        ByteArrayResource resource = new ByteArrayResource(data);

        return ResponseEntity
                .ok()
                .contentLength(data.length)
                .header("Content-type", "application/octet-stream")
                .header("Content-disposition", "attachment; filename=\"" + file + "\"")
                .body(resource);

    }
/*
    @GetMapping(path = "/download")
    public ResponseEntity<ByteArrayResource> downloadFile(@RequestParam(value = "file") String file) throws IOException {
        byte[] data = azureAdapter.getFile(file);
        ByteArrayResource resource = new ByteArrayResource(data);

        return ResponseEntity
                .ok()
                .contentLength(data.length)
                .header("Content-type", "application/octet-stream")
                .header("Content-disposition", "attachment; filename=\"" + file + "\"")
                .body(resource);

    }

 */
}