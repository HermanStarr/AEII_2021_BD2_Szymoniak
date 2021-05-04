package pl.polsl.dsa.imagecollection.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import pl.polsl.dsa.imagecollection.dao.UserRepository;
import pl.polsl.dsa.imagecollection.model.UserEntity;

import java.util.ArrayList;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String nickname) throws UsernameNotFoundException {

        UserEntity user = userRepository.findByNickname(nickname)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User Not Found with -> username or email : " + nickname)
                );

        return UserDetailsImpl.build(user);
    }


        //load user from database
        /*UserEntity user = userRepository.findByNickname(nickname)
                .orElseThrow(() -> new ResourceNotFoundException("User", "nickname", nickname));
        return new User(user.getNickname(),user.getPasswordHash(),new ArrayList<>());
        return new User("foo","foo",new ArrayList<>());
        */

}
