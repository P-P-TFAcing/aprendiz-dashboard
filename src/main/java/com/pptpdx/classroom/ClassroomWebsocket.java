package com.pptpdx.classroom;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import org.apache.log4j.Logger;

/**
 *
 * @author timothyheider
 */
@ServerEndpoint("/websocket/v1")
public class ClassroomWebsocket {

    private static final Logger LOGGER = Logger.getLogger(ClassroomWebsocket.class);
    
    @OnOpen
    public void onOpen(Session session) {        
        LOGGER.debug("opened new websocket endpoint " + session.getId());
    }

    @OnError
    public void onError(Throwable t) {
        LOGGER.error("websocket error " + t.getMessage(), t);
    }
    
    @OnMessage
    public void onMessage(Session session, String message) {        
        LOGGER.debug("websocket message received " + message);        
    }
    
    @OnClose
    public void onClose(Session session) {
        LOGGER.debug("websocket close " + session.getId());        
    }
    
}
