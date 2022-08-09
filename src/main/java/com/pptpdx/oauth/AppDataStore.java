package com.pptpdx.oauth;

import com.google.api.client.auth.oauth2.StoredCredential;
import com.google.api.client.util.store.AbstractDataStore;
import com.google.api.client.util.store.DataStore;
import com.google.api.client.util.store.DataStoreFactory;
import java.io.IOException;
import java.util.Collection;
import java.util.Set;
import org.apache.log4j.Logger;

/**
 *
 * @author timothyheider
 */
public class AppDataStore extends AbstractDataStore<StoredCredential> {

    public AppDataStore(DataStoreFactory dataStoreFactory, String id) {
        super(dataStoreFactory, id);
    }

    private static final Logger LOGGER = Logger.getLogger(AppDataStore.class);        
    
    @Override
    public Set<String> keySet() throws IOException {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public Collection<StoredCredential> values() throws IOException {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public StoredCredential get(String key) throws IOException {
        LOGGER.debug("get called key=" + key);
        return null;
    }

    @Override
    public DataStore<StoredCredential> set(String key, StoredCredential v) throws IOException {
        LOGGER.debug("set called with key=" + key + " object is " + v.getClass() + " " + v);        
        return this;
    }

    @Override
    public DataStore<StoredCredential> clear() throws IOException {
        LOGGER.debug("clear called");
        return this;
    }

    @Override
    public DataStore<StoredCredential> delete(String string) throws IOException {
        LOGGER.debug("delete called");
        return this;        
    }

}
