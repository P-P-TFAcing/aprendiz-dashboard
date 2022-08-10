package com.pptpdx.oauth;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.http.GenericUrl;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.classroom.ClassroomScopes;
import com.google.api.services.oauth2.Oauth2;
import com.google.api.services.oauth2.model.Userinfo;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import javax.servlet.http.HttpServletRequest;

/**
 *
 * @author timothyheider
 */
public class OauthConfiguration {

    public static final String APP_NAME = "APRENDIZ DASHBOARD";
    
    public static final String SESSION_COOKIE_NAME = "aprendiz-auth";

    public static final List<String> SCOPES
            = Arrays.asList(
                    "https://www.googleapis.com/auth/userinfo.profile",
                    "https://www.googleapis.com/auth/userinfo.email",
                    ClassroomScopes.CLASSROOM_COURSES,
                    ClassroomScopes.CLASSROOM_TOPICS,
                    ClassroomScopes.CLASSROOM_COURSEWORK_ME,
                    ClassroomScopes.CLASSROOM_COURSEWORK_STUDENTS,
                    ClassroomScopes.CLASSROOM_COURSEWORKMATERIALS,
                    ClassroomScopes.CLASSROOM_ROSTERS,
                    ClassroomScopes.CLASSROOM_STUDENT_SUBMISSIONS_ME_READONLY
            );

    public static final HttpTransport HTTP_TRANSPORT = new NetHttpTransport();

    public static final JsonFactory JSON_FACTORY = JacksonFactory.getDefaultInstance();
    
    public static Credential getCredential(String accessToken) {
        GoogleCredential credential = new GoogleCredential().setAccessToken(accessToken);
        return credential;
    }    
    
    public static String getRedirectUri(HttpServletRequest req) {
        String requestUrl = req.getRequestURL().toString();
        GenericUrl url = new GenericUrl(requestUrl);
        url.setScheme("https");
        url.setRawPath("/oauth2callback");
        return url.build();        
    }
    
    public static Userinfo getUserInfo(Credential credential) throws IOException {
        Oauth2 oauth2Client
                = new Oauth2.Builder(OauthConfiguration.HTTP_TRANSPORT, OauthConfiguration.JSON_FACTORY, credential)
                        .setApplicationName(OauthConfiguration.APP_NAME)
                        .build();

        // Retrieve user profile
        Userinfo userInfo = oauth2Client.userinfo().get().execute();
        return userInfo;
    }    
    
}
