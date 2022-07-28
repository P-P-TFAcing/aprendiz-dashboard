package com.pptpdx.model;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.*;

/**
 *
 * @author theider
 */
@Entity
@Table
public class UserSession implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @Column
    private String sessionId;
    
    @Column
    @Temporal(TemporalType.TIMESTAMP)
    private Date whenCreated;
    
    @ManyToOne    
    private User sessionUser;
    
    @Column(columnDefinition="TEXT")
    private String googleCredential;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
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

    public String getGoogleCredential() {
        return googleCredential;
    }

    public void setGoogleCredential(String googleCredential) {
        this.googleCredential = googleCredential;
    }

    @Override
    public String toString() {
        return "UserSession{" + "id=" + id + ", sessionId=" + sessionId + ", whenCreated=" + whenCreated + ", sessionUser=" + sessionUser + ", googleCredential=" + googleCredential + '}';
    }
        
}
