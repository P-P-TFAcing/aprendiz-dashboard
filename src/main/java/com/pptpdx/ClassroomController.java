package com.pptpdx;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.classroom.Classroom;
import com.google.api.services.classroom.model.Course;
import com.google.api.services.classroom.model.ListCoursesResponse;
import java.io.IOException;
import java.util.List;
import org.apache.log4j.Logger;

/**
 *
 * @author timothyheider
 */
public class ClassroomController {

    private static final Logger LOGGER = Logger.getLogger(Utils.class);
    
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

}
