package com.pptpdx.resources;

import com.pptpdx.classroom.ClassroomController;
import java.util.List;
import javax.ws.rs.CookieParam;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Cookie;
import javax.ws.rs.core.MediaType;

/**
 *
 * @author timothyheider
 */
@Path("classroom")
public class ClassroomResource {
    
    private static final String APRENDIZ_SESSION_AUTH = "aprendiz-auth";    
    
    @Produces({MediaType.APPLICATION_JSON})
    @Path("/courses")
    @GET
    public List<CourseObject> getAccountStatus(@CookieParam(APRENDIZ_SESSION_AUTH) Cookie cookie) {
        return ClassroomController.getCourses(cookie);
    }    
    
}
