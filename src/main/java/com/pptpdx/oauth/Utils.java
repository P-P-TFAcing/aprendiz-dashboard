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

import com.google.api.client.http.GenericUrl;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

public class Utils {

    /**
     * Global instance of the HTTP transport.
     */
    static final HttpTransport HTTP_TRANSPORT = new NetHttpTransport();

    /**
     * Global instance of the JSON factory.
     */
    static final JsonFactory JSON_FACTORY = JacksonFactory.getDefaultInstance();

    /**
     * Set your OAuth 2.0 Client Credentials
     */
    /**
     * Scopes for requesting access to Google OAuth2 API
     */

    /**
     * Returns the redirect URI for the given HTTP servlet request.
     */
    static String getRedirectUri(HttpServletRequest req) {
        String requestUrl = req.getRequestURL().toString();
        GenericUrl url = new GenericUrl(requestUrl);
        url.setScheme("https");
        url.setRawPath("/oauth2callback");
        return url.build();
    }
    // [END gae_java11_oauth2_code_flow]

    /**
     * Returns the user ID for the given HTTP servlet request. This identifies
     * your application's user and is used to assign and persist credentials to
     * that user. Most commonly, this will be a user id stored in the session or
     * even the session id itself.
     */
    static String getUserId(HttpServletRequest req) throws ServletException, IOException {        
        return req.getSession().getId();
    }

    // [START gae_java11_oauth2_get_user]
    /**
     * Obtain end-user authorization grant for Google APIs and return username
     * @param credential
     * @return 
     * @throws java.io.IOException
     */
    // [END gae_java11_oauth2_get_user]
}
