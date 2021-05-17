package pl.polsl.dsa.imagecollection.service;

import org.springframework.stereotype.Service;
import pl.polsl.dsa.imagecollection.dao.TagRepository;
import pl.polsl.dsa.imagecollection.dto.*;
import pl.polsl.dsa.imagecollection.model.TagEntity;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TagService {
    private final TagRepository tagRepository;

    public TagService(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    public TagResponse getTagByName(TagRequest request) {
        if (checkIfExist(request)) {
            TagEntity tag = tagRepository.findByName(request.getName());
            return TagResponse.fromEntity(tag);
        }
        else {
            createTag(request);
            return getTagByName(request);
        }
    }

    public void createTag(TagRequest request) {
        if (checkIfExist(request)) {
            TagEntity tag = new TagEntity();
            tag.setName(request.getName());
            tagRepository.save(tag);
        } else throw new IllegalArgumentException("Tag with provided name already exists");
    }

    public Boolean checkIfExist(TagRequest request) {
        //notsure czy bd działać
        return !tagRepository.findByName(request.getName()).getName().equals("");
    }

   // public List<String> getTagDropDownList(){
        //return tagRepository.getAll().forEach(x-> x.getName());
    //}

    public List<TagResponse> getTagList(){
        return tagRepository.getAll().map(TagResponse::fromEntity).collect(Collectors.toList());
    }
}
