package hr.addiko.riznica.core.infrastructure

class RiznicaWebConstants {

  // User roles - start
  static final String ROLE_ADMIN = "ROLE_ADMIN"
  static final String ROLE_ADMIN_APP = "ROLE_ADMIN_APP"
  static final String ROLE_ADMIN_REGISTRY = "ROLE_ADMIN_REGISTRY"
  // User roles - end

  static final String BIG_DECIMAL_FORMAT = /^[0-9]{1,3}(?:\.[0-9]{3})*(,[0-9]{1,2})?$/
  static final String INTEGER_FORMAT =  /^[0-9]+$/
  static final String DATE_FORMAT = 'dd.MM.yyyy'

  static final int MAX_SEARCH_RESULTS = 5000
}
