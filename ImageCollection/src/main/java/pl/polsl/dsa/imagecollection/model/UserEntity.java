package pl.polsl.dsa.imagecollection.model;

import javax.persistence.*;
import java.nio.charset.StandardCharsets;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Arrays;
import java.util.Objects;

@Entity
@Table(name="user", schema = "public")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @SequenceGenerator(
        name = "user_sequence_generator",
        sequenceName = "user_id",
        allocationSize = 1
    )
    @Column(name="id")
    private Long id;

    @Column(name="nickname")
    private String nickname;

    @Column(name="email")
    private String email;

    @Column(name="password_hash")
    private Byte[] passwordHash;

    @Column(name="icon")
    private byte[] icon;

    @Column(name="is_admin")
    private Boolean isAdmin;

    public UserEntity() {
    }

     public UserEntity( String nickname, String email , Byte[] passwordHash ) {
        this.nickname = nickname;
        this.email = email;
        this.passwordHash = passwordHash;
        this.icon = new byte[] {};
        this.isAdmin = false;
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


    public Byte[] getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(Byte[] passwordHash) {
        this.passwordHash = passwordHash;
    }

    public byte[] getIcon() {
        return icon;
    }

    public void setIcon(byte[] icon) {
        this.icon = icon;
    }

    public Boolean getAdmin() {
        return isAdmin;
    }

    public void setAdmin(Boolean admin) {
        isAdmin = admin;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        UserEntity userEntity = (UserEntity) o;
        return Objects.equals(id, userEntity.id)
                && Objects.equals(nickname, userEntity.nickname)
                && Objects.equals(email, userEntity.email)
                && Arrays.equals(passwordHash, userEntity.passwordHash)
                && Arrays.equals(icon, userEntity.icon)
                && Objects.equals(isAdmin, userEntity.isAdmin);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, nickname, email, passwordHash, icon, isAdmin);
    }
}
