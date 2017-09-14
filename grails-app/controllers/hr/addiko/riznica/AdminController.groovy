package hr.addiko.riznica

class AdminController {
  def index() {
    def dbConsoleUrl = grailsApplication.config.grails.dbconsole.urlRoot
    [dbConsoleUrl: dbConsoleUrl]
  }

  def grailsWelcome() {
  }
}
