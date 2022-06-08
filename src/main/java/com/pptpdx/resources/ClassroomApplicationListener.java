package com.pptpdx.resources;

import java.io.IOException;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

/**
 * Web application lifecycle listener.
 *
 * @author timothyheider
 */
public class ClassroomApplicationListener implements ServletContextListener {

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        try {
            ClassroomResource.loadResources(sce.getServletContext());
        } catch (IOException ex) {
            throw new RuntimeException("failed to load local resources");
        }
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
    }
}
