package com.pptpdx.classroom;

import com.google.api.client.auth.oauth2.Credential;
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
import com.google.gson.Gson;
import com.pptpdx.model.CourseConfiguration;
import com.pptpdx.model.Models;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.apache.log4j.Logger;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

/**
 * @author timothyheider
 */
public class ClassroomController {

    private static final Logger LOGGER = Logger.getLogger(ClassroomController.class);
            
    private static Classroom getService(Credential credential) {        
        NetHttpTransport transport = new NetHttpTransport();            
        GsonFactory jsonFactory = new GsonFactory();
        Classroom service = new Classroom.Builder(transport, jsonFactory, credential).setApplicationName("Aprendiz Dashboard").build();               
        return service;
    }
    
    public static List<Topic> getTopics(Credential credential, String courseId) throws IOException {        
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
    
    public static List<CourseWork> getCourseWork(Credential credential, String courseId) throws IOException {        
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
    
    public static List<Course> getCourses(Credential credential) throws IOException {
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

    public static List<CourseWorkMaterial> getCourseWorkMaterials(Credential credential, String courseId) throws IOException {
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
    
    public static void saveConfigurationData(Map<String, Object> configData) {
        LOGGER.debug("save configuration data " + configData);
        Long courseId = (Long) configData.get("courseId");
        try ( Session hsession = Models.MAIN.openSession()) {
            CourseConfiguration config;
            Gson gson = new Gson();
            String configText = gson.toJson(configData);            
            Query<CourseConfiguration> qry = hsession.createQuery("from CourseConfiguration where courseId=:courseId");
            qry.setParameter("courseId", courseId);
            if(!qry.list().isEmpty()) {
                config = qry.list().get(0);
                Transaction tx = hsession.beginTransaction();
                config.setConfigurationText(configText);
                hsession.update(config);
                tx.commit();                
            } else {
                config = new CourseConfiguration();
                Transaction tx = hsession.beginTransaction();
                config.setConfigurationText(configText);
                config.setCourseId(courseId);
                hsession.save(config);
                tx.commit();
            }
        }
    }

}
