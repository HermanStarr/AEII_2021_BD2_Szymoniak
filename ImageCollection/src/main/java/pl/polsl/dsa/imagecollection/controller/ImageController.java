package pl.polsl.dsa.imagecollection.controller;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.polsl.dsa.imagecollection.service.ImageService;

@RestController
@RequestMapping("/api/image")
public class ImageController {
    private final ImageService imageService;

    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

}
