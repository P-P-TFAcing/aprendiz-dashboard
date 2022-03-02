package com.pptpdx;

import java.net.URL;

/**
 * Starts up the server, including a DefaultServlet that handles static files,
 * and any servlet classes annotated with the @WebServlet annotation.
 */
public class ServerMain {

  public static void main(String[] args) throws Exception {

    // Create a server that listens on port 8080.
//    int listenerPort = Integer.parseInt(System.getenv().getOrDefault("PORT", "8080"));
//    
//    Server server = new Server(listenerPort);
//
//    WebAppContext webapp = new WebAppContext();
//    webapp.setContextPath("/");
//    webapp.addServlet("com.pptpdx.Oauth2AuthorizationCodeServlet", "/login");
//    webapp.addServlet("com.pptpdx.Oauth2CallbackServlet", "/oauth2callback/*");
//    webapp.addServlet("com.pptpdx.LogoutServlet", "/logout");
//    String warName = "aprendiz-dashboard.war";
//    URL webAppDir =
//        ServerMain.class.getClassLoader().getResource("META-INF/resources");
//    System.out.println("starting " + warName + " server main");
//    webapp.setResourceBase(webAppDir.toURI().toString());      
//    //webapp.setResourceBase(webAppDir.toURI().toString());    
//    Configuration.ClassList classlist = Configuration.ClassList.setServerDefault(server);
//
//    // Enable Annotation Scanning.
//    classlist.addBefore(
//        "org.eclipse.jetty.webapp.JettyWebXmlConfiguration",
//        "org.eclipse.jetty.annotations.AnnotationConfiguration");
//
//    // Set the the WebAppContext as the ContextHandler for the server.
//    server.setHandler(webapp);
//
//    // Start the server
//    server.start();
//    System.out.println("Aprendiz Dashboard server started port " + listenerPort);
//    // Keep the main thread alive while the server is running.
//    server.join();
  }
}