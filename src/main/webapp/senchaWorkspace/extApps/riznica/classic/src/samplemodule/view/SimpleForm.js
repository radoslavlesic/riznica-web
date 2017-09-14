Ext.define("riznica.samplemodule.view.SimpleForm", {
    requires: "riznica.samplemodule.personnel.model.Person",
    extend : 'Ext.window.Window',
    alias : 'widget.SimpleForm',
    itemId: 'windowId',
    autoShow : true,//dont have to call .show()
    title : 'Add new record',
    items : [{
        xtype : 'form',
        itemId: "formId",
        bodyPadding : 5,//my "Default"
        flex : 1,//scale childs to fit parent
        defaultType : 'textfield',
        items : [{
            // xtype: 'textfield',
            name : 'name',
            itemId: 'userName',
            fieldLabel : 'Name'

        }, {
            name : 'email',
            itemId: 'userEmail',
            fieldLabel : 'Email'
        }, {
            name : 'phone',
            itemId: 'userPhone',
            fieldLabel : 'Phone'
        }]
    }],
    buttons : [{
        text : 'Save',
        iconCls : 'button-save',//declared CSS Background somewhere
        listeners: {click: function (thisEl) {

            var me = thisEl.up('#windowId');
            var data = me.down("#formId").getForm().getNestedValues();

            grich.core.util.AjaxSubmitHelper.invokeRequest({
                url: riznica.configuration.contextPath + "/api/person/create",
                method: "POST",
                maskComponents: { component: me },
                jsonData: data,
                scope: me,
                async: false,
                success: function(response, options, responseTextDecoded) {
                    if (responseTextDecoded.success === true) {

                        var notificationDescriptor = {
                            notification: {
                                severity: grich.core.util.NotificationUtils.NOTIFICATION_SEVERITY_INFO,
                                titleText: "Person save",
                                contentText: "Success"
                            }
                        };
                        grich.core.util.NotificationUtils.showSuccessNotification(notificationDescriptor);

                        thisEl.up('#windowId').close();
                        Ext.ComponentQuery.query('#gridPerson')[0].getStore().load();
                    }
                }
            });
        }}
    }, {
        text : 'Cancel',
        iconCls : 'button-cancel',
        handler : function(btn){
            btn.up('window').close();//query selector is your friend ;-)
        }
    }]
});