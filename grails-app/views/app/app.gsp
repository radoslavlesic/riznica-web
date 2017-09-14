<%@page import="hr.addiko.riznica.core.infrastructure.RiznicaWebConstants; grails.plugin.grich.core.util.JJsonUtils; org.springframework.security.core.context.SecurityContextHolder; org.apache.commons.lang.LocaleUtils; groovy.json.JsonOutput; grails.plugin.grich.core.util.GrichCoreWebConstants; grails.plugin.grich.core.security.csrf.CsrfTokenManager" contentType="text/html;charset=UTF-8" %>
<%@page defaultCodec="none" %>

<%
  def contextPath = request.contextPath.encodeAsHTML()
  def extjsApplicationName = "riznica"
  def senchaWorkspaceLocationPart = "${grailsApplication.config.grich.core.jslib.sencha.workspaceLocation}"
  def extjsDynamicLoading = grailsApplication.config.grich.core.jslib.sencha.extjs[extjsApplicationName].dynamicLoading
  def extjsBuildEnvironment = grailsApplication.config.grich.core.jslib.sencha.extjs[extjsApplicationName].buildEnvironment

  def extjsAllAppsLocationPart
  if (extjsDynamicLoading) {
    extjsAllAppsLocationPart = "${grailsApplication.config.grich.core.jslib.sencha.extjs.allAppsLocation}"
  }
  else {
    extjsAllAppsLocationPart = "${grailsApplication.config.grich.core.jslib.sencha.buildLocation}/${extjsBuildEnvironment}"
  }

  def extjsApplicationLocationPart = "${grailsApplication.config.grich.core.jslib.sencha.extjs[extjsApplicationName].appLocation}"
  def extjsApplicationFullWebLocation = "${contextPath}${senchaWorkspaceLocationPart}${extjsAllAppsLocationPart}${extjsApplicationLocationPart}"

  def currentLocale = grailsApplication.mainContext.getBean("localeResolver").resolveLocale(request)
  List<String> supportedLocaleCodeList = grailsApplication.config.grich.core.jslib.sencha.extjs[extjsApplicationName].appJson.locales
  String defaultLocaleCode = supportedLocaleCodeList[0]
  String currentLocaleCode = currentLocale.toString()

  Locale englishLocale = new Locale("en")
  Map localeCodeNameMap = [:]
  supportedLocaleCodeList.each { String localeCode ->
    Locale localeCodeLocale =  LocaleUtils.toLocale(localeCode)
    String languageName = localeCodeLocale.getDisplayLanguage(englishLocale)
    String languageNativeName = localeCodeLocale.getDisplayLanguage(localeCodeLocale)
    localeCodeNameMap << ["${localeCode}": [name: languageName, nativeName: languageNativeName]]
  }
  def localeCodeNameMapJson = JsonOutput.prettyPrint(JsonOutput.toJson(localeCodeNameMap))

  def currentTheme = ""
  if (session[GrichCoreWebConstants.CURRENT_EXTJS_THEME_SESSION_ATTRIBUTE_NAME]) {
    currentTheme = session[GrichCoreWebConstants.CURRENT_EXTJS_THEME_SESSION_ATTRIBUTE_NAME]
  }

  def supportedThemesClassicToolkit = grailsApplication.config.grich.core.jslib.sencha.extjs[extjsApplicationName].supportedThemes.classicToolkit
  def supportedThemesClassicToolkitAsJavaScriptArray = "[${supportedThemesClassicToolkit.collect({ "'${it}'"}).join(', ')}]"
  def defaultThemeClassicToolkit = grailsApplication.config.grich.core.jslib.sencha.extjs[extjsApplicationName].defaultTheme.classicToolkit

  def supportedThemesModernToolkit = grailsApplication.config.grich.core.jslib.sencha.extjs[extjsApplicationName].supportedThemes.modernToolkit
  def supportedThemesModernToolkitAsJavaScriptArray = "[${supportedThemesModernToolkit.collect({ "'${it}'"}).join(', ')}]"
  def defaultThemeModernToolkit = grailsApplication.config.grich.core.jslib.sencha.extjs[extjsApplicationName].defaultTheme.modernToolkit

  def appNameLong = grailsApplication.config.grich.core.jslib.sencha.extjs.riznica.appNameLong
  def appHtmlTitle = grailsApplication.config.grich.core.jslib.sencha.extjs.riznica.appHtmlTitle

  def authentication = SecurityContextHolder.context.authentication
  def authorityList = authentication.authorities
  def authorityListStringAsJavaScriptArray = "[${authorityList.collect({ "'${it.authority}'"}).join(', ')}]"
  def principal = authentication.principal
  def maxSearchResults = RiznicaWebConstants.MAX_SEARCH_RESULTS

  def csrfActive = grailsApplication.config.grich.core.security.csrf.active
  def csrfInitialToken = csrfInitialToken
  def csrfTokenHeaderName = grailsApplication.config.grich.core.security.csrf.tokenHeaderName ?: CsrfTokenManager.CSRF_TOKEN_HEADER_NAME
  def csrfPingUri = grailsApplication.config.grich.core.security.csrf.pingUri ?: CsrfTokenManager.CSRF_DEFAULT_PING_URI
  def csrfPingIntervalMilliseconds = grailsApplication.config.grich.core.security.csrf.pingIntervalMilliseconds
  def csrfPingIntervalAfterErrorMilliseconds = grailsApplication.config.grich.core.security.csrf.pingIntervalAfterErrorMilliseconds
  def csrfPingAfterErrorRetries = grailsApplication.config.grich.core.security.csrf.pingAfterErrorRetries
  def csrfPingMinimalRescheduleIntervalMilliseconds = grailsApplication.config.grich.core.security.csrf.pingMinimalRescheduleIntervalMilliseconds

%>
<!DOCTYPE html>
<html manifest="">
<head>

  <meta http-equiv="X-UA-Compatible" content="IE=edge">

  <%-- Disable google translate popup --%>
  <meta name="google" content="notranslate">

  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

  <title>${appHtmlTitle}</title>

  <script type="text/javascript">
    // This variable should have the same name as is the value of extjsApplicationName groovy variable declared above
    var riznica = riznica || {};

    riznica.configuration = {
      contextPath: '${contextPath}',
      appNameLong: '${appNameLong}',
      localeCodeCurrent: '${currentLocaleCode}',
      localeCodeDefault: '${defaultLocaleCode}',
      localeCodeSupportedList: [${supportedLocaleCodeList.collect({ "'${it}'"}).join(', ')}],
      localeCodeNameMapping: ${localeCodeNameMapJson},
      defaultDateFormat: 'd.m.Y',
      defaultDateTimeFormat: 'd.m.Y H:i',
      defaultSubmitDateFormat: 'Y-m-d\\TH:i:s',
      maxSearchResults: '${maxSearchResults}',

      // Theme related configs are populated after they are calculated in Ext.beforeLoad()
      supportedThemeList: null,
      currentTheme: null,

      security: {
        authorityList: ${authorityListStringAsJavaScriptArray},
        userName: '${principal.username}',
        csrf: {
          active: ${csrfActive},
          initialToken: ${csrfInitialToken ? "'" + csrfInitialToken + "'" : "null"},
          tokenHeaderName: '${csrfTokenHeaderName}',
          pingUri: '${csrfPingUri}',
          pingIntervalMilliseconds: ${csrfPingIntervalMilliseconds ? csrfPingIntervalMilliseconds : 30000},
          pingIntervalAfterErrorMilliseconds: ${csrfPingIntervalAfterErrorMilliseconds ? csrfPingIntervalAfterErrorMilliseconds : 30000},
          pingAfterErrorRetries: ${csrfPingAfterErrorRetries ? csrfPingAfterErrorRetries : 5},
          pingMinimalRescheduleIntervalMilliseconds: ${csrfPingMinimalRescheduleIntervalMilliseconds ? csrfPingMinimalRescheduleIntervalMilliseconds : 60000}
        }
      }
    };
  </script>

  <asset:stylesheet src="startupSpinner/startupSpinner.css"/>
  <asset:javascript src="startupSpinner/spin.js"/>

  <script type="text/javascript">
    var Ext = Ext || {}; // Ext namespace won't be defined yet...

    // This function is called by the Microloader after it has performed basic device detection. The results are provided in the "tags" object. You can use these tags here or even add custom tags.
    // These can be used by platform filters in your manifest or by platformConfig expressions in your app.
    Ext.beforeLoad = function (tags) {
      var toolkit = tags.desktop ? 'classic' : 'modern';
      var locationSearch = location.search;
      var supportedThemes = [];
      var defaultTheme;
      var currentTheme = '${currentTheme}';
      var isThemeSupported = false;
      var arrayLength, i;

      // Allow location search override for toolkit to be used
      if (locationSearch.match(/\bclassic\b/)) {
        toolkit = 'classic';
      }
      else if (locationSearch.match(/\bmodern\b/)) {
        toolkit = 'modern';
      }

      // Disabling modern toolkit. If modern toolkit is required, comment out the line bellow, and remove JSUnusedAssignment comment just before script tag.
      toolkit = "classic";

      switch(toolkit) {
        case 'modern':
          supportedThemes = ${supportedThemesModernToolkitAsJavaScriptArray};
          defaultTheme = '${defaultThemeModernToolkit}';

          Ext.platformTags.classicToolkit = false;
          Ext.platformTags.modernToolkit = true;
          break;
        default:
          supportedThemes = ${supportedThemesClassicToolkitAsJavaScriptArray};
          defaultTheme = '${defaultThemeClassicToolkit}';

          Ext.platformTags.classicToolkit = true;
          Ext.platformTags.modernToolkit = false;
          break;
      }

      if (currentTheme) {
        arrayLength = supportedThemes.length;
        for (i = 0; i < arrayLength; i++) {
          if (currentTheme === supportedThemes[i]) {
            isThemeSupported = true;
            break;
          }
        }

        if (isThemeSupported === false) {
          currentTheme = defaultTheme;
        }
      }
      else {
        currentTheme = defaultTheme;
      }

      Ext.manifest = '${extjsApplicationFullWebLocation}' + '/${extjsApplicationName}-' + toolkit + '-' + currentTheme + '-${currentLocaleCode}';

      riznica.configuration.suportedThemeList = supportedThemes;
      riznica.configuration.currentTheme = currentTheme;

      // This function is called once the manifest is available but before any data is pulled from it. Function can be used to peek at and/or modify the manifest object.
      return function (manifest) {
        Ext.Boot.Request.prototype.isAbsoluteOrRootUrlRegex = new RegExp('^([a-z]+://|//|/)');
        Ext.Boot.Request.prototype.prepareUrl = function(url) {
          if(this.prependBaseUrl || this.isAbsoluteOrRootUrlRegex.test(url) === false) {
            return Ext.Boot.baseUrl + url;
          }
          return url;
        };
      };
    };
  </script>

  <!-- The line below must be kept intact for Sencha Cmd to build your application -->
  <script id="microloader" data-app="c9e78a5e-350f-4fe0-9fba-e5ce1cc06d6d" type="text/javascript" src="${extjsApplicationFullWebLocation}/bootstrap.js?_dc=${new Date().time}"></script>
</head>
<body>
  <div id="startup-mask">
    <div id="startup-spinner"></div>
    <div id="startup-text" class="startupText">${appNameLong}</div>
  </div>
  <script type="text/javascript">
    var riznica = riznica || {};
    riznica.startupSpinnerRunner = function() {
      var opts = {
        lines: 12, // The number of lines to draw
        length: 25, // The length of each line
        width: 8, // The line thickness
        radius: 25, // The radius of the inner circle
        scale: 1, // Scales overall size of the spinner
        corners: 0.8, // Corner roundness (0..1)
        color: ['#fff'], // #rgb or #rrggbb or array of colors
        opacity: 0.3, // Opacity of the lines
        rotate: 0, // The rotation offset
        direction: 1, // 1: clockwise, -1: counterclockwise
        speed: 1, // Rounds per second
        trail: 80, // Afterglow percentage
        fps: 20, // Frames per second when using setTimeout() as a fallback for CSS
        zIndex: 2e9, // The z-index (defaults to 2000000000)
        className: 'spinner', // The CSS class to assign to the spinner
        top: '45%', // Top position relative to parent
        left: '50%', // Left position relative to parent
        shadow: false, // Whether to render a shadow
        hwaccel: true, // Whether to use hardware acceleration
        position: 'absolute' // Element positioning
      };

      var target = document.getElementById('startup-spinner');
      riznica.startupSpinnerStartTime = Date.now();
      return new Spinner(opts).spin(target);
    };

    riznica.startupSpinner = riznica.startupSpinnerRunner();
  </script>
</body>
</html>
