package hr.addiko.riznica

class UrlMappings { 
  // Note: "core" module is here only for illustration purposes. We don't actually have controllers in "core" module. At least not yet. 
  static final List MODULES = ["demo", "core"] 
  static final List DEFAULT_MAPPING_EXCLUDED_CONTROLLERS = ["admin", "app", "grichErrorHandling", "login", "logout"] 
 
  static mappings = { 
    // Url mapping scheme which emphasize architectural orientation to vertical (or module) slices, where each url is prefixed with module name. It requires explicit declaration of module names 
    // which are used in application. 
    // Note: Url mappings can be further tailored to specific needs, possibly by introducing your own conventions. Good article about the subject can be found at 
    //       http://blog.overzealous.com/post/23304412431/grails-urlmappings-tricks 
    "/api/$module/$controller/$action?" { 
      constraints { 
        module inList: MODULES 
        controller validator: { controllerName, obj -> 
          if (controllerName in DEFAULT_MAPPING_EXCLUDED_CONTROLLERS) { 
            return false 
          } 
 
          return true 
        } 
      } 
    } 
 
    // More conventional mapping to controller/action. Besides added "api" prefix, it is the same as Grails default mapping. 
    "/api/$controller/$action?" { 
      constraints { 
        controller validator: { controllerName, obj -> 
          if (controllerName in DEFAULT_MAPPING_EXCLUDED_CONTROLLERS) { 
            return false 
          } 
 
          return true 
        } 
      } 
    } 
 
    "/login/$action?"(controller: "login") 
    "/logout/$action?"(controller: "logout") 
 
    "/app/$action?"(controller: "app") 
    "/admin/$action?"(controller: "admin") 
 
    "/"(controller: "app", action: "rootHomePage") 
    "401"(controller: "grichErrorHandling", action: "handleException") 
    "404"(controller: "grichErrorHandling", action: "handleException") 
    "500"(controller: "grichErrorHandling", action: "handleException") 
  } 
} 