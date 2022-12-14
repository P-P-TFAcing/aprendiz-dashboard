package com.pptpdx.resources;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.services.classroom.model.Course;
import com.google.api.services.classroom.model.CourseWork;
import com.google.api.services.classroom.model.CourseWorkMaterial;
import com.google.api.services.classroom.model.StudentSubmission;
import com.google.api.services.classroom.model.Topic;
import com.google.api.services.oauth2.model.Userinfo;
import com.google.gson.Gson;
import com.pptpdx.classroom.ClassroomController;
import com.pptpdx.model.CourseMetadata;
import com.pptpdx.model.GlobalMetadata;
import com.pptpdx.oauth.OauthConfiguration;
import com.pptpdx.oauth.UnauthorizedException;
import java.io.IOException;
import java.util.List;
import java.util.Map;
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
        if(cookie == null) {
            throw new WebApplicationException(Response.Status.UNAUTHORIZED);
        }        
        try {
            Credential credential = OauthConfiguration.getCredential(cookie.getValue());            
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
        if(cookie == null) {
            throw new WebApplicationException(Response.Status.UNAUTHORIZED);
        }        
        try {
            Credential credential = OauthConfiguration.getCredential(cookie.getValue());
            return ClassroomController.getCourseWork(credential, courseId);
        } catch (IOException ex) {
            LOGGER.error("IO exception", ex);
            throw new WebApplicationException(Response.Status.INTERNAL_SERVER_ERROR);
        }
    }

    @Produces({MediaType.APPLICATION_JSON})
    @Path("/metadata/{courseId}")
    @GET
    public Map<String, Object> getCourseMetadata(@CookieParam(APRENDIZ_SESSION_AUTH) Cookie cookie, @PathParam("courseId") Long courseId) {
        if(cookie == null) {
            throw new WebApplicationException(Response.Status.UNAUTHORIZED);
        }        
        CourseMetadata metadata = ClassroomController.getCourseMetadata(courseId);
        if(metadata == null) {
            throw new WebApplicationException(Response.Status.NOT_FOUND);
        }
        Gson gson = new Gson();
        return gson.fromJson(metadata.getMetadataText(), Map.class);        
    }

    @Produces({MediaType.APPLICATION_JSON})
    @Path("/globalmetadata")
    @GET
    public Object getGlobalMetadata(@CookieParam(APRENDIZ_SESSION_AUTH) Cookie cookie) {
        if(cookie == null) {
            throw new WebApplicationException(Response.Status.UNAUTHORIZED);
        }        
        GlobalMetadata metadata = ClassroomController.getGlobalMetadata();
        if(metadata == null) {
            throw new WebApplicationException(Response.Status.NOT_FOUND);
        }
        Gson gson = new Gson();
        return gson.fromJson(metadata.getMetadataText(), Map.class);        
    }
    
    @Produces({MediaType.APPLICATION_JSON})
    @Path("/courseworkmaterials/{courseId}")
    @GET
    public List<CourseWorkMaterial> getCourseWorkMaterials(@CookieParam(APRENDIZ_SESSION_AUTH) Cookie cookie, @PathParam("courseId") String courseId) {
        if(cookie == null) {
            throw new WebApplicationException(Response.Status.UNAUTHORIZED);
        }
        try {            
            Credential credential = OauthConfiguration.getCredential(cookie.getValue());
            return ClassroomController.getCourseWorkMaterials(credential, courseId);
        } catch (IOException ex) {
            LOGGER.error("IO exception", ex);
            throw new WebApplicationException(Response.Status.INTERNAL_SERVER_ERROR);
        }
    }
    
    @Produces({MediaType.APPLICATION_JSON})
    @Path("/submissions/{courseId}/{courseWorkId}")
    @GET
    public List<StudentSubmission> getCourseWorkMaterials(@CookieParam(APRENDIZ_SESSION_AUTH) Cookie cookie, @PathParam("courseId") String courseId, @PathParam("courseWorkId") String courseWorkId) {
        if(cookie == null) {
            throw new WebApplicationException(Response.Status.UNAUTHORIZED);
        }
        try {            
            Credential credential = OauthConfiguration.getCredential(cookie.getValue());
            return ClassroomController.getStudentSubmissions(credential, courseId, courseWorkId);
        } catch (IOException ex) {
            LOGGER.error("IO exception", ex);
            throw new WebApplicationException(Response.Status.INTERNAL_SERVER_ERROR);
        }
    }

    @Produces({MediaType.APPLICATION_JSON})
    @Path("/courses")
    @GET
    public List<Course> getCourses(@CookieParam(APRENDIZ_SESSION_AUTH) Cookie cookie) {
        if(cookie == null) {
            throw new WebApplicationException(Response.Status.UNAUTHORIZED);
        }
        try {
            LOGGER.debug("get courses");
            Credential credential = OauthConfiguration.getCredential(cookie.getValue());
            Userinfo info = OauthConfiguration.getUserInfo(credential);            
            LOGGER.debug("resolved classroom session " + credential + " " + info);
            return ClassroomController.getCourses(credential);
        } catch (IOException ex) {
            LOGGER.error("IO exception", ex);
            throw new WebApplicationException(Response.Status.INTERNAL_SERVER_ERROR);
        } catch (UnauthorizedException ex) {
            throw new WebApplicationException(Response.Status.UNAUTHORIZED);
        }
    }
    

}
