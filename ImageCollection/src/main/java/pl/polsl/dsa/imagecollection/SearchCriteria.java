package pl.polsl.dsa.imagecollection;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

public class SearchCriteria<T> {
    private Specification<T> specification;
    private Pageable paging;

    public SearchCriteria(Specification<T> specification, Pageable paging) {
        this.specification = specification;
        this.paging = paging;
    }

    public Specification<T> getSpecification() {
        return specification;
    }

    public void setSpecification(Specification<T> specification) {
        this.specification = specification;
    }

    public Pageable getPaging() {
        return paging;
    }

    public void setPaging(Pageable paging) {
        this.paging = paging;
    }
}
