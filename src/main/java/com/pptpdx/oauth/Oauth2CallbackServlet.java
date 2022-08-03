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

// [START gae_java11_oauth2_callback]
import com.google.api.client.auth.oauth2.AuthorizationCodeFlow;
import com.google.api.client.auth.oauth2.AuthorizationCodeResponseUrl;
import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.extensions.servlet.auth.oauth2.AbstractAuthorizationCodeCallbackServlet;
import com.google.api.services.oauth2.model.Userinfo;
import com.pptpdx.classroom.ClassroomSession;
import com.pptpdx.classroom.ClassroomSessions;
import com.pptpdx.model.Models;
import com.pptpdx.model.User;
import com.pptpdx.model.UserSession;
import java.io.IOException;
import java.util.Date;
import java.util.UUID;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.lilycode.core.configbundle.ConfigException;
import org.apache.log4j.Logger;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

/**
 * This servlet class extends AbstractAuthorizationCodeServlet which if the end-user credentials are
 * not found, will redirect the end-user to an authorization page.
 */
public class Oauth2CallbackServlet extends AbstractAuthorizationCodeCallbackServlet {

  private static final Logger LOGGER = Logger.getLogger(Oauth2CallbackServlet.class);    
    
  /** Handles a successfully granted authorization.
     * @param req
     * @param resp
     * @param credential
     * @throws javax.servlet.ServletException
     * @throws java.io.IOException */
  @Override
  protected void onSuccess(HttpServletRequest req, HttpServletResponse resp, Credential credential) throws ServletException, IOException {
    LOGGER.debug("OAUTH create new credential " + credential.getAccessToken());    
    Userinfo userInfo = Utils.getUserInfo(credential);
    try(Session hsession = Models.MAIN.openSession()) {
        LOGGER.debug("resolved Google user " + userInfo);
        String emailAddress = userInfo.getEmail();
        Query<User> qry = hsession.createQuery("from User where emailAddress=:emailAddress");
        qry.setParameter("emailAddress", emailAddress);
        User user;
        if(qry.list().isEmpty()) {
            Transaction tx = hsession.beginTransaction();
            user = new User();
            user.setActive(Boolean.TRUE);
            user.setEmailAddress(userInfo.getEmail());
            user.setFullName(userInfo.getName());
            hsession.save(user);
            tx.commit();
            LOGGER.debug("created new user " + user);
        } else {
            user = qry.list().get(0);
            LOGGER.debug("resolved existing user " + user);
        }                
        Transaction tx = hsession.beginTransaction();
        UserSession usession = new UserSession();
        usession.setSessionUser(user);
        usession.setWhenCreated(new Date());
        usession.setGoogleCredential(credential.getAccessToken());
        usession.setSessionId(UUID.randomUUID().toString());
        Cookie cookie = new Cookie(ClassroomSessions.SESSION_COOKIE_NAME, usession.getSessionId());
        cookie.setMaxAge(60*60*24); 
        resp.addCookie(cookie);    
        resp.sendRedirect("/");
        LOGGER.debug("created new session " + usession);
        tx.commit();
    }    
    
  }

  /** Handles an error to the authorization, such as when an end user denies authorization.
     * @param req
     * @param resp
     * @param errorResponse
     * @throws javax.servlet.ServletException
     * @throws java.io.IOException */
  @Override
  protected void onError(
      HttpServletRequest req, HttpServletResponse resp, AuthorizationCodeResponseUrl errorResponse) throws ServletException, IOException {
    resp.getWriter().print("<p>You Denied Authorization.</p>");
    resp.setStatus(200);
    resp.addHeader("Content-Type", "text/html");
  }

  /** Returns the redirect URI for the given HTTP servlet request.
     * @param req
     * @return 
     * @throws javax.servlet.ServletException
     * @throws java.io.IOException */
  @Override
  protected String getRedirectUri(HttpServletRequest req) throws ServletException, IOException {
    return Utils.getRedirectUri(req);
  }

  /**
   * Loads the authorization code flow to be used across all HTTP servlet requests (only called
   * during the first HTTP servlet request with an authorization code).
     * @return 
     * @throws java.io.IOException
   */
  @Override
  protected AuthorizationCodeFlow initializeFlow() throws IOException {
      try {
          return Utils.newFlow();
      } catch (ConfigException ex) {
          throw new IOException("failed to load configuration", ex);
      }
  }

  /**
   * Returns the user ID for the given HTTP servlet request.This identifies your application's user
 and is used to assign and persist credentials to that user.
     * @param req
     * @return 
     * @throws javax.servlet.ServletException
     * @throws java.io.IOException
   */
  @Override
  protected String getUserId(HttpServletRequest req) throws ServletException, IOException {
    return Utils.getUserId(req);
  }
}
// [END gae_java11_oauth2_callback]
