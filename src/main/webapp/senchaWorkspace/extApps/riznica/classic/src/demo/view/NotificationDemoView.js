Ext.define("riznica.demo.view.NotificationDemoView", {
  extend: "Ext.panel.Panel",
  xtype: "demo-view-NotificationDemoView",

  requires: [
    "Ext.button.Button",
    "Ext.form.FieldSet",
    "Ext.form.Panel",
    "Ext.form.RadioGroup",
    "Ext.layout.container.HBox",
    "riznica.demo.view.NotificationDemoViewController",
    "grich.core.component.form.ServerValidationStatus",
    "grich.core.util.NotificationUtils"
  ],

  controller: "demo-view-NotificationDemoViewController",

  i18n: {
    severityLabelText: "Severity level",
    infoLabelText: "Info",
    warningLabelText: "Warning",
    errorLabelText: "Error",

    serverExceptionNotificationTitleText: "Server Exception",
    serverExceptionNotificationShowText: "Show Server Exception Notification",

    simpleNotificationTitleText: "Simple Notification",
    simpleNotificationShowText: "Show Simple Notification",
    simpleNotificationWithCustomStyleShowText: "Show Simple Notification with Custom Style",
    simpleNotificationWithAuxiliaryNotificationShowText: "Show Simple Notification with Auxiliary Notification",

    simpleNotificationWithMessagesTitleText: "Simple Notification With Messages",
    simpleNotificationWithMessagesShowText: "Show Simple Notification With Messages",
    simpleNotificationWithMessagesAndPlainTemplate: "Show Simple Notification With Messages and Plain Template",

    advancedNotificationWithMessagesTitleText: "Advanced Notification With Messages",
    advancedNotificationWithMessagesShowText: "Show Advanced Notification With Messages",

    serverValidationFailureNotificationTitleText: "Server Validation Failure Notification",
    serverValidationFailureNotificationShowText: "Show Server Validation Failure Notification",

    serverSuccessNotificationTitleText: "Server Success Notification",
    serverSuccessNotificationShowText: "Show Server Success Notification",

    serverCascadingValidationSamplesTitleText: "Server Cascading Validation Samples",
    serverCascadingValidationFaceSampleButtonText: "Validate Face",
    serverCascadingValidationAuthorSampleButtonText: "Validate Author"
  },

  autoScroll: true, bodyPadding: 10,

  initComponent: function() {
    var me = this;

    Ext.applyIf(me, {
      items: [
        {
          xtype: "fieldset", title: me.i18n.serverExceptionNotificationTitleText || "Server Exception", collapsible: false, scrollable: "horizontal",
          margin: "0 0 5px 0", cls: "notification-demo-view-fieldset",
          items: [
            { xtype: "button", text: me.i18n.serverExceptionNotificationShowText || "Show Server Exception Notification", handler: "onShowServerExceptionNotification" }
          ]
        },
        {
          xtype: "fieldset", title: me.i18n.simpleNotificationTitleText || "Simple Notification", collapsible: false,
          margin: "0 0 5px 0", cls: "notification-demo-view-fieldset",
          items: [
            {
              reference: "simpleNotificationFormPanel", xtype: "form", buttonAlign: "left", border: false, cls: "notification-demo-view-form",
              items: [
                {
                  xtype: "radiogroup", fieldLabel: me.i18n.severityLabelText || "Severity", layout: "hbox", scrollable: true,
                  defaults: { margin: "0 0 0 10" },
                  items: [
                    { boxLabel: me.i18n.infoLabelText || "Info", name: "severity", inputValue: grich.core.util.NotificationUtils.NOTIFICATION_SEVERITY_INFO, checked: true },
                    { boxLabel: me.i18n.warningLabelText || "Warning", name: "severity", inputValue: grich.core.util.NotificationUtils.NOTIFICATION_SEVERITY_WARNING },
                    { boxLabel: me.i18n.errorLabelText || "Error", name: "severity", inputValue: grich.core.util.NotificationUtils.NOTIFICATION_SEVERITY_ERROR }
                  ]
                }
              ],
              dockedItems: [
                {
                  xtype: "toolbar", dock: "bottom", ui: "footer", padding: 0, scrollable: true,
                  items: [
                    { xtype: "button", text: me.i18n.simpleNotificationShowText || "Show Simple Notification", handler: "onShowSimpleNotification" },
                    { xtype: "button", text: me.i18n.simpleNotificationWithCustomStyleShowText || "Show Simple Notification with Custom Style", handler: "onShowSimpleNotificationWithCustomStyle" },
                    {
                      xtype: "button", text: me.i18n.simpleNotificationWithAuxiliaryNotificationShowText || "Show Simple Notification with Auxiliary Notification",
                      handler: "onShowSimpleNotificationWithAuxiliaryNotification"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          xtype: "fieldset", title: me.i18n.simpleNotificationWithMessagesTitleText || "Simple Notification With Messages", collapsible: false,
          margin: "0 0 5px 0", cls: "notification-demo-view-fieldset",
          items: [
            {
              reference: "simpleNotificationWithMessagesFormPanel", xtype: "form", buttonAlign: "left", border: false, cls: "notification-demo-view-form",
              items: [
                {
                  xtype: "radiogroup", fieldLabel: me.i18n.severityLabelText || "Severity", layout: "hbox", scrollable: true,
                  defaults: { margin: "0 0 0 10" },
                  items: [
                    { boxLabel: me.i18n.infoLabelText || "Info", name: "severity", inputValue: grich.core.util.NotificationUtils.NOTIFICATION_SEVERITY_INFO, checked: true },
                    { boxLabel: me.i18n.warningLabelText || "Warning", name: "severity", inputValue: grich.core.util.NotificationUtils.NOTIFICATION_SEVERITY_WARNING },
                    { boxLabel: me.i18n.errorLabelText || "Error", name: "severity", inputValue: grich.core.util.NotificationUtils.NOTIFICATION_SEVERITY_ERROR }
                  ]
                }
              ],
              dockedItems: [
                {
                  xtype: "toolbar", dock: "bottom", ui: "footer", padding: 0, scrollable: true,
                  items: [
                    { xtype: "button", text: me.i18n.simpleNotificationWithMessagesShowText || "Show Simple Notification With Messages", handler: "onShowSimpleNotificationWithMessages" },
                    {
                      xtype: "button", text: me.i18n.simpleNotificationWithMessagesAndPlainTemplate || "Show Simple Notification With Messages and Plain Template",
                      handler: "onShowSimpleNotificationWithMessagesAndPlainTemplate"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          xtype: "fieldset", title: me.i18n.advancedNotificationWithMessagesTitleText || "Advanced Notification With Messages", collapsible: false,
          margin: "0 0 5px 0", cls: "notification-demo-view-fieldset",
          items: [
            {
              reference: "advancedNotificationWithMessagesFormPanel", xtype: "form", buttonAlign: "left", border: false, cls: "notification-demo-view-form",
              items: [
                {
                  xtype: "radiogroup", fieldLabel: me.i18n.severityLabelText || "Severity", layout: "hbox", scrollable: true,
                  defaults: { margin: "0 0 0 10" },
                  items: [
                    { boxLabel: me.i18n.infoLabelText || "Info", name: "severity", inputValue: grich.core.util.NotificationUtils.NOTIFICATION_SEVERITY_INFO, checked: true },
                    { boxLabel: me.i18n.warningLabelText || "Warning", name: "severity", inputValue: grich.core.util.NotificationUtils.NOTIFICATION_SEVERITY_WARNING },
                    { boxLabel: me.i18n.errorLabelText || "Error", name: "severity", inputValue: grich.core.util.NotificationUtils.NOTIFICATION_SEVERITY_ERROR }
                  ]
                }
              ],
              dockedItems: [
                {
                  xtype: "toolbar", dock: "bottom", ui: "footer", padding: 0, scrollable: true,
                  items: [
                    { xtype: "button", text: me.i18n.advancedNotificationWithMessagesShowText || "Show Advanced Notification With Messages", handler: "onShowAdvancedNotificationWithMessages" }
                  ]
                }
              ]
            }
          ]
        },
        {
          xtype: "fieldset", title: me.i18n.serverValidationFailureNotificationTitleText || "Server Validation Failure Notification", collapsible: false,
          margin: "0 0 5px 0", cls: "notification-demo-view-fieldset",
          items: [
            {
              reference: "serverValidationFailureNotificationFormPanel", xtype: "form", buttonAlign: "left", border: false, cls: "notification-demo-view-form",
              items: [
                {
                  xtype: "radiogroup", fieldLabel: me.i18n.severityLabelText || "Severity", layout: "hbox", scrollable: true,
                  defaults: { margin: "0 0 0 10" },
                  items: [
                    { boxLabel: me.i18n.infoLabelText || "Info", name: "severity", inputValue: "Some unexpected invalid value", checked: true },
                    { boxLabel: me.i18n.warningLabelText || "Warning", name: "severity", inputValue: "Some unexpected invalid value" },
                    { boxLabel: me.i18n.errorLabelText || "Error", name: "severity", inputValue: "Some unexpected invalid value" }
                  ]
                }
              ],
              dockedItems: [
                {
                  xtype: "toolbar", dock: "bottom", ui: "footer", padding: 0, scrollable: true,
                  items: [
                    {
                      xtype: "button", text: me.i18n.serverValidationFailureNotificationShowText || "Show Server Validation Failure Notification",
                      handler: "onShowServerValidationFailureNotification"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          xtype: "fieldset", title: me.i18n.serverSuccessNotificationTitleText || "Server Success Notification", collapsible: false,
          margin: "0 0 5px 0", cls: "notification-demo-view-fieldset",
          items: [
            {
              reference: "serverSuccessNotificationFormPanel", xtype: "form", buttonAlign: "left", border: false, cls: "notification-demo-view-form",
              items: [
                {
                  xtype: "radiogroup", fieldLabel: me.i18n.severityLabelText || "Severity", layout: "hbox", scrollable: true,
                  defaults: { margin: "0 0 0 10" },
                  items: [
                    { boxLabel: me.i18n.infoLabelText || "Info", name: "severity", inputValue: grich.core.util.NotificationUtils.NOTIFICATION_SEVERITY_INFO, checked: true },
                    { boxLabel: me.i18n.warningLabelText || "Warning", name: "severity", inputValue: grich.core.util.NotificationUtils.NOTIFICATION_SEVERITY_WARNING },
                    { boxLabel: me.i18n.errorLabelText || "Error", name: "severity", inputValue: grich.core.util.NotificationUtils.NOTIFICATION_SEVERITY_ERROR }
                  ]
                }
              ],
              dockedItems: [
                {
                  xtype: "toolbar", dock: "bottom", ui: "footer", padding: 0, scrollable: true,
                  items: [
                    { xtype: "button", text: me.i18n.serverSuccessNotificationShowText || "Show Server Success Notification", handler: "onShowServerSuccessNotification" }
                  ]
                }
              ]
            }
          ]
        },
        {
          xtype: "fieldset", title: me.i18n.serverCascadingValidationSamplesTitleText || "Server Cascading Validation Samples", collapsible: false,
          margin: "0 0 5px 0", cls: "notification-demo-view-fieldset",
          items: [
            { xtype: "button", text: me.i18n.serverCascadingValidationFaceSampleButtonText || "Validate Face", handler: "onValidateFace", margin: "0 7px 0 0" },
            { xtype: "button", text: me.i18n.serverCascadingValidationAuthorSampleButtonText || "Validate Author", handler: "onValidateAuthor",  margin: "0 3px 0 0" },
            { reference: "cascadingValidationServerStatus", xtype: "grich-core-component-form-ServerValidationStatus" }
          ]
        }
      ]
    });

    me.callParent();
  }
});
