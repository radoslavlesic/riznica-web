Ext.define("riznica.samplemodule.user.view.UserForm",{
    extend: 'Ext.window.Window',
    alias: 'widget.UserForm',
    autoShow : true,
    itemId: 'userWindow',
    items: [
        {
            xtype: 'form',
            itemId: 'userForm',
            items: [{
                    name: 'username',
                    xtype: 'textfield',
                    itemId: 'username',
                    fieldLabel: 'Username',
                    margin: '5 5 0 5'
                },
                {
                    xtype: 'textfield',
                    name: 'password',
                    itemId: 'password',
                    fieldLabel: 'Password',
                    inputType: 'password',
                    margin: '5 5 5 5'
                }
            ]
        }

    ],
    buttons: [
        {
            text: "Save",
            iconCls: 'x-fa fa-floppy-o',
            handler: function (thisEl) {

                var me = thisEl.up('#userWindow');
                var data = me.down('#userForm').getForm().getNestedValues();

                grich.core.util.AjaxSubmitHelper.invokeRequest({
                    url: riznica.configuration.contextPath + "/api/user/create",
                    method: "POST",
                    // maskComponents: Ext.ComponentQuery.query('#dynamicPost')[0],

                    jsonData: data,
                    // scope: me,
                    async: false,
                    success: function(response, options, responseTextDecoded) {
                        if (responseTextDecoded.success === true) {

                            var notificationDescriptor = {
                                notification: {
                                    severity: grich.core.util.NotificationUtils.NOTIFICATION_SEVERITY_INFO,
                                    titleText: "User created!!!",
                                    contentText: "Success"
                                }
                            };
                            grich.core.util.NotificationUtils.showSuccessNotification(notificationDescriptor);

                            thisEl.up('#userWindow').close();
                            Ext.ComponentQuery.query("UserListView")[0].getStore().load();
                        }
                    }
                });
            }
        },
        {
            text: "Cancel",
            handler : function(btn){
                btn.up('window').close();
            }}
    ]
});