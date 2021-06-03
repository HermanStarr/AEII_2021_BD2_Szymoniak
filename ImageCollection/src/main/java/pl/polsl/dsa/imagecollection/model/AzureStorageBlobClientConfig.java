package pl.polsl.dsa.imagecollection.model;

import com.azure.storage.blob.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AzureStorageBlobClientConfig {

    @Value("DefaultEndpointsProtocol=https;AccountName=dsabackupstorageblob;AccountKey=b5Esfj1mBazkLfSv5cE8C6+tp7b3KIIfCBFzzx6BiREkE+it0B5VH8RyRTxFC28gXZuKMpQN+c9ntAqQ0EAPfw==;EndpointSuffix=core.windows.net")
    String connectionString;

    @Value("test")
    String containerName;

    @Bean
    public BlobClientBuilder getClient() {
        BlobClientBuilder client = new BlobClientBuilder();
        client.connectionString(connectionString);
        client.containerName(containerName);
        return client;
    }
}