// TODO move to grich-registry
Ext.define('riznica.core.infrastructure.RiznicaStoreUtils', {
  requires: [

  ],

  statics: {
    loadAndRegisterAllStores: function(launchApplicationFunction) {

      launchApplicationFunction();
      // Set flag to true indicating that all necessary data has finished loading and application is ready to render
      riznica.core.infrastructure.ApplicationUtils.appReady = true;
      // Fire global event to notify that application is ready to render (needed so any stopped route can be resumed)
      Ext.GlobalEvents.fireEvent('appready');
    }

  }
});
