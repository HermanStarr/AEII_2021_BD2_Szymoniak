package pl.polsl.dsa.imagecollection.dto;

import com.sun.istack.NotNull;

import javax.validation.constraints.NotBlank;

public class LoginRequest {
    @NotNull
    private String username;
    @NotNull
    private String password;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
