package pl.polsl.dsa.imagecollection.specification;

public @interface Searchable {
    Class specification();
    int defaultPageSize() default 20;
    int defaultPageNumber() default 0;
}
