package com.pptpdx.oauth;

import com.google.api.client.util.store.AbstractDataStoreFactory;
import com.google.api.client.util.store.DataStore;
import java.io.IOException;
import java.io.Serializable;
import org.apache.log4j.Logger;

/**
 *
 * @author timothyheider
 * @param <StoredCredential>
 */
public class AppDataStoreFactory<StoredCredential> extends AbstractDataStoreFactory {

    private static final Logger LOGGER = Logger.getLogger(AppDataStoreFactory.class);
    
    @Override
    protected <V extends Serializable> DataStore<V> createDataStore(String text) throws IOException {
        LOGGER.debug("called AppDataStoreFactory create " + text);
        return (DataStore<V>) new AppDataStore(this, text);        
    }
    
}
