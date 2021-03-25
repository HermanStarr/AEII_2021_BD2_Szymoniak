package pl.polsl.dsa.imagecollection.service;

import org.springframework.stereotype.Service;
import pl.polsl.dsa.imagecollection.dao.ImageRepository;

@Service
public class ImageService {
    private final ImageRepository imageRepository;

    public ImageService(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

}
