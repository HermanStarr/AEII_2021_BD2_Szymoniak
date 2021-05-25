
package pl.polsl.dsa.imagecollection.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.polsl.dsa.imagecollection.dto.*;
import pl.polsl.dsa.imagecollection.service.TagService;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/tag")
public class TagController {
  private final TagService tagService;

  public TagController(TagService tagService) {
    this.tagService = tagService;
  }

  @PostMapping
  public ResponseEntity<ApiResponse> addTag(@Valid @RequestBody TagRequest request) {
    tagService.createTag(request);
    return ResponseEntity.ok(
            new ApiResponse(true, "Added new Tag")
    );
  }

  @GetMapping
  public ResponseEntity<List<TagResponse>> getTagList() {
    return ResponseEntity.ok(tagService.getTagList());
  }

  @GetMapping("/{Name}")
  public ResponseEntity<TagResponse> getTagByName(TagRequest request){
    return ResponseEntity.ok(tagService.getTagByName(request));
  }
}