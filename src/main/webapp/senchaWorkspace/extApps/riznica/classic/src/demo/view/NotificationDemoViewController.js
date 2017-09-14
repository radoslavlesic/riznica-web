Ext.define("riznica.demo.view.NotificationDemoViewController", {
  extend: "Ext.app.ViewController",

  alias: "controller.demo-view-NotificationDemoViewController",

  requires: [
    "grich.core.util.MiscUtils",
    "grich.core.util.NotificationUtils",
    "grich.core.util.AjaxSubmitHelper"
  ],

  listen: {
    global: {
      auxiliaryNotification: "onAuxiliaryNotification"
    }
  },

  onAuxiliaryNotification: function(auxiliaryNotificationData) {
    grich.core.util.NotificationUtils.showAuxiliaryNotification(auxiliaryNotificationData.notificationDescriptor);
  },

  onShowServerExceptionNotification: function() {
    this.executeAjaxCall("/api/demo/notificationDemo/runtimeException");
  },

  onShowSimpleNotification: function() {
    var me = this;
    var parameters = me.lookupReference("simpleNotificationFormPanel").getForm().getValues();

    me.executeAjaxCall("/api/demo/notificationDemo/simpleNotification", parameters);
  },

  onShowSimpleNotificationWithCustomStyle: function() {
    var me = this;
    var parameters = me.lookupReference("simpleNotificationFormPanel").getForm().getValues();

    me.executeAjaxCall("/api/demo/notificationDemo/simpleNotificationWithCustomStyle", parameters);
  },

  onShowSimpleNotificationWithAuxiliaryNotification: function() {
    var me = this;
    var parameters = me.lookupReference("simpleNotificationFormPanel").getForm().getValues();

    me.executeAjaxCall("/api/demo/notificationDemo/simpleNotificationWithAuxiliaryNotification", parameters);
  },

  onShowSimpleNotificationWithMessages: function() {
    var me = this;
    var parameters = me.lookupReference("simpleNotificationWithMessagesFormPanel").getForm().getValues();

    me.executeAjaxCall("/api/demo/notificationDemo/simpleNotificationWithMessages", parameters);
  },

  onShowSimpleNotificationWithMessagesAndPlainTemplate: function() {
    var me = this;
    var parameters = me.lookupReference("simpleNotificationWithMessagesFormPanel").getForm().getValues();

    me.executeAjaxCall("/api/demo/notificationDemo/simpleNotificationWithMessagesAndPlainTemplate", parameters);
  },

  onShowAdvancedNotificationWithMessages: function() {
    var me = this;
    var parameters = me.lookupReference("advancedNotificationWithMessagesFormPanel").getForm().getValues();

    me.executeAjaxCall("/api/demo/notificationDemo/advancedNotificationWithMessages", parameters);
  },

  onShowServerValidationFailureNotification: function() {
    var me = this;
    var parameters = me.lookupReference("serverValidationFailureNotificationFormPanel").getForm().getValues();

    me.executeAjaxCall("/api/demo/notificationDemo/serverSideValidationFailureNotification", parameters);
  },

  onShowServerSuccessNotification: function() {
    var me = this;
    var parameters = me.lookupReference("serverSuccessNotificationFormPanel").getForm().getValues();

    me.executeAjaxCall("/api/demo/notificationDemo/serverSideValidationFailureNotification", parameters);
  },

  onValidateFace: function() {
    var me = this;

    //noinspection JSUnresolvedVariable
    var url = riznica.configuration.contextPath + "/api/demo/notificationDemo/cascadingValidateFace";

    var jsonData = {
      ownerName: "me",
      noseCommand: {
        shape: "2",
        noseColorCommand: {
          colorName: "a"
        }
      }
    };

    grich.core.util.AjaxSubmitHelper.invokeRequest({
      url: url,
      method: "POST",
      jsonData: jsonData,
      serverValidationStatusComponents: me.lookupReference("cascadingValidationServerStatus"),
      forceAutoCloseNotificationIfServerValidationStatusComponentsPresent: true,
      maskComponents: me.getView()
    });
  },

  onValidateAuthor: function() {
    var me = this;

    //noinspection JSUnresolvedVariable
    var url = riznica.configuration.contextPath + "/api/demo/notificationDemo/cascadingValidateAuthor";

    var jsonData = {
      name: "me",
      books: [
        {
          title: "01",
          chaptersMap: {
            chapter001: {
              chapterTitle: "01"
            },
            chapter002: {
              chapterTitle: "02"
            }
          }
        },
        {
          title: "002",
          chaptersMap: {
            chapter003: {
              chapterTitle: "03",
              chapterWordCount: "100",
              chapterCharacterCount: "10"
            }
          }
        },
        {
          title: "03",
          chaptersMap: {
            chapter004: {
              chapterTitle: "004"
            }
          }
        }
      ]
    };

    grich.core.util.AjaxSubmitHelper.invokeRequest({
      url: url,
      method: "POST",
      jsonData: jsonData,
      serverValidationStatusComponents: me.lookupReference("cascadingValidationServerStatus"),
      forceAutoCloseNotificationIfServerValidationStatusComponentsPresent: true,
      maskComponents: me.getView()
    });
  },

  /**
   * @private
   */
  executeAjaxCall: function(applicationUrl, parameters) {
    var me = this;
    var myView = me.getView();

    //noinspection JSUnresolvedVariable
    var url = riznica.configuration.contextPath + applicationUrl;

    grich.core.util.MiscUtils.toggleLoadMask(myView);

    Ext.Ajax.request({
      url: url,
      jsonData: parameters,
      callback: function() {
        grich.core.util.MiscUtils.toggleLoadMask(myView);
      }
    });
  }
});
