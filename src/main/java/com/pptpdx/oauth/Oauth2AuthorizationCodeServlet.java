/*
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.pptpdx.oauth;

import com.google.api.client.auth.oauth2.AuthorizationCodeFlow;
import com.google.api.client.extensions.servlet.auth.oauth2.AbstractAuthorizationCodeServlet;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.http.GenericUrl;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.classroom.ClassroomScopes;
import com.pptpdx.resources.ApplicationConfig;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.lilycode.core.configbundle.ConfigException;
import org.apache.log4j.Logger;

public class Oauth2AuthorizationCodeServlet extends AbstractAuthorizationCodeServlet {
    
    private static final Logger LOGGER = Logger.getLogger(Oauth2CallbackServlet.class);
               
    private static final List<String> SCOPES
            = Arrays.asList(
                    "https://www.googleapis.com/auth/userinfo.profile",
                    "https://www.googleapis.com/auth/userinfo.email",
                    ClassroomScopes.CLASSROOM_COURSES,
                    ClassroomScopes.CLASSROOM_TOPICS,
                    ClassroomScopes.CLASSROOM_COURSEWORK_ME,
                    ClassroomScopes.CLASSROOM_COURSEWORK_STUDENTS,
                    ClassroomScopes.CLASSROOM_COURSEWORKMATERIALS,
                    ClassroomScopes.CLASSROOM_ROSTERS,
                    ClassroomScopes.CLASSROOM_STUDENT_SUBMISSIONS_ME_READONLY
            );

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws IOException, ServletException {
        LOGGER.debug("Oauth2AuthorizationCodeServlet get page data");
        // page data?
        
    }

    @Override
    protected String getRedirectUri(HttpServletRequest req) throws ServletException, IOException {
        String requestUrl = req.getRequestURL().toString();
        GenericUrl url = new GenericUrl(requestUrl);
        url.setScheme("https");
        url.setRawPath("/oauth2callback");
        return url.build();
    }

    static final HttpTransport HTTP_TRANSPORT = new NetHttpTransport();    
    
    static final JsonFactory JSON_FACTORY = JacksonFactory.getDefaultInstance();    
    
    @Override
    protected AuthorizationCodeFlow initializeFlow() throws IOException {
        try {
            GoogleAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow.Builder(
                    HTTP_TRANSPORT, JSON_FACTORY, ApplicationConfig.GOOGLE_IDENTITY_CLIENT_ID.value(), ApplicationConfig.GOOGLE_IDENTITY_CLIENT_SECRET.value(), SCOPES)
                    .setDataStoreFactory(new AppDataStoreFactory())
                    .setAccessType("offline")
                    .build();
            return flow;
        } catch (ConfigException ex) {
            throw new IOException("failed to load configuration", ex);
        }
    }

    @Override
    protected String getUserId(HttpServletRequest req) throws ServletException, IOException {
        return req.getSession().getId();
    }
}
