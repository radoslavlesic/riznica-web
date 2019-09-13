Ext.define('riznica.order.category.controller.OrderCategoryController',{
  extend: 'Ext.app.ViewController',
  alias: 'controller.OrderCategoryController',

  addNewOrderCategory: function() {
    var form = Ext.create('riznica.order.category.view.OrderCategoryViewForm');
    form.title = "Add new category";
    form.down('#orderCatId').hide(true)
    form.down('#orderCatId').setValue(-1);
    form.show();
  },

  onRightClickOrderCategory: function(tree, record, item, index, e, eOpts) {
    var menu_grid = new Ext.menu.Menu({
      items:
        [
          {
            text: 'Edit', iconCls: 'x-fa fa-floppy-o',
            handler: function() {

              var form = Ext.create('riznica.order.category.view.OrderCategoryViewForm');
              form.title = "Update category";
              // form.down('#orderCatId').hide(false);
              // form.down('#orderCatId').readOnly = true;
              // form.down('#orderCatName').focus = false;
              form.getViewModel().data.orderCategory = record.data;
              form.show();
            }
          }, {
          text: 'Delete',iconCls: 'x-fa fa-trash',
          handler: function() {
            Ext.Msg.confirm("Confirm", "Are you sure?", function(choice) {
              if (choice === "yes") {
                var data = record.data;
                delete data.class;

                var url = "/api/orderCategory/delete";
                var store = Ext.ComponentQuery.query("#OrderCategoryViewGrid")[0];
                store.getController().ajaxHelper(url, data, store, null, null, "dd");

              }
            });
          }
        }
        ]
    });
    // HERE IS THE MAIN CHANGE
    var position = [e.getX() - 10, e.getY() - 10];
    e.stopEvent();
    menu_grid.showAt(position);

  },

  ajaxHelper: function(url, data, store, closeComponent, showNotification, message) {
    grich.core.util.AjaxSubmitHelper.invokeRequest({
      url: riznica.configuration.contextPath + url,
      method: "POST",
      jsonData: Ext.util.JSON.encode(data),
      async: false,
      success: function(response, options, responseTextDecoded) {
        if (responseTextDecoded.success === true) {
          if(showNotification) {
            var notificationDescriptor = {
              notification: {
                severity: grich.core.util.NotificationUtils.NOTIFICATION_SEVERITY_INFO,
                titleText: message,
                contentText: "Success"
              }
            };
            grich.core.util.NotificationUtils.showSuccessNotification(notificationDescriptor);
          }

          if(closeComponent!=null){
            closeComponent.close();
          }

          store.getStore().load();
        }
      }
    });

  }

});