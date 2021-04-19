package pl.polsl.dsa.imagecollection;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sun.istack.NotNull;
import org.springframework.data.domain.Page;

import java.util.List;

public class PaginatedResult<T> {
    @NotNull
    private List<T> items;

    @JsonProperty
    @NotNull
    private Long elementCount;

    public PaginatedResult(List<T> items, Long elementCount) {
        this.items = items;
        this.elementCount = elementCount;
    }

    public PaginatedResult(List<T> items) {
        this.items = items;
    }

    public PaginatedResult(Page<T> items) {
        this.items = items.getContent();
        this.elementCount = items.getTotalElements();
    }

    public List<T> getItems() {
        return items;
    }

    public void setItems(List<T> items) {
        this.items = items;
    }

    public Long getElementCount() {
        return elementCount;
    }

    public void setElementCount(Long elementCount) {
        this.elementCount = elementCount;
    }
}
