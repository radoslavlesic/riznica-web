Ext.define("riznica.demo.view.NestedFormDemoViewModel", {
  extend: "Ext.app.ViewModel",

  alias: "viewmodel.demo-view-NestedFormDemoViewModel",

  requires: [
    "Ext.data.proxy.Memory",
    "riznica.demo.model.FormDemoEmployeeModel"
  ],

  i18n: {
    titlesStore: {
      mrName: "Mr",
      mrsName: "Mrs",
      missName: "Miss"
    }
  },

  stores: {
    foundPhonesStore: {
      model: "riznica.demo.model.FormDemoEmployeeModel",
      proxy: {
        type: "memory"
      }
    },

    titlesStore: {
      fields: ["name", "value"]
    },

    nestedFormDemoEmailStore: {
      model: "riznica.demo.model.FormDemoEmployeeModel",
      proxy: {
        type: "memory"
      }
    }
  },

  constructor: function(config) {
    var me = this;

    me.config.stores.titlesStore.data = [
      { name: me.i18n.titlesStore.mrName || "Mr", value: "mr" },
      { name: me.i18n.titlesStore.mrsName || "Mrs", value: "mrs" },
      { name: me.i18n.titlesStore.missName || "Miss", value: "miss" }
    ];

    me.callParent([config]);
  }
});
