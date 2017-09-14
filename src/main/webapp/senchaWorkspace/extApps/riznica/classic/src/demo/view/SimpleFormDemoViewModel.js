Ext.define("riznica.demo.view.SimpleFormDemoViewModel", {
  extend: "Ext.app.ViewModel",

  alias: "viewmodel.demo-view-SimpleFormDemoViewModel",

  requires: [
    "Ext.data.proxy.Memory",
    "riznica.demo.model.FormDemoEmployeeModel"
  ],

  stores: {
    simpleFormDemoEmailStore: {
      model: "riznica.demo.model.FormDemoEmployeeModel",
      proxy: {
        type: "memory"
      }
    },

    simpleFormDemoPhoneStore: {
      model: "riznica.demo.model.FormDemoEmployeeModel",
      proxy: {
        type: "memory"
      }
    }
  }
});
