package hr.addiko.riznica.viewport

import grails.plugin.grich.core.util.GrichCoreWebConstants

class ViewportController {
  def changeTheme(String newTheme, String currentToolkit) {
    if (grailsApplication.config.grich.core.jslib.sencha.extjs.rbvt.supportedThemes[currentToolkit + "Toolkit"].contains(newTheme)) {
      session[GrichCoreWebConstants.CURRENT_EXTJS_THEME_SESSION_ATTRIBUTE_NAME] = newTheme
    }

    redirect(controller: "app", action: "app")
  }
}
