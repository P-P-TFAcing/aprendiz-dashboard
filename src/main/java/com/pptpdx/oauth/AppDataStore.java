package com.pptpdx.oauth;

import com.google.api.client.auth.oauth2.StoredCredential;
import com.google.api.client.util.store.AbstractDataStore;
import com.google.api.client.util.store.DataStore;
import com.google.api.client.util.store.DataStoreFactory;
import com.pptpdx.model.Models;
import com.pptpdx.model.UserSession;
import java.io.IOException;
import java.util.Collection;
import java.util.Set;
import org.apache.log4j.Logger;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

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
        try(Session hsession = Models.MAIN.openSession()) {
            Query<UserSession> qry = hsession.createQuery("from UserSession where sessionKey=:sessionKey");
            qry.setParameter("sessionKey", key);
            if(!qry.list().isEmpty()) {
                UserSession usession = qry.list().get(0);
                LOGGER.debug("resolved session " + usession);
                StoredCredential credential = new StoredCredential();
                credential.setRefreshToken(null);
                credential.setAccessToken(usession.getGoogleAccessToken());
                credential.setExpirationTimeMilliseconds(usession.getGoogleExpirationTimeMilliseconds());
                return credential;
            }
        }        
        return null;
    }

    @Override
    public DataStore<StoredCredential> set(String key, StoredCredential credential) throws IOException {
        LOGGER.debug("set called with key=" + key);        
        try(Session hsession = Models.MAIN.openSession()) {
            Query<UserSession> qry = hsession.createQuery("from UserSession where sessionKey=:sessionKey");
            qry.setParameter("sessionKey", key);
            if(!qry.list().isEmpty()) {
                // update session
                Transaction tx = hsession.beginTransaction();
                UserSession userSession = qry.list().get(0);
                LOGGER.debug("resolved session " + userSession);
                userSession.setGoogleAccessToken(credential.getAccessToken());
                userSession.setGoogleExpirationTimeMilliseconds(credential.getExpirationTimeMilliseconds());
                hsession.update(userSession);
                tx.commit();
            } else {
                // create a new one
                Transaction tx = hsession.beginTransaction();
                UserSession userSession = new UserSession();                
                userSession.setSessionKey(key);
                userSession.setGoogleAccessToken(credential.getAccessToken());
                userSession.setGoogleExpirationTimeMilliseconds(credential.getExpirationTimeMilliseconds());
                hsession.save(userSession);
                tx.commit();                
                LOGGER.debug("saved new session " + userSession);
            }
        }
        return this;
    }

    @Override
    public DataStore<StoredCredential> clear() throws IOException {
        LOGGER.debug("clear called");
        return this;
    }

    @Override
    public DataStore<StoredCredential> delete(String key) throws IOException {
        LOGGER.debug("delete key " + key);
        try(Session hsession = Models.MAIN.openSession()) {
            Query<UserSession> qry = hsession.createQuery("from UserSession where sessionKey=:sessionKey");
            qry.setParameter("sessionKey", key);
            if(!qry.list().isEmpty()) {
                Transaction tx = hsession.beginTransaction();
                UserSession userSession = qry.list().get(0);
                hsession.delete(userSession);
                tx.commit();                        
            }
        }
        return this;        
    }

}
