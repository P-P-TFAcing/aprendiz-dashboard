package com.pptpdx.classroom;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.services.oauth2.model.Userinfo;
import com.pptpdx.oauth.Utils;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import org.apache.log4j.Logger;

/**
 *
 * @author timothyheider
 */
public class ClassroomSessions {

    private static final Logger LOGGER = Logger.getLogger(ClassroomSessions.class);
    
    private static final Map<UUID, ClassroomSession> sessions = new HashMap<>();
    
    public static final String SESSION_COOKIE_NAME = "aprendiz-auth";
    
    public static void invalidateSession(HttpServletRequest request) {
        ClassroomSession session = getSession(request);
        if(session != null) {
            synchronized(sessions) {
                LOGGER.debug("invalidated session " + session.getSessionId().toString());
                sessions.remove(session.getSessionId());
            }
        }
    }
    
    public static ClassroomSession getSession(HttpServletRequest request) {        
        if(request.getCookies() != null) {
            for(Cookie cookie : request.getCookies()) {
                if(cookie.getName().equals("aprendiz-auth")) {
                    return getSession(cookie.getValue());
                }
            }
        }
        return null;
    }
    
    public static ClassroomSession getSession(String sessionIdText) {
        synchronized(sessions) {
            UUID sessionId = UUID.fromString(sessionIdText);
            ClassroomSession session = sessions.get(sessionId);
            if(session != null) {
                try {
                    Userinfo info = Utils.getUserInfo(session.getGoogleCredential());
                    if(info == null) {
                        return null;
                    }
                    LOGGER.debug("resolved user sesssion by ID text " + sessionIdText);
                    return session;
                } catch (IOException ex) {
                    LOGGER.error("failed to resolve Google credential");
                    sessions.remove(sessionId);
                    return null;
                }
            }
            return null;
        }        
    }
    
    public static ClassroomSession createNewSession(Credential googleCredential) throws IOException {
        synchronized(sessions) {
            LOGGER.debug("create new session from token " + googleCredential.getAccessToken());
            UUID sessionId = UUID.randomUUID();            
            ClassroomSession session = new ClassroomSession(sessionId, googleCredential, Utils.getUserInfo(googleCredential));
            sessions.put(sessionId, session);
            return session;
        }
    }
        
}
