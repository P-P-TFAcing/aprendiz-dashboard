package com.pptpdx.model;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.*;

/**
 *
 * @author theider
 */
@Entity
@Table(indexes = {
    @Index(columnList = "sessionKey", name = "sessionKey_idx"),
    @Index(columnList = "googleAccessToken", name = "googleAccessToken_idx")})
public class UserSession implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @Column
    private String sessionKey;

    @Column
    @Temporal(TemporalType.TIMESTAMP)
    private Date whenCreated;

    @ManyToOne
    private User sessionUser;

    @Column(columnDefinition = "TEXT")
    private String googleAccessToken;

    @Column
    private Long googleExpirationTimeMilliseconds;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSessionKey() {
        return sessionKey;
    }

    public void setSessionKey(String sessionKey) {
        this.sessionKey = sessionKey;
    }

    public Date getWhenCreated() {
        return whenCreated;
    }

    public void setWhenCreated(Date whenCreated) {
        this.whenCreated = whenCreated;
    }

    public User getSessionUser() {
        return sessionUser;
    }

    public void setSessionUser(User sessionUser) {
        this.sessionUser = sessionUser;
    }

    public String getGoogleAccessToken() {
        return googleAccessToken;
    }

    public void setGoogleAccessToken(String googleAccessToken) {
        this.googleAccessToken = googleAccessToken;
    }

    public Long getGoogleExpirationTimeMilliseconds() {
        return googleExpirationTimeMilliseconds;
    }

    public void setGoogleExpirationTimeMilliseconds(Long googleExpirationTimeMilliseconds) {
        this.googleExpirationTimeMilliseconds = googleExpirationTimeMilliseconds;
    }

    @Override
    public String toString() {
        return "UserSession{" + "id=" + id + ", sessionKey=" + sessionKey + ", whenCreated=" + whenCreated + '}';
    }

}
