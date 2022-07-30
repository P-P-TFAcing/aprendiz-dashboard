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
        <%
            ClassroomSession classroomSession = ClassroomSessions.getSession(request);
            if (classroomSession == null) {
        %>
        <!-- sign on page -->
        <div class="container-fluid">
            <h1>Aprendiz Dashboard</h1>
            <a href="/login"><img src="images/google/btn_google_signin_dark_normal_web.png" alt="Sign in with Google"></a>    
        </div>
        <%
        } else {
            // Use the credentials to get user info from the OAuth2.0 API.
            String username = classroomSession.getUserinfo().getGivenName();
        %>
        <!-- authorized page -->
        <div class="container-fluid" ng-app="AprendizApplication" ng-controller="MainViewController">
            <h1>Aprendiz Dashboard</h1>
            <div id="aprendiz-block">
            </div>        
            <p>Signed in as <%= username%></p>    
            <form action="/logout" method="post">
                <button>Log Out</button>
            </form>
        </div>
        <%
            }
        %>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>  
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>
        <script src="//cdn.jsdelivr.net/npm/phaser@3.55.2/dist/phaser.min.js"></script>
        <script src="bundle.js"></script>
    </body>
</html>
