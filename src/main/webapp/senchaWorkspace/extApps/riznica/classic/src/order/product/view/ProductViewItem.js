Ext.define('riznica.order.product.view.ProductViewItem', {
  extend: "Ext.panel.Panel",
  alias: 'widget.ProductViewItem',

  frame: true,
  modal: true,
  margin: 5,
  layout: {
    type: 'vbox',
    pack: 'start', align: 'stretch'
   },
  viewModel:{
    type: 'ProductViewItemFormModel'
  },
  width: 250,
  height: 320,
  initComponent:function(){

    var me = this;

    Ext.apply(this,{
      items:[
        {
          xtype: 'textfield', fieldLabel: 'Title', labelStyle: 'width:30px',
          title: 'Title', itemId: 'productTitle', text: "Title", margin: 5,readOnly: true,
          bind: { value: "{product.title}" }
        },
        {
          xtype: 'textfield', fieldLabel: 'Description', labelStyle: 'width:75px',readOnly: true,
          itemId: 'productDescription', text: "Short desc",
          margin: '0 5 0 5',
          bind: { value: "{product.description}" }
        },
        { xtype: 'panel', margin: 5, width: 235, height: 150, itemId: 'productImage', frame: true},
        {
          xtype: 'numberfield', fieldLabel: 'Price', labelStyle: 'width:40px', readOnly: true,
          text: 'Price:', itemId: 'productPrice', hideTrigger: true, keyNavEnabled: false, mouseWheelEnabled: false,
          bind: { value: "{product.price}" },
          // style: 'display:inline-block;text-align:right',
          margin: '5 5 0 5'
        },
        {
          xtype: 'panel', layout: { type: 'hbox', pack: 'end', align: 'stretch' },
          items: [
            { xtype: 'button', title: 'Details', text: "Details", margin: 5 },
            { xtype: 'button', title: 'Add to cart', text: 'Add to cart', margin: '5 5 5 0' }
          ]
        }
       ]
    });
    me.callParent(arguments);

  }

  // padding: 5,

});