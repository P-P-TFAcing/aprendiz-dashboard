package com.pptpdx.resources;

import com.pptpdx.model.ModelClasses;
import com.pptpdx.model.Models;
import java.io.IOException;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import net.lilycode.core.hibernate.HibernateSessions;
import net.lilycode.core.hibernate.HibernateSessionsConfiguration;
import net.lilycode.core.hibernate.MySQLInnoDbDialect;

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
            
            HibernateSessions mainModel = new HibernateSessions();        
            HibernateSessionsConfiguration hibernateConfig = new HibernateSessionsConfiguration();
            hibernateConfig.setDatabaseHostAddress(ApplicationConfig.DB_HOST.value());
            hibernateConfig.setDatabasePort(ApplicationConfig.DB_PORT.value());
            hibernateConfig.setUpdateSchema(true);
            hibernateConfig.setDatabaseUsername(ApplicationConfig.DB_USERNAME.value());
            hibernateConfig.setDatabasePassword(ApplicationConfig.DB_PASSWORD.value());
            hibernateConfig.setDatabaseDialect(MySQLInnoDbDialect.class);
            hibernateConfig.setAnnotatedClasses(ModelClasses.getClasses());
            hibernateConfig.setDatabaseName(ApplicationConfig.DB_DATABASE.value());
            mainModel.openSessionManager(hibernateConfig);            
            Models.MAIN = Models.add("main", mainModel);
            
        } catch (IOException ex) {
            throw new RuntimeException("failed to load local resources");
        }
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        Models.MAIN.closeSessionManager();
    }
}
