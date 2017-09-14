package hr.addiko.riznica.login.presentation

import grails.plugin.grich.core.util.GrichCoreWebConstants
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.web.authentication.logout.LogoutHandler
import org.springframework.util.Assert
import org.springframework.web.servlet.i18n.SessionLocaleResolver

import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse
import javax.servlet.http.HttpSession

class RiznicaWebLogoutHandler implements LogoutHandler {

  @Override
  void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
    Assert.notNull(request, "HttpServletRequest required")
    HttpSession session = request.getSession(false)
    if (session != null) {
      Locale currentSessionLocale
      if (session[SessionLocaleResolver.LOCALE_SESSION_ATTRIBUTE_NAME]) {
        currentSessionLocale = session[SessionLocaleResolver.LOCALE_SESSION_ATTRIBUTE_NAME] as Locale
      }

      String currentSessionTheme
      if (session[GrichCoreWebConstants.CURRENT_EXTJS_THEME_SESSION_ATTRIBUTE_NAME]) {
        currentSessionTheme = session[GrichCoreWebConstants.CURRENT_EXTJS_THEME_SESSION_ATTRIBUTE_NAME] as String
      }

      session.invalidate()

      if (currentSessionLocale || currentSessionTheme) {
        session = request.getSession(true)

        if (currentSessionLocale) {
          session[SessionLocaleResolver.LOCALE_SESSION_ATTRIBUTE_NAME] = currentSessionLocale
        }

        if (currentSessionTheme) {
          session[GrichCoreWebConstants.CURRENT_EXTJS_THEME_SESSION_ATTRIBUTE_NAME] = currentSessionTheme
        }
      }
    }

    SecurityContextHolder.clearContext()
  }
}
