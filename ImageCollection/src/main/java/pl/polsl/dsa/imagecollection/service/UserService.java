package pl.polsl.dsa.imagecollection.service;

import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
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
import pl.polsl.dsa.imagecollection.PaginatedResult;
import pl.polsl.dsa.imagecollection.dao.ImageRepository;
import pl.polsl.dsa.imagecollection.dao.UserRepository;
import pl.polsl.dsa.imagecollection.dto.*;
import pl.polsl.dsa.imagecollection.exception.ResourceNotFoundException;
import pl.polsl.dsa.imagecollection.model.ImageEntity;
import pl.polsl.dsa.imagecollection.model.UserEntity;
import pl.polsl.dsa.imagecollection.security.JwtUtils;
import pl.polsl.dsa.imagecollection.specification.SearchCriteria;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final ApplicationContext applicationContext;
    private final ImageRepository imageRepository;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    public UserService(UserRepository userRepository,
                       ApplicationContext applicationContext,
                       ImageRepository imageRepository) {
        this.userRepository = userRepository;
        this.applicationContext = applicationContext;
        this.imageRepository = imageRepository;
    }


    @Transactional
    public void signUp(SignUpRequest signUpRequest) {

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String encodedPassword = encoder.encode(signUpRequest.getPassword());

        UserEntity user = new UserEntity(signUpRequest.getUsername(),
            signUpRequest.getEmail(), stringToByte(encodedPassword));

        userRepository.save(user);
    }

    public String login(LoginRequest loginRequest) {

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

    @Transactional(readOnly = true)
    public PaginatedResult<UserPublicResponse> getUsers(SearchCriteria<UserEntity> criteria) {
        Page<UserEntity> page = userRepository.findAll(criteria.getSpecification(), criteria.getPaging());
        return new PaginatedResult<>(page.map(UserPublicResponse::fromEntity));
    }

    @Transactional(readOnly = true)
    public UserPublicResponse getUser(String nickname) {
        return UserPublicResponse.fromEntity(
            userRepository.findByNickname(nickname)
                .orElseThrow(() -> new ResourceNotFoundException("User", "nickname", nickname))
        );
    }

    public void changePassword(String newPassword, UserEntity user) {
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

    public void changeIcon(MultipartFile imageFile, String password) throws IOException {
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


    public Byte[] stringToByte(String s) {
        byte[] bytes = s.getBytes(StandardCharsets.UTF_8);
        Byte[] byteObjects = new Byte[bytes.length];
        int i = 0;
        for (byte b : bytes)
            byteObjects[i++] = b;
        return byteObjects;
    }

    public String byteToString(Byte[] byteObject) {
        int j = 0;
        byte[] bytes = new byte[byteObject.length];
        for (Byte b : byteObject)
            bytes[j++] = b;
        return new String(bytes);
    }

    @Transactional
    public InputStreamResource printStatistic(Long userId) throws JRException, IOException {

        UserEntity userEntity = userRepository.findById(userId).orElseThrow(
            () -> new ResourceNotFoundException("User", "id", userId));

        List<ImageEntity> imageEntityList = imageRepository.findAllByOwner(userEntity);


        //Generowanie statystyk uzytkonika
        Resource jrxmlTemplate = applicationContext.getResource("classpath:prints/statistics.jrxml");
        JasperReport jasperReport = JasperCompileManager.compileReport(jrxmlTemplate.getInputStream());
        JRDataSource jrDataSource = new JREmptyDataSource();
        JasperPrint jasperPrint = JasperFillManager
            .fillReport(jasperReport, createParameters(userId, imageEntityList), jrDataSource);

        return new InputStreamResource(new ByteArrayInputStream(JasperExportManager.exportReportToPdf(jasperPrint)));
    }

    public Map<String, Object> createParameters(Long userId, List<ImageEntity> imageEntities) {
        Map<String, Object> parameters = new HashMap<>();

        parameters.put(JRParameter.REPORT_LOCALE, new Locale("pl", "PL"));

        UserEntity user = userRepository.findById(userId)
            .orElseThrow(() -> new ResourceNotFoundException("Nie użytkownika o tym id"));

//        parameters.put("userName", user.getNickname());
//        parameters.put("date", LocalDateTime.now().toString());

        //Tabela 1 - Lista zdjec uzytkownika
        parameters.put("PhotoCollection",
            new JRBeanCollectionDataSource(imageEntities
                .stream()
                .map(ImageDataToPrint::fromEntity)
                .collect(Collectors.toList())
            ));

        return parameters;
    }

}
