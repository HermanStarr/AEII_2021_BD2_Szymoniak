package pl.polsl.dsa.imagecollection.service;

import com.azure.storage.blob.BlobClientBuilder;
import com.azure.storage.blob.models.BlobProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.polsl.dsa.imagecollection.model.ImageEntity;

import java.io.*;
import java.time.LocalDateTime;



@Service
public class AzureBlobAdapterService {

    @Autowired
    BlobClientBuilder client;

    public void upload(ImageEntity image) {
        String fileName = image.getOwner().getNickname()+"/"+ image.getName()+image.getCreationDate().toString() +".jpg";
        InputStream iStream = new ByteArrayInputStream(image.getOriginalImage());
        client.blobName(fileName).buildClient().upload(iStream,image.getSize());
    }

    public boolean deleteFile(ImageEntity image, String name, LocalDateTime oldDate) {
        String id = (image.getOwner().getNickname()+"/"+name+oldDate.toString()+".jpg");
        try {
            System.out.println(id);
            client.blobName(id).buildClient().delete();
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

}