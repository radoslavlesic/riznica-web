Ext.define("riznica.search.order.model.OrderSearchModel", {
  extend: "Ext.data.Model",

  fields: [
    { name: "id", type: "string", defaultValue: null, useNull: true },
    { name: "title", type: "string", defaultValue: null, useNull: true },
    { name: "price", type: "auto", defaultValue: null, useNull: true },
    { name: "description", type: "string" }
  ]
});