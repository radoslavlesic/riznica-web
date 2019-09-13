Ext.define('riznica.order.product.controller.ProductViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.ProductViewController',


  saveProduct: function(thisEl) {
    var item = Ext.create('riznica.order.product.view.ProductViewItem');
    var data = thisEl.up('ProductViewItemForm').down('form').getForm().getNestedValues();

    item.getViewModel().data.product = data;
    item.getViewModel().data.product.image = riznica.util.ProductUtil.image;
    item.down('#productImage').setHtml("<img style='max-height:100%; max-width:100%;' src='" + item.getViewModel().data.product.image + "'");

    item.down('#addToCart').setListeners({
      click: function() {
        var pro = Ext.create('riznica.order.product.model.ProductViewModel');
        pro.id = data.id;
        pro.title = data.title;
        pro.price = data.price;
        riznica.util.ProductUtil.items.push(pro);
      }
    });

    var url = "/product/create";
    var window = thisEl.up('ProductViewItemForm');

    this.ajaxHelper(url, data, null, window, false, "Product created!");

    var me = Ext.ComponentQuery.query('#productViewMain')[0];
    me.add(item);

    if (me.getWidth() <= 500) {
      me.getLayout().columns = 1;
    } else if (me.getWidth() > 500 && me.getWidth() < 700) {
      me.getLayout().columns = 2;
    } else if (me.getWidth() > 700) {
      me.getLayout().columns = 3;
    }

    riznica.util.ProductUtil.image = null
  },

  reloadData: function() {
    grich.core.util.AjaxSubmitHelper.invokeRequest({
      url: riznica.configuration.contextPath + '/product/listAllProducts',
      method: "POST",
      async: false,
      maskComponents: Ext.ComponentQuery.query('#productViewMain')[0],
      success: function(response, options, responseTextDecoded) {
        if (responseTextDecoded.success === true) {

          Ext.each(responseTextDecoded.data || [], function(item) {

            var product = Ext.create('riznica.order.product.view.ProductViewItem');
            product.getViewModel().data.product = item;

            product.down('#productImage').setHtml("<img style='max-height:100%; max-width:100%;' src='" + item.thumbnail + "'/>");
            product.down('#productImage').setListeners({
              render: function(c) {
                c.body.on('click', function() {
                  var myForm = new Ext.form.Panel({
                    width: 800, height: 600, modal: true,
                    html: "<img style='max-height:100%; max-width:100%;' src='" + item.image + "'/>",
                    floating: true, closable: true
                  });
                  myForm.show();
                });
              }
            });

            product.down('#addToCart').setListeners({
              click: function(thisEl) {
                var pro = Ext.create('riznica.order.product.model.ProductViewModel');
                pro.id = item.id;
                pro.title = item.title;
                pro.price = item.price;
                pro.qty = product.down('#qty').value;

                riznica.util.ProductUtil.items.push(pro);
              }
            });

            Ext.ComponentQuery.query('#productViewMain')[0].add(product);

            // let pdfWindow = window.open("");
            // pdfWindow.document.write("<iframe width='100%' height='100%' src='" + responseTextDecoded.data.image + "'></iframe>")

          }, this);
        }
      }
    });
  },

  ajaxHelper: function(url, data, store, closeComponent, showNotification, message) {
    grich.core.util.AjaxSubmitHelper.invokeRequest({
      url: riznica.configuration.contextPath + url,
      method: "POST",
      jsonData: Ext.util.JSON.encode(data),
      async: false,
      success: function(response, options, responseTextDecoded) {
        if (responseTextDecoded.success === true) {
          if (showNotification) {
            var notificationDescriptor = {
              notification: {
                severity: grich.core.util.NotificationUtils.NOTIFICATION_SEVERITY_INFO,
                titleText: message,
                contentText: "Success"
              }
            };
            grich.core.util.NotificationUtils.showSuccessNotification(notificationDescriptor);
          }

          if (closeComponent != null) {
            closeComponent.close();
          }

          if (store != null) {
            store.getStore().load();
          }
        }
      }
    });
  }

});