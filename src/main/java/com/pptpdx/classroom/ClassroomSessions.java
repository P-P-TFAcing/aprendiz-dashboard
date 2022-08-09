package com.pptpdx.classroom;

import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import java.io.IOException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import org.apache.log4j.Logger;

/**
 *
 * @author timothyheider
 */
public class ClassroomSessions {

    private static final Logger LOGGER = Logger.getLogger(ClassroomSessions.class);        
    
    public static final String SESSION_COOKIE_NAME = "aprendiz-auth";
        
    public static GoogleCredential getCredential(String accessToken) throws IOException {        
        LOGGER.debug("get credential from access token " + accessToken);
        GoogleCredential credential = new GoogleCredential().setAccessToken(accessToken);
        return credential;
    }

    public static GoogleCredential getCredential(HttpServletRequest request) throws IOException {        
        if(request.getCookies() != null) {
            for(Cookie cookie : request.getCookies()) {
                if(cookie.getName().equals("aprendiz-auth")) {
                    return getCredential(cookie.getValue());
                }
            }
        }
        return null;
    }
    
            
}
