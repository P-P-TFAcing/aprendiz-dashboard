<!DOCTYPE html>
<%@page import="com.pptpdx.classroom.ClassroomSessions"%>
<%@page import="com.pptpdx.classroom.ClassroomSession"%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="com.pptpdx.oauth.Utils" %>
<%@ page import="com.pptpdx.classroom.ClassroomController" %>
<%@ page import="com.google.api.client.auth.oauth2.Credential" %>

<html>
    <head>
        <link type="text/css" rel="stylesheet" href="/stylesheets/main.css"/>
        <title>Aprendiz Dashboard</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    </head>
    <body>
        <div class="container-fluid" ng-app="AprendizApplication">
            <ng-view/>
            <!-- googlesignon -->
            <div id="google-signon-block" class="container-fluid" ng-controller="GoogleSignonController">
                <div class="panel panel-default">
                    <h1>Welcome to Aprendiz Dashboard</h1>
                    <div class="panel-body">                                
                        <fieldset>
                            <legend>Please sign in with Google.</legend>

                            <div id="g_id_onload"
                                 data-client_id="306377984914-p28n8601j01jsv6cudu632vss51idh4b.apps.googleusercontent.com"
                                 data-login_uri="https://aprendiz-dashboard.pptpdx.net/resources/classroom/credential"
                                 data-callback="handleCredentialResponse"
                                 data-auto_prompt="false">
                            </div>
                            <div class="g_id_signin"
                                 data-type="standard"
                                 data-size="large"
                                 data-theme="outline"
                                 data-text="sign_in_with"
                                 data-shape="rectangular"
                                 data-logo_alignment="left">
                            </div>
                        </fieldset>                                
                    </div>
                </div>
            </div>

        </div>                
        <script>

            var onGoogleSignIn;

            function handleCredentialResponse(response) {
                // decodeJwtResponse() is a custom function defined by you
                // to decode the credential response.
                console.log('google auth credential', response);
                if (onGoogleSignIn) {
                    onGoogleSignIn(response);
                }
            }
        </script>
        <script src="https://accounts.google.com/gsi/client" async defer></script>        
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>          
        <script src="//cdn.jsdelivr.net/npm/phaser@3.55.2/dist/phaser.min.js"></script>
        <script src="bundle.js"></script>
    </body>
</html>
