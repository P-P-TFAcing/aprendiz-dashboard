package com.pptpdx.classroom;

import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.classroom.Classroom;
import com.google.api.services.classroom.model.Topic;
import com.google.api.services.classroom.model.Course;
import com.google.api.services.classroom.model.CourseWork;
import com.google.api.services.classroom.model.CourseWorkMaterial;
import com.google.api.services.classroom.model.ListCourseWorkMaterialResponse;
import com.google.api.services.classroom.model.ListCourseWorkResponse;
import com.google.api.services.classroom.model.ListCoursesResponse;
import com.google.api.services.classroom.model.ListTopicResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import org.apache.log4j.Logger;

/**
 * @author timothyheider
 */
public class ClassroomController {

    private static final Logger LOGGER = Logger.getLogger(ClassroomController.class);
        
    private static Classroom getService(GoogleCredential credential) {        
        NetHttpTransport transport = new NetHttpTransport();            
        GsonFactory jsonFactory = new GsonFactory();
        Classroom service = new Classroom.Builder(transport, jsonFactory, credential).setApplicationName("Aprendiz Dashboard").build();               
        return service;
    }
    
    public static List<Topic> getTopics(GoogleCredential credential, String courseId) throws IOException {        
        LOGGER.debug("get topics");
        Classroom service = getService(credential);
        ListTopicResponse response = service.courses().topics().list(courseId)
                .setPageSize(20)
                .execute();
        List<Topic> topics = response.getTopic();
        List<Topic> result = new ArrayList<>();
        if(topics != null) {
            for(Topic t : topics) {
                result.add(t);
            }
            LOGGER.debug("loaded " + result.size() + " topics");
        }        
        return result;
    }
    
    public static List<CourseWork> getCourseWork(GoogleCredential credential, String courseId) throws IOException {        
        LOGGER.debug("get coursework " + courseId);
        Classroom service = getService(credential);
        ListCourseWorkResponse response = service.courses().courseWork().list(courseId)
                .setPageSize(20)
                .execute();
        List<CourseWork> objects = response.getCourseWork();
        List<CourseWork> result = new ArrayList<>();
        if(objects != null) {
            for(CourseWork t : objects) {
                result.add(t);
            }
            LOGGER.debug("loaded " + result.size() + " topics");
        }
        return result;
    }
    
    public static List<Course> getCourses(GoogleCredential credential) throws IOException {
        LOGGER.debug("get courses");
        Classroom service = getService(credential);
        ListCoursesResponse response = service.courses().list()
                .setPageSize(20)
                .execute();                
        List<Course> result = new ArrayList<>();
        List<Course> courses = response.getCourses();
        if(courses != null) {
            for(Course c : courses) {                                               
                result.add(c);
            }
            LOGGER.debug("loaded " + result.size() + " courses");
        }
        return result;
    }

    public static List<CourseWorkMaterial> getCourseWorkMaterials(GoogleCredential credential, String courseId) throws IOException {
        LOGGER.debug("get courseworkmaterials " + courseId);         
        Classroom service = getService(credential);
        ListCourseWorkMaterialResponse response = service.courses().courseWorkMaterials().list(courseId)
                .setPageSize(20)
                .execute();
        List<CourseWorkMaterial> objects = response.getCourseWorkMaterial();
        List<CourseWorkMaterial> result = new ArrayList<>();
        if(objects != null) {
            for(CourseWorkMaterial t : objects) {
                result.add(t);
            }
            LOGGER.debug("loaded " + result.size() + " courseworkmaterials");
        }
        return result;                
    }

}
