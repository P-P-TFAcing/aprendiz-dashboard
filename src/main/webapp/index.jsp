<%@page import="com.pptpdx.ClassroomSession"%>
<!DOCTYPE html>
<!--

 Copyright 2019 Google LLC

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.

-->
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="com.pptpdx.Utils" %>
<%@ page import="com.pptpdx.ClassroomController" %>
<%@ page import="com.google.api.client.auth.oauth2.Credential" %>

<html>
<head>
  <link type="text/css" rel="stylesheet" href="/stylesheets/main.css"/>
  <title>Aprendiz Dashboard</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>  
</head>
<body>
<%
    ClassroomSession classroomSession = ClassroomController.getSession(request);
    if (classroomSession == null) {  
%>
<!-- sign on page -->
<div class="container">
    <h1>Aprendiz Dashboard</h1>
    <a href="/login"><img src="images/google/btn_google_signin_dark_normal_web.png" alt="Sign in with Google"></a>    
</div>
<%
  } else {
    // Use the credentials to get user info from the OAuth2.0 API.
    String username = classroomSession.getUserinfo().getGivenName();
    
%>
<!-- authorized page -->
<div class="container">
    <h1>Aprendiz Dashboard</h1>
    <p>Signed in as <%= username %>!</p>    
    <form action="/logout" method="post">
      <button>Log Out</button>
    </form>
</div>
<%
  }
%>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>
</body>
</html>
