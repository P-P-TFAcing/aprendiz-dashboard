package com.pptpdx.resources;

import com.google.api.services.classroom.model.Course;
import com.google.api.services.classroom.model.CourseWork;
import com.google.api.services.classroom.model.CourseWorkMaterial;
import com.google.api.services.classroom.model.Topic;
import com.pptpdx.classroom.ClassroomController;
import com.pptpdx.classroom.ClassroomSession;
import com.pptpdx.classroom.ClassroomSessions;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.io.StringReader;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.List;
import javax.servlet.ServletContext;
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
    public List<Topic> getTopics(@CookieParam(APRENDIZ_SESSION_AUTH) Cookie cookie, @PathParam("courseId") String courseId) {
        try {
            ClassroomSession classroomSession = ClassroomSessions.getSession(cookie.getValue());
            if (classroomSession == null) {
                throw new WebApplicationException(Response.Status.UNAUTHORIZED);
            }
            return ClassroomController.getTopics(classroomSession, courseId);
        } catch (IOException ex) {
            LOGGER.error("IO exception", ex);
            throw new WebApplicationException(Response.Status.INTERNAL_SERVER_ERROR);
        }
    }

    @Produces({MediaType.APPLICATION_JSON})
    @Path("/coursework/{courseId}")
    @GET
    public List<CourseWork> getCourseWork(@CookieParam(APRENDIZ_SESSION_AUTH) Cookie cookie, @PathParam("courseId") String courseId) {
        try {
            ClassroomSession classroomSession = ClassroomSessions.getSession(cookie.getValue());
            if (classroomSession == null) {
                throw new WebApplicationException(Response.Status.UNAUTHORIZED);
            }
            return ClassroomController.getCourseWork(classroomSession, courseId);
        } catch (IOException ex) {
            LOGGER.error("IO exception", ex);
            throw new WebApplicationException(Response.Status.INTERNAL_SERVER_ERROR);
        }
    }

    @Produces({MediaType.APPLICATION_JSON})
    @Path("/courseworkmaterials/{courseId}")
    @GET
    public List<CourseWorkMaterial> getCourseWorkMaterials(@CookieParam(APRENDIZ_SESSION_AUTH) Cookie cookie, @PathParam("courseId") String courseId) {
        try {
            ClassroomSession classroomSession = ClassroomSessions.getSession(cookie.getValue());
            if (classroomSession == null) {
                throw new WebApplicationException(Response.Status.UNAUTHORIZED);
            }
            return ClassroomController.getCourseWorkMaterials(classroomSession, courseId);
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
            LOGGER.debug("get courses");
            ClassroomSession classroomSession = ClassroomSessions.getSession(cookie.getValue());
            if (classroomSession == null) {
                throw new WebApplicationException(Response.Status.UNAUTHORIZED);
            }
            LOGGER.debug("resolved classroom session " + classroomSession);
            return ClassroomController.getCourses(classroomSession);
        } catch (IOException ex) {
            LOGGER.error("IO exception", ex);
            throw new WebApplicationException(Response.Status.INTERNAL_SERVER_ERROR);
        }
    }

    private static String SAMPLE_TEXT;

    public static void loadResources(ServletContext servletContext) throws IOException {
        StringBuilder output = new StringBuilder();
        try ( Reader reader = new InputStreamReader(servletContext.getResourceAsStream("WEB-INF/classes/classroom_sample.json"), Charset.forName(StandardCharsets.UTF_8.name()))) {
            int c;
            while ((c = reader.read()) != -1) {
                output.append((char) c);
            }
            SAMPLE_TEXT = output.toString();            
        }        
    }

    @Produces({MediaType.APPLICATION_JSON})
    @Path("/sample")
    @GET
    public String getSampleText(@CookieParam(APRENDIZ_SESSION_AUTH) Cookie cookie) {
        return ClassroomResource.SAMPLE_TEXT;
    }

}
