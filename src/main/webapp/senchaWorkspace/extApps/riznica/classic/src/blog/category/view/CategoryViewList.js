Ext.define("riznica.blog.category.view.CategoryViewList", {
  extend: "Ext.grid.Panel",
  itemId: "gridCategory",
  xtype: "blog-category-view-CategoryViewList",

  requires: [
    "riznica.blog.store.CategoryStore",
    "riznica.blog.category.view.CategoryViewForm",
    "riznica.blog.category.controller.CategoryViewController"
  ],
  controller: "CategoryViewController",
  title: "Category registry",
  frame: true,
  store: {type: "blog-store-CategoryStore"},
  tools: [
    {
      type: 'plus',text: 'Add',tooltip: 'Add new category',
      listeners: {
        click: function() {
          Ext.ComponentQuery.query('#gridCategory')[0].getController().addNewCategory();
        }
      }
    }
  ],
  columns: [
    { text: "Name", dataIndex: "name", flex: 1 }
  ],
  listeners: {
    select: function(grid, record) {
      Ext.ComponentQuery.query('#gridCategory')[0].getController().onCategorySelect(grid, record);
    },
    itemcontextmenu: function(tree, record, item, index, e, eOpts) {
      Ext.ComponentQuery.query('#gridCategory')[0].getController().onRightClick(tree, record, item, index, e, eOpts);
    }
  }
});
