Ext.define('riznica.core.infrastructure.ApplicationUtils', {

  statics: {
    appReady: false,

    /**
     * Before page reload or when navigating of page prompts user for confirmation
     */
    onBeforeWindowUnload: function(event) {
      var notificationMessage = 'Zatvaranjem ili ponovnim učitavanjem stranice izgubit ćete sve nepohranjene podatke.';

      if (event) {
        event.returnValue = notificationMessage;
      }

      if (window.event) {
        window.event.returnValue = notificationMessage;
      }

      return notificationMessage;
    }
  }
});
