package com.pptpdx.resources;

import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.services.classroom.model.Course;
import com.google.api.services.classroom.model.CourseWork;
import com.google.api.services.classroom.model.CourseWorkMaterial;
import com.google.api.services.classroom.model.Topic;
import com.pptpdx.classroom.ClassroomController;
import com.pptpdx.oauth.OauthConfiguration;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.security.GeneralSecurityException;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import javax.servlet.ServletContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.CookieParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Cookie;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import net.lilycode.core.configbundle.ConfigException;
import org.apache.log4j.Logger;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

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
            GoogleCredential credential = OauthConfiguration.getGoogleCredential(cookie.getValue());
            return ClassroomController.getTopics(credential, courseId);
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
            GoogleCredential credential = OauthConfiguration.getGoogleCredential(cookie.getValue());
            return ClassroomController.getCourseWork(credential, courseId);
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
            GoogleCredential credential = OauthConfiguration.getGoogleCredential(cookie.getValue());
            return ClassroomController.getCourseWorkMaterials(credential, courseId);
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
            GoogleCredential credential = OauthConfiguration.getGoogleCredential(cookie.getValue());
            LOGGER.debug("resolved classroom session " + credential);
            return ClassroomController.getCourses(credential);
        } catch (IOException ex) {
            LOGGER.error("IO exception", ex);
            throw new WebApplicationException(Response.Status.INTERNAL_SERVER_ERROR);
        }
    }
    

}
