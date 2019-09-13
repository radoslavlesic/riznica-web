Ext.define('riznica.order.stores.OrderCategoryStore', {
  extend: "Ext.data.Store",
  alias: "store.OrderCategoryStore",
  model: 'riznica.order.category.model.OrderCategoryModel',
  storeId: 'OrderCategoryStore',
  fields: ["id", "name"],
  autoLoad: true,
  autoSync: true,
  // remoteFilter: false,
  proxy: {
    type: "ajax",
    api: {
      read: riznica.configuration.contextPath + "/api/orderCategory/list",
      write: riznica.configuration.contextPath + "/api/orderCategory/create"
    },
    reader: {
      type: "json",
      rootProperty: "data",
      totalProperty: "total"
    },

    writer: {
      type: 'json',
      writeAllFields: false,
      rootProperty: 'data'
    },
    actionMethods: { create: "POST", read: "POST", update: "POST", destroy: "POST" },
    paramsAsJson: true,
    simpleSortMode: true,
    sortParam: "sortBy",
    directionParam: "sortDirection"
  }
});