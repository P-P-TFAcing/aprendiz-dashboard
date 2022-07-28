package com.pptpdx.resources;

import net.lilycode.core.configbundle.ConfigPropertyInt;
import net.lilycode.core.configbundle.ConfigPropertyString;

/**
 *
 * @author theider..
 */
public class ApplicationConfig {

    // the word "DEVELOPMENT" or "PRODUCTION"
    public static ConfigPropertyString RUN_MODE = new ConfigPropertyString("com.pptpdx.runmode");

    public static ConfigPropertyString DB_HOST = new ConfigPropertyString("com.pptpdx.db.host");

    public static ConfigPropertyString GOOGLE_IDENTITY_CLIENT_ID = new ConfigPropertyString("com.pptpdx.google_client_id");
    
    public static ConfigPropertyString GOOGLE_IDENTITY_CLIENT_SECRET = new ConfigPropertyString("com.pptpdx.google_client_secret");

    public static ConfigPropertyInt DB_PORT = new ConfigPropertyInt("com.pptpdx.db.port");

    public static ConfigPropertyString DB_DATABASE = new ConfigPropertyString("com.pptpdx.db.database");

    public static ConfigPropertyString DB_USERNAME = new ConfigPropertyString("com.pptpdx.db.username");

    public static ConfigPropertyString DB_PASSWORD = new ConfigPropertyString("com.pptpdx.db.password");

}
