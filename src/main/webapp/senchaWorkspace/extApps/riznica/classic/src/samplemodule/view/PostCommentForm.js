Ext.define("riznica.samplemodule.view.PostCommentForm",{
    extend: 'Ext.window.Window',
    alias: 'widget.PostCommentForm',
    autoShow: true,
    margin: '5 5 5 5',
    itemId: 'commentWindow',
    items:[
        {
            xtype: 'textarea',
            fieldLabel: 'Comment',
            name: 'comment',
            itemId: 'commentArea',
            margin: '5 5 5 5',
            width: 350,
            height: 150
        }
    ],
    buttons:[
        {
            text: 'Save',
            iconCls: 'x-fa fa-floppy-o',
            listeners: {
                click: function (thisEl) {
                    var commentValue = Ext.ComponentQuery.query('#commentArea')[0].getValue();

                    var postId = Ext.ComponentQuery.query('#postIdFull')[0].getValue();

                    grich.core.util.AjaxSubmitHelper.invokeRequest({
                        url: riznica.configuration.contextPath + "/api/comment/create",
                        method: "POST",
                        // maskComponents: Ext.ComponentQuery.query('#dynamicPost')[0],
                        jsonData: {content: commentValue,post: postId},
                        // scope: me,
                        async: false,
                        success: function (response, options, responseTextDecoded) {
                            if (responseTextDecoded.success === true) {
                                var notificationDescriptor = {
                                    notification: {
                                        severity: grich.core.util.NotificationUtils.NOTIFICATION_SEVERITY_INFO,
                                        titleText: "New comment!!!",
                                        contentText: "Success"
                                    }
                                };
                                grich.core.util.NotificationUtils.showSuccessNotification(notificationDescriptor);
                            }

                            thisEl.up('window').close();
                            var postId = Ext.ComponentQuery.query('#postIdFull')[0].getValue();
                            Ext.ComponentQuery.query('#PostCommentGrid')[0].getStore().load({
                                params:{post: postId}
                            });
                        }
                    });
                }
            }
        },{
            text: 'Cancel',
            handler: function (btn) {
                btn.up('window').close();
            }
        }
    ]
});