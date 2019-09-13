Ext.define('riznica.order.category.view.OrderCategoryViewForm', {
  extend: 'Ext.window.Window',
  alias: 'widget.OrderCategoryViewForm',
  itemId: 'OrderCategoryViewForm',
  modal: true,
  controller: 'OrderCategoryController',
  viewModel:{
    type:'OrderCategoryViewFormModel'
  },
  items: [
    {
      xtype: 'form',itemId: "orderCategoryForm",bodyPadding: 5,flex: 1,defaultType: 'textfield',
      items: [
      {name: 'id',itemId: 'orderCatId',fieldLabel: 'ID',readOnly: true, bind:{ value: "{orderCategory.id}"}},
      {name: 'name',itemId: 'orderCatName',fieldLabel: 'Name', bind:{ value: "{orderCategory.name}"}}
      ]
    }
  ],
  buttons: [{
    text: 'Save',iconCls: 'x-fa fa-floppy-o',
    listeners: {
      click: function(thisEl) {
        var orderCatStore = Ext.ComponentQuery.query('#OrderCategoryViewGrid')[0];
        var data = thisEl.up("OrderCategoryViewForm").down("#orderCategoryForm").getForm().getNestedValues();

        var catId = thisEl.up("OrderCategoryViewForm").down("#orderCategoryForm").down("#orderCatId").getValue();
        var url = "";

        if (catId == -1) {
          url = riznica.configuration.contextPath + "/api/orderCategory/create";
        } else {
          url = riznica.configuration.contextPath + "/api/orderCategory/update"
        }

        var cmp = thisEl.up('#OrderCategoryViewForm');

        thisEl.up("OrderCategoryViewForm").getController().ajaxHelper(url, data, orderCatStore, cmp, null, '')
      }
    }
  }, {
    text: 'Cancel',iconCls: 'x-fa fa-ban',
    handler: function(btn) {
      btn.up('window').close();
    }
  }]
});