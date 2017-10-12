Ext.define("riznica.search.order.OrderSearchFormViewModel", {
  extend: "Ext.app.ViewModel",

  alias: "viewmodel.order-search-OrderSearchFormViewModel",

  requires: [
    "riznica.order.stores.ProductStore"
  ],

  stores: {
    productStore: {
      type: "product-ProductStore"
    }
  }
});

