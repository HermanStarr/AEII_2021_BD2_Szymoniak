package pl.polsl.dsa.imagecollection.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="user")
public class UserEntity {

    @Id
    @Column(name="id")
    private Long id;

    @Column(name="nickname")
    private String nickname;

    @Column(name="email")
    private String email;

    @Column(name="password_salt")
    private Byte[] passwordSalt;

    @Column(name="password_hash")
    private Byte[] passwordHash;

    @Column(name="icon")
    private Byte[] icon;

    @Column(name="is_admin")
    private Boolean isAdmin;

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

    public Byte[] getPasswordSalt() {
        return passwordSalt;
    }

    public void setPasswordSalt(Byte[] passwordSalt) {
        this.passwordSalt = passwordSalt;
    }

    public Byte[] getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(Byte[] passwordHash) {
        this.passwordHash = passwordHash;
    }

    public Byte[] getIcon() {
        return icon;
    }

    public void setIcon(Byte[] icon) {
        this.icon = icon;
    }

    public Boolean getAdmin() {
        return isAdmin;
    }

    public void setAdmin(Boolean admin) {
        isAdmin = admin;
    }
}
