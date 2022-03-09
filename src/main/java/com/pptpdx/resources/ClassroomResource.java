package com.pptpdx.resources;

import com.google.api.services.classroom.model.Course;
import com.google.api.services.classroom.model.Topic;
import com.pptpdx.classroom.ClassroomController;
import com.pptpdx.classroom.ClassroomSession;
import com.pptpdx.classroom.ClassroomSessions;
import java.io.IOException;
import java.util.List;
import javax.ws.rs.CookieParam;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Cookie;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.apache.log4j.Logger;

/**
 *
 * @author timothyheider
 */
@Path("classroom")
public class ClassroomResource {

    private static final Logger LOGGER = Logger.getLogger(ClassroomResource.class);
    
    private static final String APRENDIZ_SESSION_AUTH = "aprendiz-auth";

    @Produces({MediaType.APPLICATION_JSON})
    @Path("/topics/{courseId}")
    @GET
    public List<Topic> getTopics(@CookieParam(APRENDIZ_SESSION_AUTH) Cookie cookie,@PathParam("courseId") String courseId) {
        try {
            ClassroomSession classroomSession = ClassroomSessions.getSession(cookie.getValue());
            if(classroomSession == null) {
                throw new WebApplicationException(Response.Status.UNAUTHORIZED);
            }            
            return ClassroomController.getTopics(classroomSession, courseId);
        } catch (IOException ex) {
            LOGGER.error("IO exception", ex);            
            throw new WebApplicationException(Response.Status.INTERNAL_SERVER_ERROR);
        }
    }


    @Produces({MediaType.APPLICATION_JSON})
    @Path("/courses")
    @GET
    public List<Course> getCourses(@CookieParam(APRENDIZ_SESSION_AUTH) Cookie cookie) {
        try {
            ClassroomSession classroomSession = ClassroomSessions.getSession(cookie.getValue());
            if(classroomSession == null) {
                throw new WebApplicationException(Response.Status.UNAUTHORIZED);
            }            
            return ClassroomController.getCourses(classroomSession);
        } catch (IOException ex) {
            LOGGER.error("IO exception", ex);            
            throw new WebApplicationException(Response.Status.INTERNAL_SERVER_ERROR);
        }
    }

}
