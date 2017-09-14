package hr.addiko.riznica.misc

import grails.plugin.grich.core.util.JJsonUtils
import grails.plugin.grich.core.util.ResponseUtils
import grails.util.Environment

class MiscController {
  def about() {
    Map aboutMap = [
        name: grailsApplication.metadata["info.app.name"],
        longName: grailsApplication.config.grich.core.general.appNameLong,
        description: grailsApplication.config.grich.core.general.appNameLong,
        author: "CROZ d.o.o.",
        developmentTeam: "CROZ d.o.o.",
        supportContact: "CROZ d.o.o.",
        version: grailsApplication.metadata["info.app.version"],
        grailsVersion: "${grailsApplication.metadata["info.app.grailsVersion"]}, env: ${Environment.currentEnvironment.name}",
        build: "n/a",
        startupTime: new Date(grailsApplication.mainContext.startupDate)
    ]

    Map mapToReturn = ResponseUtils.createResponseMap(aboutMap)
    render JJsonUtils.objectToRenderMethodMap(mapToReturn)
  }
}
