/**
 * The main application class. An instance of this class is created by app.js when it calls Ext.application(). This is the ideal place to handle application launch and initialization details.
 */
Ext.define('riznica.Application', {
  extend: 'Ext.app.Application',

  requires: [
    'Ext.overrides.data.ChainedStore',
    'Ext.overrides.form.Basic',
    'Ext.overrides.form.field.Number',
    'Ext.overrides.form.field.TextFeatures',
    'Ext.overrides.ux.toolbar.GridSearching',
    'Ext.toolbar.Paging',
    'Ext.ux.form.trigger.Clear',
    'Ext.ux.PagingToolbarResizer',
    'Ext.ux.toolbar.GridSearching',
    'grich.core.component.SecurablePlugin',
    'grich.core.form.FormConfigurationManager',
    'grich.core.form.FormConfigurationManager', // Make sure that FormConfigurationManager singleton is activated
    'grich.core.json.AjaxJsonResponseManager', // Make sure that AjaxJsonResponseManager singleton is activated
    'grich.core.security.CsrfAjaxManager'
  ],

  name: 'riznica',

  // global shared stores
  stores: ['riznica.main.store.TopLevelNavigationTreeStore'],

  init: function() {
    // Suppress aria warnings for buttons with menus (https://docs.sencha.com/extjs/6.0/whats_new/6.0.0/extjs_upgrade_guide.html#Button).
    Ext.enableAriaButtons = false;

    // Override timeout - other timeouts (like for file upload) must be provided as option parameter when calling submit method
    Ext.Ajax.setTimeout(riznica.core.infrastructure.RiznicaConstants.REQUEST_TIMEOUT_MILLIS);

    // Setup SecurablePlugin
    //noinspection JSUnresolvedVariable
    grich.core.component.SecurablePlugin.currentUserAuthorityList = riznica.configuration.security.authorityList;

    // Setup CsrfAjaxManager -- start
    //noinspection JSUnresolvedVariable
    Ext.apply(grich.core.security.CsrfAjaxManager, {
      active: riznica.configuration.security.csrf.active,
      token: riznica.configuration.security.csrf.initialToken,
      tokenHeaderName: riznica.configuration.security.csrf.tokenHeaderName,
      pingUri: riznica.configuration.contextPath + riznica.configuration.security.csrf.pingUri,
      pingIntervalMilliseconds: riznica.configuration.security.csrf.pingIntervalMilliseconds,
      pingIntervalAfterErrorMilliseconds: riznica.configuration.security.csrf.pingIntervalAfterErrorMilliseconds,
      pingAfterErrorRetries: riznica.configuration.security.csrf.pingAfterErrorRetries
    });

    grich.core.security.CsrfAjaxManager.initialize();
    // Setup CsrfAjaxManager -- end

    //noinspection JSUnresolvedVariable
    grich.core.form.FormConfigurationManager.initialize({
      readFormConfigurationUrl: riznica.configuration.contextPath + '/api/grichFormConfiguration/readFormConfiguration'
    });

    var launchFunction = this.transformLaunch();
    riznica.core.infrastructure.RiznicaStoreUtils.loadAndRegisterAllStores(launchFunction);
  },

  transformLaunch : function() {
    var me = this;
    var oldLaunch = me.launch;

    me.launch = function() {};

    return oldLaunch.bind(me);
  },

  launch: function() {
    var me = this;
    me.removeStartupLoadingMask();
  },

  removeStartupLoadingMask: function() {
    var startupSpinnerStartTime = riznica.startupSpinnerStartTime;
    var currentTime = Date.now();
    var startupSpinnerRunningTime = currentTime - startupSpinnerStartTime;
    var desiredTotalSpinnerShowTime = 2000;
    var additionalDelayTime = desiredTotalSpinnerShowTime - startupSpinnerRunningTime;

    var shutDownStartupSpinner = function() {
      var startupSpinner;
      var startupMaskElement;
      var startupTextElement;

      startupSpinner = Ext.get('startup-spinner');
      if (startupSpinner) {
        if (riznica.startupSpinner) {
          riznica.startupSpinner.stop();

          riznica.startupSpinner = null;
          riznica.startupSpinnerRunner = null;
          riznica.startupSpinnerStartTime = null;

          delete riznica.startupSpinner;
          delete riznica.startupSpinnerRunner;
          delete riznica.startupSpinnerStartTime;
        }

        Ext.removeNode(startupSpinner);
      }

      startupTextElement = Ext.get('startup-text');
      if (startupTextElement) {
        Ext.removeNode(startupTextElement);
      }

      startupMaskElement = Ext.get('startup-mask');
      if (startupMaskElement) {
        //noinspection JSUnresolvedVariable
        if (Ext.platformTags.classicToolkit) {
          startupMaskElement.fadeOut({ remove: true, duration: 1000 });
        }
        else {
          Ext.removeNode(startupMaskElement);
        }
      }
    };

    if (additionalDelayTime > 100) {
      //noinspection JSValidateTypes
      Ext.defer(shutDownStartupSpinner, additionalDelayTime);
    }
    else {
      shutDownStartupSpinner();
    }
  },

  onAppUpdate: function() {
    Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
        function(choice) {
          if (choice === 'yes') {
            window.location.reload();
          }
        }
    );
  }
});
