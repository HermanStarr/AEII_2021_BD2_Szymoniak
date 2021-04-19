package pl.polsl.dsa.imagecollection.exception;

public class ResourceNotFoundException extends RuntimeException{
    private String resource;
    private String field;
    private Object value;

    public ResourceNotFoundException(String resource, String field, Object value) {
        super(String.format("%s not found with field %s: '%s'", resource, field, value));
        this.resource = resource;
        this.field = field;
        this.value = value;
    }

    public ResourceNotFoundException(String message) {
        super(message);
    }

    public String getResource() {
        return resource;
    }

    public String getField() {
        return field;
    }

    public Object getValue() {
        return value;
    }
}
