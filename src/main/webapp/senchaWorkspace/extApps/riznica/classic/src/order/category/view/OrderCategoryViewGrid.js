Ext.define('riznica.order.view.OrderCategoryViewGrid', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.OrderCategoryViewGrid',
  itemId: "OrderCategoryViewGrid",
  xtype: "OrderCategoryViewGrid",
  collapsible: true,

  requires: [
    "riznica.order.stores.OrderCategoryStore",
    "riznica.order.category.controller.OrderCategoryController",
    "riznica.order.category.view.OrderCategoryViewFormModel"
  ],
  controller: "OrderCategoryController",
  title: "Category",
  // frame: true,
  store: {type: "OrderCategoryStore"},
  hideHeaders: true,
  tools: [
    {
      type: 'plus',text: 'Add',tooltip: 'Add new category',
      listeners: {
        click: function() {
          this.up("OrderCategoryViewGrid").getController().addNewOrderCategory()
        }
      }
    }
  ],
  columns: [
    { text: "Name", dataIndex: "name", flex: 1 }
  ],
  listeners: {
    cellclick: function(view, cellEl, colIdx, record, rowEl, rowIdx, event) {

      // this.up("OrderCategoryViewGrid").getController());
    },
    itemcontextmenu: function(tree, record, item, index, e, eOpts) {
      Ext.ComponentQuery.query("#OrderCategoryViewGrid")[0].getController().onRightClickOrderCategory(tree, record, item, index, e, eOpts);
    }
  }
});