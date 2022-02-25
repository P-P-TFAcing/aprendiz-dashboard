package com.pptpdx;

import com.google.api.client.extensions.appengine.http.UrlFetchTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.classroom.Classroom;
import com.google.api.services.classroom.model.Course;
import com.google.api.services.classroom.model.ListCoursesResponse;
import java.io.IOException;
import java.util.List;

/**
 *
 * @author timothyheider
 */
public class ClassroomController {

    public String getBasicData() {
        try {
            UrlFetchTransport transport = new UrlFetchTransport();
            GsonFactory jsonFactory = new GsonFactory();
            Classroom service = new Classroom.Builder(transport, jsonFactory, null).build();
            ListCoursesResponse response = service.courses().list()
                    .setPageSize(10)
                    .execute();
            List<Course> courses = response.getCourses();
            if (courses == null || courses.size() == 0) {
                System.out.println("No courses found.");
            } else {
                System.out.println("Courses:");
                for (Course course : courses) {
                    System.out.printf("%s\n", course.getName());
                }
            }
            return "test of classroom API";
        } catch (IOException ex) {
            System.out.println("failed to exec API:" + ex.getMessage());
            return "error:" + ex.getMessage();
        }
    }
    
}
