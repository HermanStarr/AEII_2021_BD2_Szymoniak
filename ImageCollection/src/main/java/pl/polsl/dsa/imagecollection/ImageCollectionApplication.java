package pl.polsl.dsa.imagecollection;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import springfox.documentation.RequestHandler;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;



@SpringBootApplication
public class ImageCollectionApplication {

    public static void main(String[] args) {
        SpringApplication.run(ImageCollectionApplication.class, args);
    }

}
