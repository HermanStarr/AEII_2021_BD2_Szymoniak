
package pl.polsl.dsa.imagecollection.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.polsl.dsa.imagecollection.dto.*;
import pl.polsl.dsa.imagecollection.model.TagEntity;
import pl.polsl.dsa.imagecollection.service.TagService;
import pl.polsl.dsa.imagecollection.specification.SearchCriteria;
import pl.polsl.dsa.imagecollection.specification.Searchable;
import pl.polsl.dsa.imagecollection.specification.TagSpecification;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/tags")
public class TagController {
  private final TagService tagService;

  public TagController(TagService tagService) {
    this.tagService = tagService;
  }

  @Searchable(specification = TagSpecification.class)
  @GetMapping
  public ResponseEntity<List<TagResponse>> getTagList(SearchCriteria<TagEntity> criteria) {
    return ResponseEntity.ok(tagService.getTagList(criteria));
  }
}