Ext.define("riznica.misc.store.AboutStore", {
  extend: "Ext.data.Store",

  requires: [
    "riznica.misc.model.AboutModel"
  ],

  alias: "store.misc-store-AboutStore",

  autoLoad: true,
  model: "riznica.misc.model.AboutModel",

  proxy: {
    type: "ajax",
    api: {
      read: riznica.configuration.contextPath + "/api/misc/about"
    },
    actionMethods: { create: "POST", read: "POST", update: "POST", destroy: "POST" },
    startParam: undefined,
    pageParam: undefined,
    limitParam: undefined,
    paramsAsJson: true
  }
});
