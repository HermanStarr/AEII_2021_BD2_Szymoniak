package pl.polsl.dsa.imagecollection.service;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.polsl.dsa.imagecollection.dao.TagRepository;
import pl.polsl.dsa.imagecollection.dto.*;
import pl.polsl.dsa.imagecollection.exception.BadRequestException;
import pl.polsl.dsa.imagecollection.exception.ResourceNotFoundException;
import pl.polsl.dsa.imagecollection.model.TagEntity;
import pl.polsl.dsa.imagecollection.specification.SearchCriteria;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class TagService {
    private final TagRepository tagRepository;

    public TagService(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }


    @Transactional
    public TagEntity createTag(String name) {
        if (tagRepository.existsByName(name)) {
            TagEntity tag = new TagEntity();
            tag.setName(name);
            tagRepository.save(tag);
            return tag;
        } else {
            throw new BadRequestException("Tag with provided name already exists");
        }
    }


    public List<TagResponse> getTagList(SearchCriteria<TagEntity> criteria) {
        Specification<TagEntity> specification = criteria.getSpecification();
        return tagRepository.findAll(specification).stream().map(TagResponse::fromEntity).collect(Collectors.toList());
    }
}
