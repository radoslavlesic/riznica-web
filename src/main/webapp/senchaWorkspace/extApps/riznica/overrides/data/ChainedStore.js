// TODO there will be bugs here
Ext.define('Ext.overrides.data.ChainedStore', {
  override: 'Ext.data.ChainedStore',

  getProxy: function() {
    return this.getSource().getProxy();
  },

  loadPage: function(page, options) {
    return this.getSource().loadPage(page, options);
  },

  nextPage: function(options) {
    this.getSource().nextPage(options);
  },

  previousPage: function(options) {
    this.getSource().previousPage(options);
  },

  getSorters: function (autoCreate) {
    return this.getSource().getSorters(autoCreate);
  },

  sort: function(property, direction) {
    return this.getSource().sort(property, direction);
  }
});
