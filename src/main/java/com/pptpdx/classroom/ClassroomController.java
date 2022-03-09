package com.pptpdx.classroom;

import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.classroom.Classroom;
import com.google.api.services.classroom.model.Topic;
import com.google.api.services.classroom.model.Course;
import com.google.api.services.classroom.model.CourseWork;
import com.google.api.services.classroom.model.ListCourseWorkResponse;
import com.google.api.services.classroom.model.ListCoursesResponse;
import com.google.api.services.classroom.model.ListTopicResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import org.apache.log4j.Logger;

/**
 *
 * @author timothyheider
 */
public class ClassroomController {

    private static final Logger LOGGER = Logger.getLogger(ClassroomController.class);
        
    private static Classroom getService(ClassroomSession classroomSession) {        
        NetHttpTransport transport = new NetHttpTransport();            
        GsonFactory jsonFactory = new GsonFactory();
        Classroom service = new Classroom.Builder(transport, jsonFactory, classroomSession.getGoogleCredential()).setApplicationName("Aprendiz Dashboard").build();        
        return service;
    }
    
    public static List<Topic> getTopics(ClassroomSession classroomSession, String courseId) throws IOException {        
        Classroom service = getService(classroomSession);
        ListTopicResponse response = service.courses().topics().list(courseId)
                .setPageSize(20)
                .execute();
        List<Topic> topics = response.getTopic();
        List<Topic> result = new ArrayList<>();
        for(Topic t : topics) {
            result.add(t);
        }
        return result;
    }
    
    public static List<CourseWork> getCourseWork(ClassroomSession classroomSession, String courseId) throws IOException {        
        Classroom service = getService(classroomSession);
        ListCourseWorkResponse response = service.courses().courseWork().list(courseId)
                .setPageSize(20)
                .execute();
        List<CourseWork> objects = response.getCourseWork();
        List<CourseWork> result = new ArrayList<>();
        for(CourseWork t : objects) {
            result.add(t);
        }
        return result;
    }
    
    public static List<Course> getCourses(ClassroomSession classroomSession) throws IOException {
        Classroom service = getService(classroomSession);
        ListCoursesResponse response = service.courses().list()
                .setPageSize(20)
                .execute();                
        List<Course> result = new ArrayList<>();
        List<Course> courses = response.getCourses();
        for(Course c : courses) {                                               
            result.add(c);
        }
        return result;
    }

}
