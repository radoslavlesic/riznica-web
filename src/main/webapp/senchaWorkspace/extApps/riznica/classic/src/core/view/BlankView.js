Ext.define('riznica.core.view.BlankView', {
  extend: 'Ext.container.Container',
  xtype: 'core-view-BlankView',

  requires: [
    'Ext.layout.container.VBox'
  ],

  layout: {
    type: 'vbox', pack: 'center', align: 'middle'
  },

  i18n: {
    headlineText: 'Coming Soon!',
    paragraphText: 'Stay tuned for updates'
  },

  config: {
    headlineText: undefined,
    paragraphText: undefined,
    logoFontAwesomeCls: 'fa-clock-o'
  },

  initConfig: function(config) {
    var me = this;
    Ext.applyIf(config, me.i18n);
    me.callParent([config]);
  },

  initComponent: function() {
    var me = this;

    Ext.applyIf(me, {
      items: [
        {
          xtype: 'component',
          cls: 'core-view-blank-component',
          html: '<div class=\'fa-outer-class\'>' +
                  '<span class=\'x-fa ' + me.logoFontAwesomeCls + '\'></span>' +
                '</div>' +
                '<h1>'  + me.headlineText + '</h1>' +
                '<span class=\'core-view-blank-component-text\'>' + me.paragraphText + '</span>'
        }
      ]
    });

    me.callParent();
  }
});
