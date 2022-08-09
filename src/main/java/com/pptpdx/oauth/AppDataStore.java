package com.pptpdx.oauth;

import com.google.api.client.util.store.DataStore;
import com.google.api.client.util.store.DataStoreFactory;
import com.pptpdx.classroom.ClassroomSessions;
import java.io.IOException;
import java.io.Serializable;
import java.util.Collection;
import java.util.Set;
import org.apache.log4j.Logger;

/**
 *
 * @author timothyheider
 */
public class AppDataStore implements DataStore {

    private static final Logger LOGGER = Logger.getLogger(ClassroomSessions.class);        
    
    @Override
    public DataStoreFactory getDataStoreFactory() {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public String getId() {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public int size() throws IOException {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public boolean isEmpty() throws IOException {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public boolean containsKey(String string) throws IOException {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public boolean containsValue(Serializable v) throws IOException {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public Set keySet() throws IOException {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public Collection values() throws IOException {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public Serializable get(String key) throws IOException {
        LOGGER.debug("get called key=" + key);
        return null;        
    }

    @Override
    public DataStore set(String text, Serializable v) throws IOException {
        LOGGER.debug("set called with key=" + text + " object is " + v.getClass() + " " + v);
        return this;
    }

    @Override
    public DataStore clear() throws IOException {
        LOGGER.debug("clear");
        return this;
    }

    @Override
    public DataStore delete(String key) throws IOException {
        LOGGER.debug("delete " + key);
        return this;
    }
    
}
