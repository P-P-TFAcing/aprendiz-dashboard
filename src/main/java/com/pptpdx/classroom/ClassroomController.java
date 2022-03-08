package com.pptpdx.classroom;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.classroom.Classroom;
import com.google.api.services.classroom.model.Course;
import com.google.api.services.classroom.model.ListCoursesResponse;
import com.google.api.services.oauth2.model.Userinfo;
import com.pptpdx.oauth.Utils;
import com.pptpdx.resources.CourseObject;
import static com.sun.java.browser.dom.DOMService.getService;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import org.apache.log4j.Logger;

/**
 *
 * @author timothyheider
 */
public class ClassroomController {

    private static final Logger LOGGER = Logger.getLogger(Utils.class);
    
    private static final Map<UUID, ClassroomSession> sessions = new HashMap<>();
    
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
                    if(info != null) {
                        LOGGER.debug("session " + sessionIdText + " resolved to " + info.getEmail());
                    }
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
            UUID sessionId = UUID.randomUUID();            
            ClassroomSession session = new ClassroomSession(sessionId, googleCredential, Utils.getUserInfo(googleCredential));
            sessions.put(sessionId, session);
            return session;
        }
    }
    
    public static String getBasicData(Credential credential) {
        try {
            LOGGER.debug("calling Classroom API interface");
            NetHttpTransport transport = new NetHttpTransport();            
            //com.google.api.client.extensions.appengine.http.HTTPMethod
            GsonFactory jsonFactory = new GsonFactory();
            Classroom service = new Classroom.Builder(transport, jsonFactory, credential).setApplicationName("Aprendiz Dashboard").build();
            LOGGER.debug("got a Classroom API interface");
            ListCoursesResponse response = service.courses().list()
                    .setPageSize(10)
                    .execute();
            List<Course> courses = response.getCourses();
            if (courses == null || courses.isEmpty()) {
                LOGGER.debug("No courses found.");
            } else {
                LOGGER.debug("Courses:");
                for (Course course : courses) {
                    LOGGER.debug(String.format("%s", course.getName()));
                }
            }
        } catch (IOException ex) {
            LOGGER.error("failed to exec API:" + ex.getMessage());
        }
        return "blah";
    }

    public static List<CourseObject> getCourses(javax.ws.rs.core.Cookie cookie) throws IOException {
        ClassroomSession session = getSession(cookie.getValue());
        if(session == null) {
            return null;
        }
        NetHttpTransport transport = new NetHttpTransport();            
        GsonFactory jsonFactory = new GsonFactory();
        Classroom service = new Classroom.Builder(transport, jsonFactory, session.getGoogleCredential()).setApplicationName("Aprendiz Dashboard").build();
        ListCoursesResponse response = service.courses().list()
                .setPageSize(20)
                .execute();
        List<CourseObject> result = new ArrayList<>();
        List<Course> courses = response.getCourses();
        for(Course c : courses) {           
            CourseObject course = new CourseObject();
            course.setSection(c.getSection());
            course.setEnrollmentCode(c.getEnrollmentCode());
            course.setDescriptionHeading(c.getDescriptionHeading());
            course.setId(c.getId());            
            course.setName(c.getName());
            course.setDescription(c.getDescription());            
            course.setRoom(c.getRoom());
            result.add(course);
        }
        return result;
    }

}
