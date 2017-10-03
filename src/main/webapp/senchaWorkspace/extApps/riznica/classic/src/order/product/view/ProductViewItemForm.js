Ext.define('riznica.order.product.view.ProductViewItemForm', {
  extend: 'Ext.window.Window',
  alias: 'widget.ProductViewItemForm',
  itemId: 'ProductViewItemForm',
  requires: [
    "Ext.form.FieldSet",
    "Ext.form.field.Date",
    "Ext.form.field.Text",
    "riznica.order.product.view.ProductViewItemFormModel",
    "riznica.order.stores.DocumentStore",
    "riznica.util.ProductUtil"
  ],
  modal: true,
  margin: 5,
  layout: {
    type: 'vbox',
    pack: 'start', align: 'stretch'
  },
  controller: 'ProductViewController',
  viewModel:{
    type:'ProductViewItemFormModel'
  },
  config:{
    myStore: Ext.create('riznica.order.stores.DocumentStore')
  },
  // width: 450,
  // height: 450,
  // padding: 5,
  initComponent: function() {

    var me = this;

    Ext.apply(me,{
      items: [
        {xtype: 'form',defaultType: 'textfield', itemId: 'productItemForm',
          items:[
            {name: 'id', fieldLabel: 'ID', itemId: 'productId', margin: 5 ,readOnly: true, bind:{ value: "{product.id}"}},
            {name: 'title', fieldLabel: 'Title', itemId: 'productTitle', margin: 5,bind:{ value: "{product.title}"}},
            {xtype: 'textarea',name: 'description', fieldLabel: 'Description', itemId: 'productDescription', margin: 5,
              bind:{ value: "{product.description}"}
            },
            {name: 'price', fieldLabel:'Price', itemId: 'productPrice', margin: 5, bind:{ value: "{product.price}"}},
            {xtype: 'filefield',name: 'photo',margin: 5,fieldLabel: 'Photo',//labelWidth: 100,
              msgTarget: 'side',allowBlank: false,anchor: '100%',buttonText: 'Select Photo...',
              buttonOnly: true,
              listeners: {
                change: function() {
                  // var title = this.up('form').down('#productTitle').getValue();
                  // var title = this.up().up().getStore();
                  // var path = this.getValue();
                  // var name = this.getValue().replace(/^.*[\\\/]/, '');
                  var file = this.getEl().down('input[type=file]').dom.files[0];

                  var fileReader = new FileReader();
                  fileReader.addEventListener("load",function() {

                    // var record = Ext.create("riznica.order.document.model.DocumentModel",
                    //   {image: fileReader.result});
                    console.log(fileReader.result);

                    riznica.util.ProductUtil.image = fileReader.result;
                  }, false);

                  if(file != null){
                    fileReader.readAsDataURL(file);
                  }
                },
                afterrender: function(cmp) {
                  cmp.fileInputEl.set({
                    accept: 'image/*,application/pdf'
                  });
                }
              }
            }
          ]
        }
      ]
    });

    me.callParent(arguments);
  },
  buttons: [{
    text: 'Save',iconCls: 'x-fa fa-floppy-o',
    listeners: {
      click: function(thisEl) {
        Ext.ComponentQuery.query('#ProductViewItemForm')[0].getController().saveProduct(thisEl);
      }
    }
  }, {
    text: 'Cancel',iconCls: 'x-fa fa-ban',
    handler: function(btn) {
      btn.up('window').close();
    }
  }]
});