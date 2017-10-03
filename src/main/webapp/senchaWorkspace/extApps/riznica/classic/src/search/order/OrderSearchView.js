Ext.define("riznica.search.order.OrderSearchView",{
  extend: "riznica.core.view.search.AbstractSearchView",
  alias: "widget.order-OrderSearchView",

  requires: [
    "riznica.core.view.search.AbstractSearchView",
    "Ext.container.Container",
    "Ext.grid.Panel"
  ],

  autoScroll: true,
  fieldsetTitle: 'Search orders',

  initComponent: function() {
    var me = this;

  }
});