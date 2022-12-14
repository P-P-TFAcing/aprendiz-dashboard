package com.pptpdx.classroom;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.classroom.Classroom;
import com.google.api.services.classroom.Classroom.Courses.CourseWork.StudentSubmissions;
import com.google.api.services.classroom.model.Topic;
import com.google.api.services.classroom.model.Course;
import com.google.api.services.classroom.model.CourseWork;
import com.google.api.services.classroom.model.CourseWorkMaterial;
import com.google.api.services.classroom.model.ListCourseWorkMaterialResponse;
import com.google.api.services.classroom.model.ListCourseWorkResponse;
import com.google.api.services.classroom.model.ListCoursesResponse;
import com.google.api.services.classroom.model.ListStudentSubmissionsResponse;
import com.google.api.services.classroom.model.ListTopicResponse;
import com.google.api.services.classroom.model.StudentSubmission;
import com.google.gson.Gson;
import com.pptpdx.model.CourseMetadata;
import com.pptpdx.model.GlobalMetadata;
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
        String pageToken = null;
        List<Topic> result = new ArrayList<>();
        do {
            ListTopicResponse response = service.courses().topics().list(courseId)
                    .setPageSize(20)
                    .setPageToken(pageToken)
                    .execute();
            pageToken = response.getNextPageToken();
            List<Topic> topics = response.getTopic();            
            if (topics != null) {
                for (Topic t : topics) {
                    result.add(t);
                    LOGGER.debug("topic " + t.getTopicId() + " " + t.getName());
                }                
            }
        } while(pageToken != null);
        LOGGER.debug("loaded " + result.size() + " topics");
        return result;
    }

    public static List<CourseWork> getCourseWork(Credential credential, String courseId) throws IOException {
        LOGGER.debug("get coursework " + courseId);
        Classroom service = getService(credential);
        String pageToken = null;
        List<CourseWork> result = new ArrayList<>();
        do {
            ListCourseWorkResponse response = service.courses().courseWork().list(courseId)                
                    .setPageToken(pageToken)
                    .setPageSize(20)
                    .execute();        
            pageToken = response.getNextPageToken();            
            List<CourseWork> objects = response.getCourseWork();            
            if (objects != null) {
                LOGGER.debug("fetched page of " + response.getCourseWork().size() + " token:" + pageToken);
                for (CourseWork t : objects) {
                    result.add(t);
                    LOGGER.debug("courseWork " + courseId + " " + t.getTitle() + " assignment:" + t.getAssignment() + " question:" + t.getMultipleChoiceQuestion() + " assignment:" + t.getAssignment());                    
                }                
            }
        } while(pageToken != null);
        LOGGER.debug("loaded " + result.size() + " coursework objects");
        return result;
    }
    
    public static List<StudentSubmission> getStudentSubmissions(Credential credential, String courseId, String courseWorkId) throws IOException {
        LOGGER.debug("get student submissions " + courseId + " " + courseWorkId);
        Classroom service = getService(credential);
        String pageToken = null;
        List<StudentSubmission> result = new ArrayList<>();
        do {
            ListStudentSubmissionsResponse response = service.courses().courseWork().studentSubmissions().list(courseId, courseWorkId)                
                    .setPageToken(pageToken)
                    .setPageSize(20)
                    .execute();        
            pageToken = response.getNextPageToken();            
            List<StudentSubmission> objects = response.getStudentSubmissions();            
            if (objects != null) {
                for (StudentSubmission t : objects) {
                    result.add(t);               
                    if(t.getAssignedGrade() != null) {
                        LOGGER.debug("found graded submission " + t.getId() + " grade=" + t.getAssignedGrade() + " coursework ID:" + courseWorkId);
                    }
                }                
            }
        } while(pageToken != null);
        LOGGER.debug("loaded " + result.size() + " coursework student submission objects");
        return result;
    }

    public static List<Course> getCourses(Credential credential) throws IOException {
        
        // @TODO configure somehow. global metadata? (including colors)
        
        LOGGER.debug("get all courses");
        Classroom service = getService(credential);
        String pageToken = null;
        List<Course> result = new ArrayList<>();
        do {
            ListCoursesResponse response = service.courses().list()
                    .setPageSize(20)
                    .setPageToken(pageToken)
                    .execute();        
            pageToken = response.getNextPageToken();
            List<Course> courses = response.getCourses();
            if (courses != null) {
                for (Course c : courses) {
                    LOGGER.debug("found course " + c.getName() + " " + c.getId() + " " + c.getDescriptionHeading() + " " + c.getEnrollmentCode());
//                    String enrollmentCode = c.getEnrollmentCode();                
//                    for(String loadedCourseName : loadedCourses) {
//                        if(loadedCourseName.equals(enrollmentCode)) {
                    result.add(c);
//                        }
//                    }                
                }                
            }
        } while(pageToken != null);
        LOGGER.debug("loaded " + result.size() + " courses");
        return result;
    }

    public static List<CourseWorkMaterial> getCourseWorkMaterials(Credential credential, String courseId) throws IOException {
        LOGGER.debug("get courseworkmaterials " + courseId);
        Classroom service = getService(credential);
        String pageToken = null;
        List<CourseWorkMaterial> result = new ArrayList<>();
        do {
            ListCourseWorkMaterialResponse response = service.courses().courseWorkMaterials().list(courseId)
                    .setPageSize(20)
                    .setPageToken(pageToken)
                    .execute();   
            pageToken = response.getNextPageToken();
            List<CourseWorkMaterial> objects = response.getCourseWorkMaterial();                
            if (objects != null) {
                for (CourseWorkMaterial t : objects) {
                    result.add(t);
                    LOGGER.debug("courseWorkMaterial " + courseId + " " + t.getTitle());
                }                
            }
        } while(pageToken != null);
        LOGGER.debug("loaded " + result.size() + " courseworkmaterials");
        return result;
    }

    public static void saveCourseMetadata(Map<String, Object> configData) {
        LOGGER.debug("save configuration data " + configData);
        String courseIdText = (String) configData.get("courseId");
        Long courseId = null;
        if (courseIdText != null) {
            courseId = Long.valueOf(courseIdText);
        }
        if (courseId != null) {
            try ( Session hsession = Models.MAIN.openSession()) {
                CourseMetadata courseMetadata;
                Gson gson = new Gson();
                String configText = gson.toJson(configData);
                Query<CourseMetadata> qry = hsession.createQuery("from CourseMetadata where courseId=:courseId");
                qry.setParameter("courseId", courseId);
                if (!qry.list().isEmpty()) {
                    courseMetadata = qry.list().get(0);
                    Transaction tx = hsession.beginTransaction();
                    courseMetadata.setMetadataText(configText);
                    hsession.update(courseMetadata);
                    tx.commit();
                } else {
                    courseMetadata = new CourseMetadata();
                    Transaction tx = hsession.beginTransaction();
                    courseMetadata.setMetadataText(configText);
                    courseMetadata.setCourseId(courseId);
                    hsession.save(courseMetadata);
                    tx.commit();
                }
            }
        }
    }
    
    public static void saveGlobalMetadata(Object configData) {
        LOGGER.debug("save global configuration data " + configData);
        try ( Session hsession = Models.MAIN.openSession()) {
            GlobalMetadata metadata;
            Gson gson = new Gson();
            String configText = gson.toJson(configData);
            Query<GlobalMetadata> qry = hsession.createQuery("from GlobalMetadata");            
            if (!qry.list().isEmpty()) {
                metadata = qry.list().get(0);
                Transaction tx = hsession.beginTransaction();
                metadata.setMetadataText(configText);
                hsession.update(metadata);
                tx.commit();
            } else {
                metadata = new GlobalMetadata();
                Transaction tx = hsession.beginTransaction();
                metadata.setMetadataText(configText);                
                hsession.save(metadata);
                tx.commit();
            }
        }
    }    

    public static CourseMetadata getCourseMetadata(long courseId) {
        LOGGER.debug("get course metadata " + courseId);
        try ( Session hsession = Models.MAIN.openSession()) {
            CourseMetadata courseMetadata;
            Query<CourseMetadata> qry = hsession.createQuery("from CourseMetadata where courseId=:courseId");
            qry.setParameter("courseId", courseId);
            if (!qry.list().isEmpty()) {
                courseMetadata = qry.list().get(0);
                return courseMetadata;
            }
            return null;
        }
    }

    public static GlobalMetadata getGlobalMetadata() {
        LOGGER.debug("get global metadata");
        try ( Session hsession = Models.MAIN.openSession()) {
            GlobalMetadata metadata;
            Query<GlobalMetadata> qry = hsession.createQuery("from GlobalMetadata");            
            if (!qry.list().isEmpty()) {
                metadata = qry.list().get(0);
                return metadata;
            }
            return null;
        }
    }

    public static CourseMetadata getCourseMetadata(Credential credential, String courseId) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

}
