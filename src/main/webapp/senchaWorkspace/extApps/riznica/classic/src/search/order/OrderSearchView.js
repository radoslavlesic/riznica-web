Ext.define("riznica.search.order.OrderSearchView",{
  extend: "riznica.core.view.search.AbstractSearchView",
  alias: "widget.order-OrderSearchView",

  requires: [
    "riznica.search.order.OrderSearchGridView",
    "riznica.search.order.OrderSearchFormView",
    "riznica.core.infrastructure.RiznicaSubmitHelperUtils",
    "riznica.search.order.store.OrderSearchStore",
    "riznica.core.view.search.AbstractSearchView",
    "Ext.container.Container",
    "Ext.grid.Panel"
  ],

  autoScroll: true,
  fieldsetTitle: 'Search orders',

  initComponent: function() {
    var me = this;
    var store = Ext.craete("riznica.search.order.store.OrderSearchStore");

    Ext.apply(me.config,{
      formXtype: "order-OrderSearchFormView",
      formId: "order.OrderSearchFormView",
      gridXtype: "order-OrderSearchGridView",
      store: store,
      printable: false,
      reset: true
    });

    me.callParent(arguments);
  },
  fetchEntityData: function(entityId) {
    var me = this;
    var submitUtils = riznica.core.infrastructure.RiznicaSubmitHelperUtils;
    var detailsUrl = "/api/order/orderViewConfiguration/fetchDetails?X-CSRF-Token=" + grich.core.security.CsrfAjaxManager.token;

    submitUtils.invokeRequest(detailsUrl, { entityId: entityId }, me, {
      tabTitle: "Order profile",
      wrapTo: "order",
      leaveTabOpen: true,

      findTab: function(tabPanel) {
        var id = entityId;
        var i, arrayLength;

        var orderViewFoundList = tabPanel.query('[xtype="myprofile-view-MyProfileView"]');
        var orderView, orderViewViewFound;
        arrayLength = orderViewFoundList.length;
        for (i = 0; i < arrayLength; i++) {
          orderView = orderViewFoundList[i];
          if (orderView.getViewModel().get('id') === entityId) {
            orderViewViewFound = orderView;
            break;
          }
        }
        return orderViewViewFound;
      }
    });
  }
});