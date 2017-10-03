Ext.define('riznica.order.product.view.ProductViewItem', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.ProductViewItem',
  require: [
    "riznica.order.product."
  ],
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
  // padding: 5,
  items:[
    {xtype: 'textfield',fieldLabel: 'Title', labelStyle: 'width:30px',
      title: 'Title', itemId: 'productTitle', text:"Title", margin: 5,
      bind:{ value: "{product.title}"}},
    {xtype: 'textfield', fieldLabel: 'Description', labelStyle: 'width:75px',
      itemId: 'productDescription',text:"Short desc",
      margin: '0 5 0 5',
      bind:{ value: "{product.description}"}},
    {xtype: 'panel', margin: 5,width: 235,height: 150,itemId: 'productImage', frame: true},
    {xtype: 'textfield', fieldLabel: 'Price', labelStyle: 'width:40px',
      text: 'Price:',itemId: 'productPrice',
      bind:{ value: "{product.price}"},
      // style: 'display:inline-block;text-align:right',
      margin: '5 5 0 5'},
    {xtype: 'panel', layout: {type: 'hbox', pack: 'end', align: 'stretch'},
      items: [
        {xtype: 'button', title: 'Details', text: "Details", margin: 5},
        {xtype: 'button', title: 'Add to cart', text: 'Add to cart', margin: '5 5 5 0'}

      ]
    }
  ]
});