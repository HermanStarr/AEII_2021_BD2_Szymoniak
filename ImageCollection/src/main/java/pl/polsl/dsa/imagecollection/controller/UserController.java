package pl.polsl.dsa.imagecollection.controller;

import net.sf.jasperreports.engine.JRException;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.polsl.dsa.imagecollection.PaginatedResult;
import pl.polsl.dsa.imagecollection.dao.UserRepository;
import pl.polsl.dsa.imagecollection.dto.UserPublicResponse;
import pl.polsl.dsa.imagecollection.model.UserEntity;
import pl.polsl.dsa.imagecollection.service.UserService;
import pl.polsl.dsa.imagecollection.specification.SearchCriteria;
import pl.polsl.dsa.imagecollection.specification.Searchable;
import pl.polsl.dsa.imagecollection.specification.UserSpecification;

import java.io.IOException;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserRepository userRepository;
    private final UserService userService;

    public UserController(UserRepository userRepository, UserService userService) {
        this.userRepository = userRepository;
        this.userService = userService;
    }


    @GetMapping(value = "{userId}/picture")
    public ResponseEntity<?> getUserPicture(@PathVariable  Long userId) {
        var bytes =  userRepository.findById(userId)
            .orElseThrow()
            .getIcon();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_PNG);

        return new ResponseEntity<>(bytes, headers, HttpStatus.OK);
    }

    @GetMapping("/{nickname}")
    public ResponseEntity<UserPublicResponse> getUser(@PathVariable String nickname) {
        return ResponseEntity.ok(userService.getUser(nickname));
    }

    @GetMapping
    @Searchable(specification = UserSpecification.class)
    public ResponseEntity<PaginatedResult<UserPublicResponse>> getUsers(SearchCriteria<UserEntity> criteria) {
        return ResponseEntity.ok(userService.getUsers(criteria));
    }


    @GetMapping(value = "/{userId}/export")
    public ResponseEntity<?> exportStatistics(@PathVariable Long userId) throws JRException, IOException {
        InputStreamResource inputStreamResource = userService.printStatistic(userId);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/pdf");

        return new ResponseEntity<>(inputStreamResource, headers, HttpStatus.OK);
    }
}
