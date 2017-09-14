package hr.addiko.riznica

import grails.plugin.springsecurity.SpringSecurityUtils

class AppController {

  def index() {
    if (SpringSecurityUtils.ifAllGranted("ROLE_ADMIN")) {
      redirect controller: "admin"
    }
    else {
      redirect action: "app"
    }
  }

  def rootHomePage() {
    render(view: "/index")
  }

  def app() {
    // Prevent any caching for this action's output
    response.setHeader "Cache-Control", "no-store, no-cache, must-revalidate"
  }
}
