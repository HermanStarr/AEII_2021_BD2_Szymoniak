package pl.polsl.dsa.imagecollection.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pl.polsl.dsa.imagecollection.PaginatedResult;
import pl.polsl.dsa.imagecollection.dao.UserRepository;
import pl.polsl.dsa.imagecollection.dto.*;
import pl.polsl.dsa.imagecollection.exception.ResourceNotFoundException;
import pl.polsl.dsa.imagecollection.model.UserEntity;
import pl.polsl.dsa.imagecollection.security.JwtUtils;
import pl.polsl.dsa.imagecollection.service.UserDetailsImpl;
import pl.polsl.dsa.imagecollection.service.UserService;
import pl.polsl.dsa.imagecollection.specification.SearchCriteria;
import pl.polsl.dsa.imagecollection.specification.Searchable;
import pl.polsl.dsa.imagecollection.specification.UserSpecification;

import javax.validation.Valid;
import java.io.IOException;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> loginUser(@Valid @RequestBody LoginRequest request) {
        if(!userRepository.existsByNickname(request.getUsername()))
            return ResponseEntity
                    .badRequest()
                    .body(new ApiResponse(false,"Error: User does not exist!"));

        UserEntity user = userRepository.findByNickname(request.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User", "nickname", request.getUsername()));

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        if ( !encoder.matches(request.getPassword(), userService.byteToString(user.getPasswordHash())) ) {
            return ResponseEntity
                    .badRequest()
                    .body(new ApiResponse(false,"Error: Wrong password"));
        }

        String jwt = userService.login(request);
        return ResponseEntity.ok(new ApiResponse(true,"Bearer " + jwt));
    }

    @PostMapping("/signup")
    public ResponseEntity<ApiResponse> registerUser(@Valid @RequestBody SignUpRequest request) {
        if(userRepository.existsByNickname(request.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new ApiResponse(false,"Error: Username is already taken!"));
        }
        if(userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new ApiResponse(false,"Error: Email is already taken!"));
        }

        userService.signUp(request);
        return ResponseEntity.ok(
                new ApiResponse(true,"User registered successfully!"));
    }

    @GetMapping("/userData")
    public UserResponse getUserData() {
        UserDetails u = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        UserEntity user = userRepository.findByNickname(u.getUsername())
            .orElseThrow(() -> new ResourceNotFoundException("", "", u.getUsername()));
        return UserResponse.fromEntity(user);
    }

    @PutMapping("/changePassword")
    public ResponseEntity<ApiResponse> changePassword(String newPassword, String oldPassword) {

        UserDetails u = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        UserEntity user = userRepository.findByNickname(u.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User", "nickname", u.getUsername()));

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        if ( !encoder.matches(oldPassword, userService.byteToString(user.getPasswordHash())) ) {
            return ResponseEntity
                    .badRequest()
                    .body(new ApiResponse(false,"Error: Wrong password"));
        }

        userService.changePassword(newPassword, user);
        return ResponseEntity.ok(new ApiResponse(true,"password changed"));
    }

    @PutMapping("/changeIcon")
    public ResponseEntity<ApiResponse> changeIcon(@Valid @RequestPart("icon") MultipartFile icon,
                                                  String password) throws IOException {

        userService.changeIcon(icon, password);
        return ResponseEntity.ok(new ApiResponse(true,"Icon changed"));

    }
}
