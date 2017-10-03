spring.cache.ehcache.config = "classpath:ehcache.xml"
grails {
  config.locations = [
      "classpath:ConfigGrich.groovy",
      "classpath:ConfigSecurity.groovy",
      "classpath:ConfigEvents.groovy"
  ]
  resources.pattern = "/**"
  profile = "web"
  codegen {
    defaultPackage = "hr.addiko.riznica"
  }
  spring {
    transactionManagement {
      proxies = false
    }
  }
  dbconsole {
    enabled = true
    urlRoot = "/admin/dbconsole"
  }
  gorm.failOnError = true
  databinding.dateFormats = [
    "dd.MM.yyyy",
    "yyyy-MM-dd'T'hh:mm:ss'Z'",
    "yyyy-MM-dd'T'HH:mm:ss.SSSZ",
    "yyyy-MM-dd'T'HH:mm:ssZ",
    "yyyy-MM-dd'T'HH:mm:ss.SSS",
    "yyyy-MM-dd'T'HH:mm:ss",
    'yyyy-MM-dd HH:mm:ss.S',
    "yyyy-MM-dd'T'hh:mm:ssZ",
    "yyyy-MM-dd HH:mm:ss.S z"
  ]
}

info {
  app {
    name = "@info.app.name@"
    version = "@info.app.version@"
    grailsVersion = "@info.app.grailsVersion@"
  }
}

spring {
  main["banner-mode"] = "off"
  groovy {
    template["check-template-location"] = false
  }
}

endpoints {
  enabled = false
  jmx {
    enabled = true
  }
}

grails {
  mime {
    disable {
      accept {
        header {
          userAgents = ["Gecko", "WebKit", "Presto", "Trident"]
        }
      }
    }
    types {
      all = "*/*"
      atom = "application/atom+xml"
      css = "text/css"
      csv = "text/csv"
      form = "application/x-www-form-urlencoded"
      html = ["text/html", "application/xhtml+xml"]
      js = "text/javascript"
      json = ["application/json", "text/json"]
      multipartForm = "multipart/form-data"
      rss = "application/rss+xml"
      text = "text/plain"
      hal = ["application/hal+json", "application/hal+xml"]
      xml = ["text/xml", "application/xml"]
    }
  }
  urlmapping {
    cache {
      maxsize = 1000
    }
  }
  controllers {
    defaultScope = "singleton"
    upload {
      // current max upload size 200 Mb
      maxFileSize = 200 * 1024 * 1024
      maxRequestSize = 200 * 1024 * 1024
    }
  }
  converters {
    encoding = "UTF-8"
  }
  views {
    "default" { codec = "html" }
    gsp {
      encoding = "UTF-8"
      htmlcodec = "xml"
      codecs {
        expression = "html"
        scriptlets = "html"
        taglib = "none"
        staticparts = "none"
      }
    }
  }
}

endpoints {
  jmx["unique-names"] = true
}

hibernate {
  cache {
    queries = false
    use_second_level_cache = true
    use_query_cache = true
    region.factory_class = "org.hibernate.cache.ehcache.EhCacheRegionFactory"
  }
}

dataSource {
  pooled = true
  jmxExport = true
  driverClassName = "org.h2.Driver"
  logSql = true
  formatSql = true
  username = "sa"
  password = ""
  configClass = "org.grails.plugin.hibernate.filter.HibernateFilterDomainConfiguration"
}

String h2FileDbPrefix = "jdbc:h2:file:${System.properties.'user.home'}/devRuntime/riznica-web/environments/${Environment.current.name}/database/h2"
String h2FileDbSuffix = "MVCC=TRUE;LOCK_TIMEOUT=10000;DB_CLOSE_ON_EXIT=FALSE;AUTO_SERVER=TRUE"

//dbCreate = "create-drop" // one of 'create', 'create-drop', 'update', 'validate', ''
////      url = "jdbc:h2:mem:devDb;MVCC=TRUE;LOCK_TIMEOUT=10000;DB_CLOSE_ON_EXIT=FALSE"
//url = "${h2FileDbPrefix}/devDb;${h2FileDbSuffix}"

environments {
  development {
    riznica.bootstrap.createAllBootStrapData = true

    grails.plugin.databasemigration.dropOnStart = false
    grails.plugin.databasemigration.updateOnStart = true
    dataSource {
      dbCreate = "create-drop"
      url = "${h2FileDbPrefix}/devDb;${h2FileDbSuffix}"
    }
  }
  test {
    riznica.bootstrap.createAllBootStrapData = true

    grails.plugin.databasemigration.dropOnStart = false
    grails.plugin.databasemigration.updateOnStart = true
    dataSource {
      dbCreate = "create-drop"
      url = "${h2FileDbPrefix}/devDb;${h2FileDbSuffix}"
    }
  }
  production {
    dataSource {
      dbCreate = "none"
      url = "jdbc:h2:mem:prodDb;MVCC=TRUE;LOCK_TIMEOUT=10000;DB_CLOSE_ON_EXIT=FALSE"
    }
  }
}

// Added by the Spring Security Core plugin:
grails.plugin.springsecurity.userLookup.userDomainClassName = 'hr.addiko.riznica.User'
grails.plugin.springsecurity.userLookup.authorityJoinClassName = 'hr.addiko.riznica.UserRole'
grails.plugin.springsecurity.authority.className = 'hr.addiko.riznica.Role'
grails.plugin.springsecurity.controllerAnnotations.staticRules = [
	[pattern: '/',               access: ['permitAll']],
	[pattern: '/error',          access: ['permitAll']],
	[pattern: '/index',          access: ['permitAll']],
	[pattern: '/index.gsp',      access: ['permitAll']],
	[pattern: '/shutdown',       access: ['permitAll']],
	[pattern: '/assets/**',      access: ['permitAll']],
	[pattern: '/**/js/**',       access: ['permitAll']],
	[pattern: '/**/css/**',      access: ['permitAll']],
	[pattern: '/**/images/**',   access: ['permitAll']],
	[pattern: '/**/favicon.ico', access: ['permitAll']]
]

grails.plugin.springsecurity.filterChain.chainMap = [
	[pattern: '/assets/**',      filters: 'none'],
	[pattern: '/**/js/**',       filters: 'none'],
	[pattern: '/**/css/**',      filters: 'none'],
	[pattern: '/**/images/**',   filters: 'none'],
	[pattern: '/**/favicon.ico', filters: 'none'],
	[pattern: '/**',             filters: 'JOINED_FILTERS']
]

grails.plugin.databasemigration.changelogFileName = 'changelog.xml'
grails.plugin.databasemigration.updateOnStartFileName = 'changelog.xml'