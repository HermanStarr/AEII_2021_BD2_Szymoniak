package pl.polsl.dsa.imagecollection.exception;

public class UnauthorizedException extends RuntimeException{

    public UnauthorizedException() {
        super("Not authorized");
    }

    public UnauthorizedException(String message){
        super(message);
    }
}
