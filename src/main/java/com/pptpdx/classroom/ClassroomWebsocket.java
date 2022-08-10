package com.pptpdx.classroom;

import com.google.gson.Gson;
import java.util.Map;
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
        Gson gson = new Gson();
        //{"containerPositions":{"CourseWorkRect_487896080085":{"x":685,"y":269},"CourseWorkRect_487896080137":{"x":641,"y":146},"LegendRect":{"x":1091,"y":33}},"messageType":"SAVE_COURSE_CONFIGURATION"}
        Map<String, Object> data = gson.fromJson(message, Map.class);
        LOGGER.debug("received websocket data " + data);
    }
    
    @OnClose
    public void onClose(Session session) {
        LOGGER.debug("websocket close " + session.getId());        
    }
    
}
