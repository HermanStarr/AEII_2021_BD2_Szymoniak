package pl.polsl.dsa.imagecollection.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.polsl.dsa.imagecollection.dao.UserRepository;
import pl.polsl.dsa.imagecollection.dto.ApiResponse;
import pl.polsl.dsa.imagecollection.dto.LoginRequest;
import pl.polsl.dsa.imagecollection.dto.SignUpRequest;
import pl.polsl.dsa.imagecollection.exception.ResourceNotFoundException;
import pl.polsl.dsa.imagecollection.model.UserEntity;
import pl.polsl.dsa.imagecollection.security.JwtUtils;
import pl.polsl.dsa.imagecollection.service.UserService;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/auth")
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
    public ResponseEntity loginUser(@Valid @RequestBody LoginRequest request) {
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

        return ResponseEntity.ok(userService.login(request));
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

}