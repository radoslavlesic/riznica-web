Ext.define("riznica.search.order.OrderSearchGridView", {
  extend: "Ext.grid.Panel",
  alias: "widget.order-OrderSearchGridView",

  requires: [
    "Ext.grid.column.Action",
    "Ext.grid.Panel",
    "Ext.toolbar.Paging"
  ],

  reference: "searchOrderResultsGrid",
  title: false,
  border: true,
  hidden: false,
  margin: 10,

  initComponent: function () {
    var me = this;
    Ext.apply(me, {
      columns: [
        { text: "Product ID", flex: 1.5, align: "center", dataIndex: "id" },
        { text: "Title", flex: 2, align: "center", dataIndex: "title" },
        { text: "Price", flex: 2, align: "center", dataIndex: "price" },
        { text: "Description", flex: 2, align: "center", dataIndex: "description"}

        // { text: "Profile status", flex: 1.5, align: "center", sortable: false,
        //   renderer: function (value, meta, record) {
        //     var status = record.data.active;
        //     var st = "";
        //     if (status) {
        //       st = "Active";
        //     } else {
        //       st = "Inactive";
        //     }
        //     return st;
        //   }
        // }
      ],
      bbar: {
        xtype: "pagingtoolbar",
        store: me.store,
        displayInfo: true
      }
    });
    me.callParent(arguments);
  }
});
