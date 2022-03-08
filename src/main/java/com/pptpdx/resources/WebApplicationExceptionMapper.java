package com.pptpdx.resources;


import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;
import org.apache.log4j.Logger;

@Provider
public class WebApplicationExceptionMapper implements ExceptionMapper<WebApplicationException> {

    private static final Logger LOGGER = Logger.getLogger(WebApplicationExceptionMapper.class);

    public WebApplicationExceptionMapper() {
        LOGGER.debug("registered WebApplicationExceptionMapper");
    }

    @Override
    public Response toResponse(WebApplicationException exception) {
        int status = exception.getResponse().getStatus();
        if (status >= 400 && status < 500) {
            LOGGER.debug("Client error " + status + " " + exception.getMessage());
        } else {
            LOGGER.error("Error " + status + " " + exception);
        }
        return exception.getResponse();
    }

}
