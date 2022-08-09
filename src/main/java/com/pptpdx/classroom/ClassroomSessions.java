package com.pptpdx.classroom;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.auth.oauth2.TokenResponse;
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.services.oauth2.model.Userinfo;
import com.pptpdx.model.Models;
import com.pptpdx.model.UserSession;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import org.apache.log4j.Logger;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

/**
 *
 * @author timothyheider
 */
public class ClassroomSessions {

    private static final Logger LOGGER = Logger.getLogger(ClassroomSessions.class);        
    
    public static final String SESSION_COOKIE_NAME = "aprendiz-auth";
    
    public static void invalidateSession(HttpServletRequest request) {
        ClassroomSession session = getSession(request);
        if(session != null) {
            LOGGER.debug("invalidated session " + session.getSessionId().toString());
            try(Session hsession = Models.MAIN.openSession()) {
                Query<UserSession> qry = hsession.createQuery("from UserSession where sessionId=:sessionId");
                qry.setParameter("sessionId", session.getSessionId().toString());
                if(!qry.list().isEmpty()) {
                    Transaction tx = hsession.beginTransaction();
                    UserSession usession = qry.list().get(0);
                    hsession.delete(usession);
                    tx.commit();
                    LOGGER.debug("removed session " + usession);
                }
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
        try(Session hsession = Models.MAIN.openSession()) {
            Query<UserSession> qry = hsession.createQuery("from UserSession where sessionId=:sessionId");
            qry.setParameter("sessionId", sessionIdText);
            if(!qry.list().isEmpty()) {
                UserSession usession = qry.list().get(0);
                LOGGER.debug("resolved session " + usession);
                TokenResponse tr = new TokenResponse();
                tr.setAccessToken(usession.getGoogleCredential());
                
                //new GoogleCredential().
                
                
            }
        }
        return null;
    }
            
}
