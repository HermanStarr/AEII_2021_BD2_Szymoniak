package pl.polsl.dsa.imagecollection.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class ForbiddenException extends RuntimeException{

    public ForbiddenException() {
        super("Not authorized");
    }

    public ForbiddenException(String message){
        super(message);
    }
}
