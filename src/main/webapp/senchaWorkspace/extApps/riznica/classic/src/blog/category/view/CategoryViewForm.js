Ext.define("riznica.blog.category.view.CategoryViewForm", {
  extend: 'Ext.window.Window',
  requires: "riznica.blog.category.model.CategoryViewModel",
  alias: 'widget.CategoryViewForm',
  itemId: 'catWindowId',
  title: 'Add new record',
  modal: true,
  viewModel: {
    type: "CategoryViewFormModel"
  },
  items: [{
    xtype: 'form',itemId: "catFormId",bodyPadding: 5,flex: 1,defaultType: 'textfield',
    items: [
      {name: 'id',itemId: 'catId',fieldLabel: 'ID',readOnly: true, bind:{ value: "{category.id}"}},
      {name: 'name',itemId: 'catName',fieldLabel: 'Name', bind:{ value: "{category.name}"}}
    ]
  }],
  buttons: [{
    text: 'Save',iconCls: 'x-fa fa-floppy-o',
    listeners: {
      click: function(thisEl) {

        var me = thisEl.up('#catWindowId');
        var data = me.down("#catFormId").getForm().getNestedValues();

        var catId = Ext.ComponentQuery.query('#catId')[0].getValue();
        var url = "";

        if (catId == -1) {
          url = riznica.configuration.contextPath + "/api/category/create";
        } else {
          url = riznica.configuration.contextPath + "/api/category/update"
        }

        grich.core.util.AjaxSubmitHelper.invokeRequest({
          url: url,
          method: "POST",
          jsonData: data,
          scope: me,
          async: false,
          success: function(response, options, responseTextDecoded) {
            if (responseTextDecoded.success === true) {
              var notificationDescriptor = {
                notification: {
                  severity: grich.core.util.NotificationUtils.NOTIFICATION_SEVERITY_INFO,
                  titleText: "Category saved!",
                  contentText: "Success"
                }
              };
              grich.core.util.NotificationUtils.showSuccessNotification(notificationDescriptor);

              thisEl.up('#catWindowId').close();
              Ext.ComponentQuery.query('#gridCategory')[0].getStore().load();
            }
          }
        });
      }
    }
  }, {
    text: 'Cancel',iconCls: 'x-fa fa-ban',
    handler: function(btn) {
      btn.up('window').close();
    }
  }]
});