Ext.define("riznica.samplemodule.view.CategoryFormView", {
    requires: "riznica.samplemodule.blog.model.Category",
    extend: 'Ext.window.Window',
    alias: 'widget.CategoryFormView',
    itemId: 'catWindowId',
    autoShow: true,//dont have to call .show()
    title: 'Add new record',
    items: [{
        xtype: 'form',
        itemId: "catFormId",
        bodyPadding: 5,//my "Default"
        flex: 1,//scale childs to fit parent
        defaultType: 'textfield',
        items: [{
            name: 'id',
            itemId: 'catId',
            fieldLabel: 'ID',
            readOnly: true
        }, {

            name: 'name',
            itemId: 'catName',
            fieldLabel: 'Name'
        }]
    }],
    buttons: [{
        text: 'Save',
        iconCls: 'x-fa fa-floppy-o',//declared CSS Background somewhere
        listeners: {
            click: function (thisEl) {

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
                    // maskComponents: {component: me},
                    jsonData: data,
                    scope: me,
                    async: false,
                    success: function (response, options, responseTextDecoded) {
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
        text: 'Cancel',
        iconCls: 'x-fa fa-ban',
        handler: function (btn) {
            btn.up('window').close();
        }
    }]
});