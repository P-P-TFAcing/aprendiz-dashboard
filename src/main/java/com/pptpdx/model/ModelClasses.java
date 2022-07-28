package com.pptpdx.model;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 *
 * @author Timothy Heider
 */
public class ModelClasses {

    private static final Class[] CLASSES = {
        CourseConfiguration.class,
        User.class,
        UserPassword.class,
        UserSession.class            
    };
    
    public static List<Class> getClasses() {
        return new ArrayList<>(Arrays.asList(CLASSES));
    }
    
}
