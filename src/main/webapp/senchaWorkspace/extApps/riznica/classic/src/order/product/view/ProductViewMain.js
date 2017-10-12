Ext.define("riznica.order.product.view.ProductViewMain", {
  extend: 'Ext.panel.Panel',
  alias: 'widget.ProductViewMain',
  itemId: 'productViewMain',
  requires: [
    "riznica.order.product.view.ProductViewItem",
    "Ext.layout.container.Table",
    "riznica.order.product.controller.ProductViewController",
    "Ext.Img"
  ],
  controller: 'ProductViewController',
  layout: {
   type: 'table',
   columns: 3
  },
  listeners: {
    resize: function() {
      var me = Ext.ComponentQuery.query('#productViewMain')[0];
      // console.log("width: "+me.getWidth()+" height: "+me.getHeight());
      if(me.getWidth()<=500){
        me.getLayout().columns = 1;
      }else if(me.getWidth()>500 && me.getWidth()<700){
        me.getLayout().columns = 2;
      }else if(me.getWidth()>700){
        me.getLayout().columns = 3;
      }
    }
  },
  title: 'Products',
  tools: [
    {xtype: 'button', text: 'Add', iconCls: 'x-fa fa-plus', border: false,
      listeners:{
        click: function() {
          var item = Ext.create('riznica.order.product.view.ProductViewItemForm');
          item.title = "Add new product";
          item.show();

        }
      }
    },{
      xtype: 'button', text: 'refresh', iconCls: 'x-fa fa-refresh',
      listeners:{
        click: function() {
          Ext.ComponentQuery.query('#productViewMain')[0].removeAll(true);
          Ext.ComponentQuery.query('#productViewMain')[0].getController().reloadData();
        }
      }
    }
  ],
  // padding: 5,
  // width: 600,
  // height: 600,
  scrollable: true,

  items:[

  ]
});