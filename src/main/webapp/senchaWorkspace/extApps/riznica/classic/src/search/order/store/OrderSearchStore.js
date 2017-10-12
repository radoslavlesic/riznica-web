Ext.define("riznica.search.order.store.OrderSearchStore",{
  extend: "Ext.data.Store",
  alias: "store.order-OrderSearchStore",

  requires:[
    "riznica.search.order.model.OrderSearchModel"
  ],
  model: "riznica.search.order.model.OrderSearchModel",
  pageSize: 10,

  proxy: {
    type: "ajax",
    api: {
      read: riznica.configuration.contextPath + "/api/product/searchAllProducts"
    },
    extraParams: {},
    reader: {
      type: "json",
      rootProperty: "data",
      totalProperty: "total"
    },
    actionMethods: { create: "POST", read: "GET", update: "POST", destroy: "POST" },
    paramsAsJson: true,
    simpleSortMode: true,
    sortParam: "sortBy",
    directionParam: "sortDirection"
  }
});