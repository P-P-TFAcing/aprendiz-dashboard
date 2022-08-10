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
import com.google.api.client.util.store.MemoryDataStoreFactory;
import com.pptpdx.resources.ApplicationConfig;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.lilycode.core.configbundle.ConfigException;
import org.apache.log4j.Logger;

public class Oauth2AuthorizationCodeServlet extends AbstractAuthorizationCodeServlet {
    
    private static final Logger LOGGER = Logger.getLogger(Oauth2CallbackServlet.class);
               
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws IOException, ServletException {
        LOGGER.debug("Oauth2AuthorizationCodeServlet get page data");
        // page data?
        
    }

    @Override
    protected String getRedirectUri(HttpServletRequest req) throws ServletException, IOException {
        return OauthConfiguration.getRedirectUri(req);
    }

    @Override
    protected AuthorizationCodeFlow initializeFlow() throws IOException {
        try {
            GoogleAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow.Builder(
                    OauthConfiguration.HTTP_TRANSPORT, OauthConfiguration.JSON_FACTORY, ApplicationConfig.GOOGLE_IDENTITY_CLIENT_ID.value(), ApplicationConfig.GOOGLE_IDENTITY_CLIENT_SECRET.value(), OauthConfiguration.SCOPES)
                    .setDataStoreFactory(MemoryDataStoreFactory.getDefaultInstance())
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
