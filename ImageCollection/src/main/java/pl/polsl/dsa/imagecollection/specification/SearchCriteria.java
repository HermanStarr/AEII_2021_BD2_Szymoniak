package pl.polsl.dsa.imagecollection.specification;

import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

public class SearchCriteria<T> {

    private Specification<T> specification;
    private Pageable paging;
    private List<String> visibleColumns;


    public SearchCriteria(Specification<T> specification, Pageable paging, List<String> visibleColumns) {
        this.specification = specification;
        this.paging = paging;
        this.visibleColumns = visibleColumns;
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

    public List<String> getVisibleColumns() {
        return visibleColumns;
    }

    public void setVisibleColumns(List<String> visibleColumns) {
        this.visibleColumns = visibleColumns;
    }
}

