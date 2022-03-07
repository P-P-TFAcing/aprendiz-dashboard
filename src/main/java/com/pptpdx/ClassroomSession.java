package com.pptpdx;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.services.oauth2.model.Userinfo;
import java.util.UUID;

/**
 *
 * @author timothyheider
 */
public class ClassroomSession {

    private final UUID sessionId;

    private final Credential googleCredential;
    
    private final Userinfo userinfo;

    public ClassroomSession(UUID sessionId, Credential googleCredential, Userinfo userinfo) {
        this.sessionId = sessionId;
        this.googleCredential = googleCredential;
        this.userinfo = userinfo;
    }

    public Userinfo getUserinfo() {
        return userinfo;
    }

    public UUID getSessionId() {
        return sessionId;
    }

    public Credential getGoogleCredential() {
        return googleCredential;
    }       
    
}
