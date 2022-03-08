package com.pptpdx.resources;

import com.google.api.services.classroom.model.Course;
import com.pptpdx.classroom.ClassroomController;
import java.io.IOException;
import java.util.List;
import javax.ws.rs.CookieParam;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
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
    @Path("/courses")
    @GET
    public List<Course> getCourses(@CookieParam(APRENDIZ_SESSION_AUTH) Cookie cookie) {
        try {
            return ClassroomController.getCourses(cookie);
        } catch (IOException ex) {
            LOGGER.error("service failure", ex);            
            throw new WebApplicationException(Response.Status.INTERNAL_SERVER_ERROR);
        }
    }

}
