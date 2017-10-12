package hr.addiko.riznica

import grails.core.GrailsApplication 
import grails.plugin.grich.core.util.JJsonUtils 
import grails.plugin.grich.core.web.ConstrainedSessionLocaleResolver
import hr.addiko.riznica.blog.Category
import hr.addiko.riznica.blog.Comment
import hr.addiko.riznica.blog.Post
import hr.addiko.riznica.order.OrderCategory
import hr.addiko.riznica.order.product.Product
import org.apache.commons.lang.LocaleUtils
import grails.util.Environment
import org.joda.time.DateTime

import java.text.SimpleDateFormat

class BootStrap { 
 
  GrailsApplication grailsApplication
 
  // "jacksonObjectMapperHolder" is a bean defined and configured in grich-core. 
  JJsonUtils jacksonObjectMapperHolder 
 
  def init = { servletContext -> 
    importExtJsConfiguration() 
 
    logSystemAndConfig()
 
    logApplicationStart()
    createTestUser()

    createPerson()

    createBlog()

    createOrder()
  }

  private createBlog(){

    /** init Category data **/
    new Category(name: 'History').save(flush:true)
    new Category(name: 'Sport').save(flush:true)
    new Category(name: 'News').save(flush:true)


    /** init Post data **/
//    String timeStamp = new SimpleDateFormat("dd.MM.yyyy HH:mm:ss").format(Calendar.getInstance().getTime());


    /** found Cat id and save new Post **/
    def  foundCat = Category.get(3)

    Post post = new Post(title: 'Post title', content: 'Content for some post', category: Category.findById(1),
            user: User.findById(1),authorName: User.findById(1).username)

    5.times{
      post = new Post(title: 'Post title '+it, content: 'Content for some post '+it,category: foundCat,
              user: User.findById(1),authorName: User.findById(1).username)

      post.save(flush: true)
    }


    /** found UserId and save new Comment **/
    Comment comm = new Comment(content: 'Neki komentar',
            user: User.findById(1), post: Post.findById(1))
    comm.save(flush: true)

  }

  private createPerson(){
    new Person(name: "radoslav", email: "rlesic@croz.net", phone: "555-555-555").save(flush: true)
  }

  private createOrder(){
    new OrderCategory(name: 'Pizza').save(flush: true)

//    Product pro
//
//    15.times {
//      pro = new Product(title: "product "+it++, description: "neki opis", price: it+0.12, image: null).save(flush: true)
//    }

  }

  private createTestUser() {

    def adminRole = new Role(authority: 'ROLE_ADMIN').save(flush: true, failOnError: true)
    def userRole = new Role(authority: 'ROLE_USER').save(flush: true, failOnError: true)

    switch (Environment.current) {
      case Environment.DEVELOPMENT:

        def admin = new User(username: "admin", password: "admin", enabled: true).save(flush: true)
        UserRole.create(admin, adminRole).save(flush: true)
        UserRole.create(admin, userRole).save(flush: true)

        def user = new User(username: "user", password: "user", enabled: true).save(flush: true)
        UserRole.create(user, userRole).save(flush: true)

        assert User.count() == 2
        assert Role.count() == 2
        assert UserRole.count() == 3

        break
      case Environment.PRODUCTION:
        break
    }
  }

  private importExtJsConfiguration() { 
    // Parsing app.json of all extjs applications, and set result in extjs application specific (determined by extjs application name) grails configuration. Json parsing preserves order of 
    // declaration defined in app.json 
    // Parsing and setting configuration - start 
    def extApplicationNameList = grailsApplication.config.grich.core.jslib.sencha.extjs.applicationNames as List 
    def senchaWorkspaceLocationPart = grailsApplication.config.grich.core.jslib.sencha.workspaceLocation 
    def extjsAllAppsLocationPart = grailsApplication.config.grich.core.jslib.sencha.extjs.allAppsLocation 
 
    extApplicationNameList.each { String extApplicationName -> 
      def extjsApplicationNameLocationPart = "${grailsApplication.config.grich.core.jslib.sencha.extjs[extApplicationName].appLocation}" 
      def appJsonFullLocation = "${senchaWorkspaceLocationPart}${extjsAllAppsLocationPart}${extjsApplicationNameLocationPart}/app.json" 
 
      // Here we are using jackson object mapper configured and instantiated in grich-core. To be able to read app.json, jackson object mapper is configured to allow json comments. More important, 
      // beside we are asking here for LinkedHashMap, for storing json objects jackson also uses LinkedHashMap internally, which is necessary for preserving an order of declaration used in json file. 
      // That order is important to determine default themes when "default" flag is not specified. 
      LinkedHashMap senchaAppJson = jacksonObjectMapperHolder.jacksonObjectMapper.readValue(grailsApplication.mainContext.getResource(appJsonFullLocation).file, LinkedHashMap) 
 
      grailsApplication.config.grich.core.jslib.sencha.extjs[extApplicationName] << [appJson: senchaAppJson as ConfigObject] 
    } 
    // Parsing and setting configuration - end 
 
    // Configuring supported and default themes per extjs toolkit - start 
    extApplicationNameList.each { String extApplicationName -> 
      Map supportedThemes = [classicToolkit: [] as Set, modernToolkit: [] as Set] 
      Map defaultTheme = [classicToolkit: null, modernToolkit: null] 
      Map firstDetectedTheme = [classicToolkit: null, modernToolkit: null] 
 
      Map extApplicationBuilds = grailsApplication.config.grich.core.jslib.sencha.extjs[extApplicationName].appJson.builds 
      extApplicationBuilds.each { String key, def value -> 
        String buildName = key 
        List buildNameParts = buildName.tokenize("-") 
        String toolkit = buildNameParts[1] 
        String theme = buildNameParts[2] 
        Boolean isDefault = value.default 
 
        supportedThemes["${toolkit}Toolkit"] << theme 
        if (isDefault && !defaultTheme["${toolkit}Toolkit"]) { 
          defaultTheme["${toolkit}Toolkit"] = theme 
        } 
 
        if (!firstDetectedTheme["${toolkit}Toolkit"]) { 
          firstDetectedTheme["${toolkit}Toolkit"] = theme 
        } 
      } 
 
      ["classic", "modern"].each { String toolkit -> 
        if (!defaultTheme["${toolkit}Toolkit"]) { 
          defaultTheme["${toolkit}Toolkit"] = firstDetectedTheme["${toolkit}Toolkit"] 
        } 
      } 
 
      grailsApplication.config.grich.core.jslib.sencha.extjs[extApplicationName].supportedThemes = supportedThemes 
      grailsApplication.config.grich.core.jslib.sencha.extjs[extApplicationName].defaultTheme = defaultTheme 
    } 
    // Configuring supported and default themes per extjs toolkit - end 
 
    // Configuring locale resolver - start 
    // First listed application name is considered main extjs application name. Default locale is set based on settings of main extjs application name. First entry of app.json "locales" key is used 
    // for setting default grich application locale. 
    def mainExtjsApplicationName = extApplicationNameList[0] as String 
    def mainExtjsApplicationLocaleList = grailsApplication.config.grich.core.jslib.sencha.extjs[mainExtjsApplicationName].appJson.locales as List 
    ConstrainedSessionLocaleResolver localeResolverBean = grailsApplication.mainContext.getBean("localeResolver", ConstrainedSessionLocaleResolver) 
    localeResolverBean.defaultLocale = LocaleUtils.toLocale(mainExtjsApplicationLocaleList[0] as String) 
    localeResolverBean.defaultLocaleCode = mainExtjsApplicationLocaleList[0] as String 
    localeResolverBean.supportedLocaleCodeList = mainExtjsApplicationLocaleList 
    // Configuring locale resolver - end 
  } 
 
  private logSystemAndConfig() { 
    log.info("========================================") 
    log.info("       System properties -- start") 
    log.info("========================================") 
    StringBuilder systemPropertiesBuilder = new StringBuilder() 
    System.properties.sort().each { key, value -> 
      systemPropertiesBuilder << "[${key}: ${value}]\n" 
    } 
    StringWriter systemPropertiesWriter = new StringWriter() 
    new StringReader(systemPropertiesBuilder.toString()).transformLine(systemPropertiesWriter, { "    $it"}) 
    log.info("\n$systemPropertiesWriter") 
    log.info("========================================") 
    log.info("       System properties -- end") 
    log.info("========================================") 
 
    log.info("") 
    log.info("========================================") 
    log.info("       System environment -- start") 
    log.info("========================================") 
    StringBuilder systemEnvironmentBuilder = new StringBuilder() 
    System.getenv().sort().each { key, value -> 
      systemEnvironmentBuilder << "[${key}: ${value}]\n" 
    } 
    StringWriter systemEnvironmentWriter = new StringWriter() 
    new StringReader(systemEnvironmentBuilder.toString()).transformLine(systemEnvironmentWriter, { "    $it"}) 
    log.info("\n$systemEnvironmentWriter") 
    log.info("========================================") 
    log.info("       System environment -- end") 
    log.info("========================================") 
 
    log.info("") 
    log.info("========================================") 
    log.info("   grailsApplication.config -- start") 
    log.info("========================================") 
    def configAsConfigObject = new ConfigSlurper().parse(grailsApplication.config.toProperties()) 
    String grailsApplicationConfigString = configAsConfigObject.writeTo(new StringWriter()).toString() 
    StringWriter grailsApplicationConfigWriter = new StringWriter() 
    new StringReader(grailsApplicationConfigString).transformLine(grailsApplicationConfigWriter, { String line -> 
      String transformedLine = line.replaceAll(/\t/, "    ") 
      "    $transformedLine" 
    }) 
    log.info("\n$grailsApplicationConfigWriter") 
    log.info("========================================") 
    log.info("   grailsApplication.config -- end") 
    log.info("========================================") 
  } 
 
  @SuppressWarnings("GrMethodMayBeStatic") 
  private logApplicationStart() { 
    log.info("========================================") 
    log.info("") 
    log.info("       Application is started.") 
    log.info("") 
    log.info("========================================") 
  } 
 
  def destroy = { 
    log.info("========================================") 
    log.info("") 
    log.info("    Application is shutting down...") 
    log.info("") 
    log.info("========================================") 
  } 
} 