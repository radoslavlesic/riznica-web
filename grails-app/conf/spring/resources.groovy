import grails.plugin.grich.core.web.ConstrainedSessionLocaleResolver
import hr.addiko.riznica.login.presentation.RiznicaWebLogoutHandler
 
beans = { 
 
  localeResolver(ConstrainedSessionLocaleResolver)

  localeResolverSavingLogoutHandler(RiznicaWebLogoutHandler)

}