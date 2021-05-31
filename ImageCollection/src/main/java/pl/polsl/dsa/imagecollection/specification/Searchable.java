package pl.polsl.dsa.imagecollection.specification;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Searchable {
    Class specification();
    int defaultPageSize() default 20;
    int defaultPageNumber() default 0;
}
