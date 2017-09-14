Ext.define('riznica.core.view.NotFound404View', {
  extend: 'Ext.window.Window',
  xtype: 'core-view-NotFound404View',

  requires: [
    'Ext.layout.container.Fit',
    'riznica.core.view.BlankView'
  ],

  i18n: {
    title: 'Screen Not Found',
    topText: '404',
    descriptionTemplate: '<div>Requested screen can not be found.</div><div>Try going back to the <a href=\'#{homeScreenHash}\'>home screen</a>.</div>'
  },

  title: undefined,

  config: {
    homeScreenHash: 'home',
    topText: undefined,
    descriptionHtml: undefined,
    descriptionTemplate: undefined
  },

  autoShow: true, closable: false, titleAlign: 'center', modal: true, maximized: true, resizable: false,
  layout: 'fit',

  constructor: function(config) {
    var me = this;
    Ext.applyIf(config, me.i18n);
    me.callParent([config]);
  },

  initComponent: function() {
    var me = this;
    var descriptionHtml = me.descriptionHtml;
    var template;

    if (!descriptionHtml) {
      template = new Ext.Template(me.descriptionTemplate);
      descriptionHtml = template.applyTemplate({ homeScreenHash: me.homeScreenHash });
    }

    Ext.applyIf(me, {
      items: [
        { xtype: 'core-view-BlankView', headlineText: me.topText, paragraphText: descriptionHtml, logoFontAwesomeCls: 'fa-exclamation-triangle' }
      ]
    });

    me.callParent();
  }
});
