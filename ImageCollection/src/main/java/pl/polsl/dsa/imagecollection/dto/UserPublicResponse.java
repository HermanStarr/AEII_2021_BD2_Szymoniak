package pl.polsl.dsa.imagecollection.dto;

import pl.polsl.dsa.imagecollection.model.UserEntity;

import java.util.Base64;

public class UserPublicResponse {
    private Long id;
    private String nickname;
    private String email;
    private String icon;
    private Boolean isAdmin;

    public static UserPublicResponse fromEntity(UserEntity entity) {
        UserPublicResponse dto = new UserPublicResponse();
        dto.setId(entity.getId());
        dto.setNickname(entity.getNickname());
        dto.setEmail(entity.getEmail());
        dto.setIcon(Base64.getEncoder().encodeToString(entity.getIcon()));
        dto.setAdmin(entity.getAdmin());
        return dto;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public Boolean getAdmin() {
        return isAdmin;
    }

    public void setAdmin(Boolean admin) {
        isAdmin = admin;
    }
}
