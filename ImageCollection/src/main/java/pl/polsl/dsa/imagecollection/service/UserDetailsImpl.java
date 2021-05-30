package pl.polsl.dsa.imagecollection.service;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.userdetails.UserDetails;
import pl.polsl.dsa.imagecollection.model.UserEntity;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Objects;

public class UserDetailsImpl implements UserDetails {

    private final Long id;

    private final String username;

    private final String email;

    private final Boolean isAdmin;

    @JsonIgnore
    private final String password;

    private final Collection<?> authorities;

    private final Byte[] icon;

    public UserDetailsImpl(Long id,
                           String username, String email, String password,
                           Collection<?> authorities, Byte[] icon, Boolean isAdmin) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.isAdmin = isAdmin;
        this.authorities = authorities;
        this.icon = icon;
    }

    public static UserDetailsImpl build(UserEntity user) {
        List authorities = new ArrayList<>();

        int j = 0;
        byte[] bytes = new byte[user.getPasswordHash().length];
        for (Byte b : user.getPasswordHash())
            bytes[j++] = b.byteValue();
        String psw = new String(bytes);

        return new UserDetailsImpl(
            user.getId(),
            user.getNickname(),
            user.getEmail(),
            psw,
            authorities,
            user.getIcon(),
            user.getAdmin()
        );
    }

    public Long getId() {
        return id;
    }


    public String getEmail() {
        return email;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public Collection getAuthorities() {
        return authorities;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        UserDetailsImpl user = (UserDetailsImpl) o;
        return Objects.equals(id, user.id);
    }

    public Byte[] getIcon() {
        return icon;
    }

    public Boolean getAdmin() {
        return isAdmin;
    }
}
