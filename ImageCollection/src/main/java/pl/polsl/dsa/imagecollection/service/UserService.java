package pl.polsl.dsa.imagecollection.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import pl.polsl.dsa.imagecollection.dao.UserRepository;
import pl.polsl.dsa.imagecollection.dto.*;
import pl.polsl.dsa.imagecollection.exception.ResourceNotFoundException;
import pl.polsl.dsa.imagecollection.model.UserEntity;
import pl.polsl.dsa.imagecollection.security.JwtUtils;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @Transactional
    public void signUp(SignUpRequest signUpRequest) {

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String encodedPassword = encoder.encode(signUpRequest.getPassword());

        UserEntity user = new UserEntity( signUpRequest.getUsername(),
                signUpRequest.getEmail(), stringToByte(encodedPassword) );

        userRepository.save(user);
    }

    public String login(LoginRequest loginRequest){

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);
        JwtResponse token = new JwtResponse(jwt);
        return token.getAccessToken();
    }

    public void changePassword (String newPassword, UserEntity user){
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String encodedPassword = encoder.encode(newPassword);
        user.setPasswordHash(stringToByte(encodedPassword));

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        user.getNickname(),
                        newPassword
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    public void changeIcon (MultipartFile imageFile, String password) throws IOException {
        UserDetails u = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        UserEntity user = userRepository.findByNickname(u.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User", "nickname", u.getUsername()));
        user.setIcon(imageFile.getBytes());

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        user.getNickname(),
                        password
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
    }


    public Byte[] stringToByte (String s){
        byte[] bytes = s.getBytes(StandardCharsets.UTF_8);
        Byte[] byteObjects = new Byte[bytes.length];
        int i=0;
        for(byte b: bytes)
            byteObjects[i++] = b;
        return byteObjects;
    }

    public String byteToString (Byte[] byteObject){
        int j=0;
        byte[] bytes = new byte[byteObject.length];
        for(Byte b: byteObject)
            bytes[j++] = b;
        return new String(bytes);
    }

    @Transactional(readOnly = true)
    public UserResponse getAllUserDataByUsername(String username){
    return UserResponse.fromEntity(userRepository.findAllByNickname(username)
        .orElseThrow(() -> new ResourceNotFoundException("User","id",username)));
    }
}
