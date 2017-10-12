Ext.define('riznica.order.product.view.ProductViewItem', {
  extend: "grich.core.component.form.AdvancedFormPanel",
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
        { xtype: 'panel', itemId: 'productImage', margin: 5, width: 235, height: 150,  frame: true},
        {
          xtype: 'numberfield', fieldLabel: 'Price', labelStyle: 'width:40px', readOnly: true,
          text: 'Price:', itemId: 'productPrice', hideTrigger: true, keyNavEnabled: false, mouseWheelEnabled: false,
          bind: { value: "{product.price}" },
          margin: '5 5 0 5'
        },
        {
          xtype: 'panel', itemId:'itemBtnPanel', layout: { type: 'hbox', pack: 'end', align: 'stretch' },
          items: [
            {xtype: 'numberfield', itemId: 'qty', width: 145,fieldLabel: 'Qty', labelStyle: 'width: 25px',
              margin: '5 5 5 0',hideTrigger: true,keyNavEnabled: false,mouseWheelEnabled: false
            },
            // {xtype: 'button', itemId: 'detailsBtn', title: 'Details', text: "Details", margin: 5 },
            {xtype: 'button', itemId: 'addToCart', title: 'Add to cart', text: 'Add to cart', margin: '5 5 5 0'}
          ]
        }
       ]
    });
    me.callParent(arguments);

  }

  // padding: 5,

});