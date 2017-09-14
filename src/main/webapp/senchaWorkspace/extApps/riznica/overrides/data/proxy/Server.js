Ext.define('Ext.overrides.data.proxy.Server', {
  override: 'Ext.data.proxy.Server',

  encodeSorters: function(sorters, preventArray) {
    var out = [],
        length = sorters.length,
        i;

    for (i = 0; i < length; i++) {
      out[i] = sorters[i].serialize();
    }
    return preventArray ? out[0] : out;
  }
});
