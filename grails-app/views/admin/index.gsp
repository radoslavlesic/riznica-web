<%@page import="grails.util.Environment" contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
  <meta name="layout" content="main"/>
  <title><g:message code="app.view.administration.label" default="Administration"/></title>
</head>
<body>
  <div class="body" style="margin: 10px">
    <h1><g:message code="app.view.administration.label" default="Administration"/></h1>
    <p><g:link controller="admin" action="grailsWelcome">Welcome to Grails</g:link></p>
    <g:if test="${dbConsoleUrl && grailsApplication.config.grails.dbconsole.enabled == true}">
      <p><a href="${request.contextPath}${dbConsoleUrl}">H2 Console</a></p>
    </g:if>
    <h1><g:message code="app.view.application.label" default="Application"/></h1>
    <p>
      <g:link controller="app" action="app">
        ${grailsApplication.config.grich.core.general.appHtmlTitle} - <g:message code="app.view.applicationEntry.label" default="Enter Application"/>
      </g:link>
    </p>
    <p><g:link uri="/"><g:message code="app.view.homePage.label" default="Home Page"/></g:link></p>
  </div>
</body>
</html>
