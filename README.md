# Aprendiz Dashboard Web Application

Google Classroom API project for viewing and managing PPT Google Classroom curriculum.

## Local Development

### Installed Requirements

Requires: JDK 11

Install mysql-server version 8

Install [Apache Netbeans](https://netbeans.apache.org/).

Install [Wildfly Application Server](https://examples.javacodegeeks.com/enterprise-java/jboss-wildfly/jboss-wildfly-netbeans-example/).

### Database

Create the database (in MySQL client):

`create database aprendiz;`
`create user 'aprendiz'@'%' identified by 'aprendiz';`
`grant all on aprendiz.* to 'aprendiz'@'%';`
`flush privileges;`

### Server Configuration

You need to add the database and runmode config to the web server.

Edit the Wildfly standalone.xml confuration file. You can do this in Netbeans by right clicking the server node and choosing Edit Configuration.

Add the following XML after the extensions node and before the management node (near the top of the file):

`    <system-properties>
`        <property name="com.pptpdx.db.runmode" value="DEVELOPMENT"/>
`        <property name="com.pptpdx.db.host" value="localhost"/>
`        <property name="com.pptpdx.db.port" value="3306"/>
`        <property name="com.pptpdx.db.database" value="aprendiz"/>
`        <property name="com.pptpdx.db.username" value="aprendiz"/>
`        <property name="com.pptpdx.db.password" value="aprendiz"/>
`    </system-properties>    

### Run mode

The runmode is for local development. 

If you put it in PRODUCTION mode it will require Google OAUTH and fetch live data from Classroom API.

If you run in DEVELOPMENT mode it uses the classroom_sample.json object in the UI (game code).

In Netbeans open the Java project and get it to deploy under the installed Wildfly application server. It should run as the root context.




