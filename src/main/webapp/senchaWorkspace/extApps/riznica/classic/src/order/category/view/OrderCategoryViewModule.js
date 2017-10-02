Ext.define("riznica.order.category.view.OrderCategoryViewModule",{
  extend: 'Ext.panel.Panel',
  alias: 'widget.OrderCategoryViewModule',
  margin: '5 0 5 0', width: 180,

  items:[
    {xtype: 'OrderCategoryViewGrid'}
  ]
});