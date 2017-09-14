grich {
  // Note: for additional grich config options, take a look in GrichCoreDefaultConfig.groovy from grich-core plugin.
  core {
    general {
      // These configurations are global across whole grich application. They are not related to a particular extjs application. However, in most cases, these settings will probably be equal to the
      // settings of the main extjs application.
      appNameCamelCased = "riznicaWeb"
      appNameLong = "Addiko: Riznica"
      appHtmlTitle = "${appNameLong}"
    }

    validation {
      defaultErrorCode = "default.controllerAction.failure.warning.notification.contentText"
      errorMessageFormat = "%s.invalid"
      notificationConfiguration = [notificationType: "fail", notificationSeverity: "WARNING"]
    }

    jslib {
      sencha {
        extjs {
          // List of all extjs applications (a.k.a pages) used in this grich application. First entry determines main extjs application.
          applicationNames = ["riznica"]

          riznica {
            appNameLong = "Addiko: Riznica"
            appHtmlTitle = "${appNameLong}"

            // This config is just for illustration and documentation purposes and should never be uncommented or edited.
            // appJson config will be determined by parsing app.json file of corresponding Ext JS application. This config content corresponds to the content of Ext JS app.json file.
            //
            // appJson = {
            //   ...
            // }

            // This config is just for illustration and documentation purposes and should never be uncommented or edited.
            // supportedThemes will be determined by parsing app.json file of corresponding Ext JS application.
            //
            // supportedThemes = [
            //    classicToolkit: ["classic", "triton", "crisp"],
            //    modernToolkit: ["triton", "cupertino"]
            // ]

            // This config is just for illustration and documentation purposes and should never be uncommented or edited.
            // defaultTheme will be determined by parsing app.json file of corresponding Ext JS application.
            //
            // defaultTheme = [
            //    classicToolkit: "triton",
            //    modernToolkit: "triton"
            // ]

            appLocation = "/riznica"
            appJsNamespace = "riznica"
            appCssFileName = "riznica-all.css"

            dynamicLoading = false

            // Can be one of "production" or "testing". It decides from which build folder (for which environment) compiled Java Script should be loaded.
            // This config parameter is only effective when dynamicLoading is set to false. Otherwise, with dynamicLoading equal to true, all JavaScript source is loaded from source folders instead
            // from build dir.
            buildEnvironment = "production"
          }
        }
      }
    }

    security {
      csrf {
        // Defines controller name and action name after which execution initial csrf token will be included in the returned model.
        // On a page which loads extjs app, that token must be used to set initial value of csrf token in javascript.

        // This config defines controllerName/actionName combinations for which csrf token validation/generation will be skipped.
        // This config option is used on server side of csrf prevention mechanism. Default is to include all controllers and all actions. Root context path ("/") is always excluded.
        csrfControllerActionExcludes = [
            [controllerName: "login"],
            [controllerName: "logout"],
            [controllerName: "admin"],
            [controllerName: "grichErrorHandling"],
            [controllerName: "app"],
            [controllerName: "viewport", actionNames: ["changeTheme"]]
        ]
      }
    }
  }
  search {
    maxSearchResults = 5000
  }
}

environments {
  development {
    grich {
      core {
        general {
          // Purpose of this config option is to slow down responses so that we can see if everything is correct with client side gui rendering, i.e. positioning and z-ordering of loading masks etc.
          ajaxResponseDelay = 1000
        }

        jslib {
          sencha {
            extjs {
              riznica {
                dynamicLoading = true

                // Can be one of "production" or "testing". See above for more info.
                buildEnvironment = "production"
              }
            }
          }
        }
      }
    }
  }

  test {
    grich {
      core {
        jslib {
          sencha {
            extjs {
              riznica {
                // In test environment we have disabled dynamicLoading and we use production JavaScript code since that way Siesta tests are much faster.
                // Note: for active development of tests, dynamicLoading should be set to true.
                dynamicLoading = false

                // Can be one of "production" or "testing". See above for more info.
                buildEnvironment = "production"
              }
            }
          }
        }

        security {
          csrf {
            csrfControllerActionExcludes = [
                [controllerName: "login"],
                [controllerName: "logout"],
                [controllerName: "admin"],
                [controllerName: "grichErrorHandling"],
                [controllerName: "app"],
                [controllerName: "viewport", actionNames: ["changeTheme"]],
                [controllerName: "siestaTest"]
            ]
          }
        }
      }
    }
  }

  developmentDeployment {
    grich {
      core {
        general {
          ajaxResponseDelay = 0
        }

        jslib {
          sencha {
            extjs {
              riznica {
                dynamicLoading = false
                buildEnvironment = "production"
              }
            }
          }
        }
      }
    }
  }
}
