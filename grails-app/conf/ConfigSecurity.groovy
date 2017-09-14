grails.plugin.springsecurity.successHandler.defaultTargetUrl = "/app"
grails.plugin.springsecurity.successHandler.alwaysUseDefault = false

grails.plugin.springsecurity.useBasicAuth = true
grails.plugin.springsecurity.basic.realmName = "Addiko Riznica"
grails.plugin.springsecurity.rejectIfNoRule = true
grails.plugin.springsecurity.useSessionFixationPrevention = true
grails.plugin.springsecurity.logout.postOnly = false
grails.plugin.springsecurity.logout.handlerNames = ["rememberMeServices", "localeResolverSavingLogoutHandler"]
grails.plugin.springsecurity.securityConfigType = grails.plugin.springsecurity.SecurityConfigType.InterceptUrlMap

grails.plugin.springsecurity.filterChain.chainMap = [
  [pattern: "/assets/**", filters: "none"],
  [pattern: "/**/js/**", filters: "none"],
  [pattern: "/**/css/**", filters: "none"],
  [pattern: "/**/images/**", filters: "none"],
  [pattern: "/**/favicon.ico", filters: "none"],
  [pattern: "/rest/**", filters: "JOINED_FILTERS,-exceptionTranslationFilter,-securityContextPersistenceFilter,-logoutFilter,-rememberMeAuthenticationFilter,-anonymousAuthenticationFilter"],
  [pattern: "/**", filters: "JOINED_FILTERS,-basicAuthenticationFilter,-basicExceptionTranslationFilter"]
]

grails.plugin.springsecurity.interceptUrlMap = [
  // static resources
  [pattern: "/images/**", access: ["IS_AUTHENTICATED_ANONYMOUSLY"]],
  [pattern: "/css/**", access: ["IS_AUTHENTICATED_ANONYMOUSLY"]],
  [pattern: "/js/**", access: ["IS_AUTHENTICATED_ANONYMOUSLY"]],
  [pattern: "/plugins/**/images/**", access: ["IS_AUTHENTICATED_ANONYMOUSLY"]],
  [pattern: "/plugins/**/css/**", access: ["IS_AUTHENTICATED_ANONYMOUSLY"]],
  [pattern: "/plugins/**/js/**", access: ["IS_AUTHENTICATED_ANONYMOUSLY"]],
  [pattern: "/style/**", access: ["IS_AUTHENTICATED_ANONYMOUSLY"]],
  [pattern: "/script/**", access: ["IS_AUTHENTICATED_ANONYMOUSLY"]],
  [pattern: "/font/**", access: ["IS_AUTHENTICATED_ANONYMOUSLY"]]
]
 
// Note: when any ext js application has dynamic loading enabled, security is configured as dynamic loading is enabled for all applications. Therefore, to use this security config 
//       in production, make sure that none of your Ext JS application is not configured for dynamic loading. If this is not suitable, security configuration MUST be tighten up, and configured 
//       for each application individually. Do note, however, that when any application uses dynamic loading, you will need to open up "senchaWorkspace/ext", and "senchaWorkspace/packages" 
//       directories. 
// 
//       For all this reasons, it is recommended that dynamic loading is used only in development environment, and not in production. 
 
// TODO currently loading of properties from other files is not working, so this workaround is used. 
def environment = hr.addiko.riznica.Application.environment
 
Boolean isDynamicLoadingEnabledAlready = false 
def extJsApplicationNames = environment.getProperty("grich.core.jslib.sencha.extjs.applicationNames", ArrayList) 
 
extJsApplicationNames.each { String extJsApplicationName -> 
  Boolean isExtJsApplicationDynamicLoadingEnabled = environment.getProperty("grich.core.jslib.sencha.extjs.${extJsApplicationName}.dynamicLoading", Boolean) 
  String extJsBuildEnvironmentName = environment.getProperty("grich.core.jslib.sencha.extjs[extJsApplicationName].buildEnvironment") 
 
  if (isExtJsApplicationDynamicLoadingEnabled) { 
    if (!isDynamicLoadingEnabledAlready) { 
      grails.plugin.springsecurity.interceptUrlMap += [ 
          [pattern:  "/senchaWorkspace/**", access: ["IS_AUTHENTICATED_FULLY"]] 
      ] 
 
      isDynamicLoadingEnabledAlready = true 
    } 
  } 
  else { 
    grails.plugin.springsecurity.interceptUrlMap += [ 
        [pattern: "/senchaWorkspace/build/$extJsBuildEnvironmentName/${extJsApplicationName}/**/*.css", access: ["IS_AUTHENTICATED_FULLY"]], 
        [pattern: "/senchaWorkspace/build/$extJsBuildEnvironmentName/${extJsApplicationName}/**/*.js", access: ["IS_AUTHENTICATED_FULLY"]], 
        [pattern: "/senchaWorkspace/build/$extJsBuildEnvironmentName/${extJsApplicationName}/**/*.json", access: ["IS_AUTHENTICATED_FULLY"]], 
        [pattern: "/senchaWorkspace/build/$extJsBuildEnvironmentName/${extJsApplicationName}/**/resources/**", access: ["IS_AUTHENTICATED_FULLY"]] 
    ] 
  } 
} 
 
grails.plugin.springsecurity.interceptUrlMap += [ 
    // dynamic resources 
 
    // when user is not logged in, and exception occurs, request is redirected to the grails-errorhandler. If grails-errorhandler is not public resource, login prompt will be shown, which is not 
    // desired. Therefore, access to grails-errorhandler is public. 
    [pattern: "/grails-errorhandler", access: ["IS_AUTHENTICATED_ANONYMOUSLY"]], 
    [pattern: "/login/**", access: ["permitAll"]],
    [pattern: "/logout/**", access: ["permitAll"]], // if user is on application page, and session expire, do not require login to be able to logout
    [pattern: "/admin/**", access: ["permitAll", "permitAll"]],
    [pattern: "/app/**", access: ["IS_AUTHENTICATED_ANONYMOUSLY"]],
    [pattern: "/api/**", access: ["permitAll"]],
    [pattern: "/error", access: ["permitAll"]],
    [pattern: "/", access: ["permitAll"]],
    [pattern: "/**", access: ["permitAll"]]
] 