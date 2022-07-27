package com.pptpdx.resources;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.classroom.model.Course;
import com.google.api.services.classroom.model.CourseWork;
import com.google.api.services.classroom.model.CourseWorkMaterial;
import com.google.api.services.classroom.model.Topic;
import com.pptpdx.classroom.ClassroomController;
import com.pptpdx.classroom.ClassroomSession;
import com.pptpdx.classroom.ClassroomSessions;
import com.pptpdx.model.Models;
import com.pptpdx.model.User;
import com.pptpdx.model.UserSession;
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
            ClassroomSession classroomSession = ClassroomSessions.getSession(cookie.getValue());
            if (classroomSession == null) {
                throw new WebApplicationException(Response.Status.UNAUTHORIZED);
            }
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

    @Produces({MediaType.APPLICATION_JSON})
    @Consumes({MediaType.APPLICATION_JSON})
    @Path("/credential")
    @POST
    public PostCredentialResponse postCredential(PostCredentialRequest request) {
        try {
            LOGGER.debug("post Google credentials " + request);
            if (!request.getClientId().equals(ApplicationConfig.GOOGLE_IDENTITY_CLIENT_ID.value())) {
                LOGGER.error("client ID mismatch");
                throw new WebApplicationException(Response.Status.INTERNAL_SERVER_ERROR);
            }
            String credential = request.getCredential();
            PostCredentialResponse response = new PostCredentialResponse();
            LOGGER.debug("google auth credential " + credential);
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), JacksonFactory.getDefaultInstance())
                    .setAudience(Arrays.asList(ApplicationConfig.GOOGLE_IDENTITY_CLIENT_ID.value()))
                    .build();
            GoogleIdToken googleToken = verifier.verify(credential);
            if (googleToken == null) {
                throw new WebApplicationException(Response.Status.UNAUTHORIZED);
            } else {
                if (verifier.verify(googleToken)) {
                    LOGGER.debug("token is valid " + googleToken.toString());
                    String name = (String) googleToken.getPayload().get("name");
                    String emailAddress = googleToken.getPayload().getEmail();
                    LOGGER.debug("resolved Google account " + emailAddress);
                    response.setEmailAddress(emailAddress);
                    response.setName(name);                    
                    User user;
                    try ( Session hsession = Models.MAIN.openSession()) {
                        Transaction tx = hsession.beginTransaction();
                        Query<User> qry = hsession.getSession().createQuery("from User where emailAddress=:emailAddress");
                        qry.setParameter("emailAddress", emailAddress);
                        if (qry.list().isEmpty()) {
                            user = new User();
                            user.setActive(Boolean.TRUE);
                            user.setEmailAddress(emailAddress);
                            user.setFullName(name);
                            hsession.save(user);
                            tx.commit();
                            LOGGER.debug("created new user " + user);
                        } else {
                            user = qry.list().get(0);
                            LOGGER.debug("resolved existing user " + user);
                        }
                        // create session
                        UserSession usession = new UserSession();
                        usession.setGoogleCredential(credential);
                        usession.setSessionUser(user);
                        usession.setWhenCreated(new Date());
                        usession.setSessionId(UUID.randomUUID().toString());
                        hsession.save(user);
                        tx.commit();
                        LOGGER.debug("created new session " + usession);                        
                        response.setSessionToken(usession.getSessionId());                        
                    }                    
                    return response;
                } else {
                    LOGGER.error("invalid token");
                    throw new WebApplicationException(Response.Status.UNAUTHORIZED);
                }
            }
        } catch (GeneralSecurityException | IOException ex) {
            LOGGER.error("Google auth failure", ex);
            throw new WebApplicationException(Response.Status.UNAUTHORIZED);
        } catch (ConfigException ex) {
            LOGGER.error("configuration exception", ex);
            throw new WebApplicationException(Response.Status.UNAUTHORIZED);
        }
    }

}
