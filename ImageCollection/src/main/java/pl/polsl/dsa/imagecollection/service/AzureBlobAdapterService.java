package pl.polsl.dsa.imagecollection.service;

import com.azure.storage.blob.BlobClientBuilder;
import com.azure.storage.blob.models.BlobProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.polsl.dsa.imagecollection.model.ImageEntity;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class AzureBlobAdapterService {

    @Autowired
    BlobClientBuilder client;


    public void upload(ImageEntity image) {
        String fileName = image.getOwner().getNickname()+ "/" + UUID.randomUUID().toString() +".jpg";
        InputStream iStream = new ByteArrayInputStream(image.getOriginalImage());
        client.blobName(fileName).buildClient().upload(iStream,image.getSize());
    }

    public byte[] getFile(String name) {
        try {
            File temp = new File("backup/viktor"+name);
            BlobProperties properties = client.blobName(name).buildClient().downloadToFile(temp.getPath());
            byte[] content = Files.readAllBytes(Paths.get(temp.getPath()));
            temp.delete();
            return content;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public boolean deleteFile(String name) {
        try {
            client.blobName(name).buildClient().delete();
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }

    }


}