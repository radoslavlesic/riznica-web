Ext.define("riznica.samplemodule.view.BlogViewController", {
    extend: 'Ext.app.ViewController',
    alias: 'controller.BlogViewController',

    onClickEditPost: function (item) {
        var config = {
            xtype: 'PostFormView',
            mode: 'edit',
            title: 'Edit post'
        };
        var win = Ext.ComponentMgr.create(config);

        Ext.ComponentQuery.query('#postId')[0].setValue(item.id);
        Ext.ComponentQuery.query('#postTitle')[0].setValue(item.title);
        Ext.ComponentQuery.query('#postContent')[0].setValue(item.content);
        Ext.ComponentQuery.query('#postCategory')[0].setValue(item.categoryId);
    },
    onClickOpenPostFullView:function (panel, item ) {
        panel.body.on(
            'click', function () {

                Ext.ComponentQuery.query('#dynamicPost')[0].removeAll(true);
                Ext.ComponentQuery.query('#dynamicPost')[0].add(
                {
                    xtype: 'PostFullView',
                    title: 'Post View'
                });

                Ext.ComponentQuery.query('#postIdFull')[0].setValue(item.id);
                Ext.ComponentQuery.query('#postIdFull')[0].hide();
                Ext.ComponentQuery.query('#postTitle')[0].setValue(item.title);
                Ext.ComponentQuery.query('#postContent')[0].setValue(item.content);
                Ext.ComponentQuery.query('#postAuthor')[0].setValue(item.authorName);

                Ext.ComponentQuery.query('#gridCategory')[0].getStore().each(function (rec) {
                    if (item.categoryId == rec.get('id')) {
                        Ext.ComponentQuery.query('#postCategory')[0].setValue(rec.get('name'));
                    }
                });

                /* Load CommentStore by postId */
                Ext.ComponentQuery.query('#PostCommentGrid')[0].getStore().load({
                    params: {post: item.id}
                });
            }
        );
    },

    onClickDeletePost: function (item) {
        grich.core.util.AjaxSubmitHelper.invokeRequest({
            url: riznica.configuration.contextPath + "/api/post/delete",
            method: "POST",
            maskComponents: Ext.ComponentQuery.query('#dynamicPost')[0],
            jsonData: {id:item.id},
            // scope: me,
            async: false,
            success: function(response, options, responseTextDecoded) {
                if (responseTextDecoded.success === true) {

                    var notificationDescriptor = {
                        notification: {
                            severity: grich.core.util.NotificationUtils.NOTIFICATION_SEVERITY_INFO,
                            titleText: "Post deleted!!!",
                            contentText: "Success"
                        }
                    };

                    grich.core.util.NotificationUtils.showSuccessNotification(notificationDescriptor);

                    Ext.ComponentQuery.query('#dynamicPost')[0].removeAll(true);
                    // grich.core.util.AjaxSubmitHelper.invokeRequest({
                    //     url: riznica.configuration.contextPath + "/api/post/list",
                    //     method: "POST",
                    //     jsonData: null,
                    //     maskComponents:Ext.ComponentQuery.query('#dynamicPost')[0],
                    //     success: function (response, options, responseTextDecoded) {
                    //         if (responseTextDecoded.success === true) {
                    //
                    //             Ext.each(responseTextDecoded.data || [], function(item) {
                    //                 Ext.ComponentQuery.query('#dynamicPost')[0].add(
                    //                     {   xtype: 'SinglePost',
                    //                         title: item.title,
                    //                         itemId: 'post'+item.id,
                    //                         margin: '5 5 5 5',
                    //                         style: {'border': '1px solid #5FA2DD'},
                    //                         tools: [{
                    //                             xtype: 'button',
                    //                             text: 'Delete',
                    //                             border: false,
                    //                             iconCls: 'fa-trash',
                    //                             tooltip: 'Delete',
                    //                             handler: function () {
                    //
                    //                                 grich.core.util.AjaxSubmitHelper.invokeRequest({
                    //                                     url: riznica.configuration.contextPath + "/api/post/delete",
                    //                                     method: "POST",
                    //                                     maskComponents: Ext.ComponentQuery.query('#dynamicPost')[0],
                    //
                    //                                     jsonData: {id:item.id},
                    //                                     // scope: me,
                    //                                     async: false,
                    //                                     success: function(response, options, responseTextDecoded) {
                    //                                         if (responseTextDecoded.success === true) {
                    //
                    //                                             var notificationDescriptor = {
                    //                                                 notification: {
                    //                                                     severity: grich.core.util.NotificationUtils.NOTIFICATION_SEVERITY_INFO,
                    //                                                     titleText: "Post deleted!!!",
                    //                                                     contentText: "Success"
                    //                                                 }
                    //                                             };
                    //                                             grich.core.util.NotificationUtils.showSuccessNotification(notificationDescriptor);
                    //
                    //                                             Ext.ComponentQuery.query('#dynamicPost')[0].removeAll(true);
                    //                                         }
                    //                                     }
                    //                                 });
                    //                             }
                    //                         }
                    //
                    //                         ]
                    //                     });
                    //                 Ext.ComponentQuery.query('#post'+item.id+' textfield')[0].setValue(item.id);
                    //                 Ext.ComponentQuery.query('#post'+item.id+' textfield')[0].hide();
                    //                 Ext.ComponentQuery.query('#post'+item.id+' label')[0].hide();
                    //                 Ext.ComponentQuery.query('#post'+item.id+' textfield')[1].setValue(item.title);
                    //                 Ext.ComponentQuery.query('#post'+item.id+' textfield')[2].setValue(item.content);
                    //                 Ext.ComponentQuery.query('#gridCategory')[0].getStore().each(function (rec) {
                    //                     if(item.categoryId==rec.get('id')){
                    //                         Ext.ComponentQuery.query('#post'+item.id+' textfield')[3].setValue(rec.get('name'));
                    //                     }
                    //                 })
                    //
                    //             }, this);
                    //         }
                    //     }
                    // });
                }
            }
        });
    },

    onClickDeletePost2: function (item) {
        grich.core.util.AjaxSubmitHelper.invokeRequest({
            url: riznica.configuration.contextPath + "/api/post/delete",
            method: "POST",
            maskComponents: Ext.ComponentQuery.query('#dynamicPost')[0],
            jsonData: {id:item.id},
            // scope: me,
            async: false,
            success: function(response, options, responseTextDecoded) {
                if (responseTextDecoded.success === true) {
                    var notificationDescriptor = {
                        notification: {
                            severity: grich.core.util.NotificationUtils.NOTIFICATION_SEVERITY_INFO,
                            titleText: "Post deleted!!!",
                            contentText: "Success"
                        }
                    };
                    grich.core.util.NotificationUtils.showSuccessNotification(notificationDescriptor);

                    Ext.ComponentQuery.query('#dynamicPost')[0].removeAll(true);

                    grich.core.util.AjaxSubmitHelper.invokeRequest({
                        url: riznica.configuration.contextPath + "/api/post/list",
                        method: "POST",
                        jsonData: null,
                        maskComponents:Ext.ComponentQuery.query('#dynamicPost')[0],
                        success: function (response, options, responseTextDecoded) {
                            if (responseTextDecoded.success === true) {

                                Ext.each(responseTextDecoded.data || [], function(item) {
                                    Ext.ComponentQuery.query('#dynamicPost')[0].add(
                                        {   xtype: 'SinglePost',
                                            title: item.title,
                                            itemId: 'post'+item.id,
                                            margin: '5 5 5 5',
                                            style: {'border': '1px solid #5FA2DD'},
                                            tools: [{
                                                xtype: 'button',
                                                text: 'Delete',
                                                border: false,
                                                iconCls: 'x-fa fa-trash',
                                                tooltip: 'Delete',
                                                handler: function () {
                                                    grich.core.util.AjaxSubmitHelper.invokeRequest({
                                                        url: riznica.configuration.contextPath + "/api/post/delete",
                                                        method: "POST",
                                                        maskComponents: Ext.ComponentQuery.query('#dynamicPost')[0],
                                                        jsonData: {id:item.id},
                                                        // scope: me,
                                                        async: false,
                                                        success: function(response, options, responseTextDecoded) {
                                                            if (responseTextDecoded.success === true) {

                                                                var notificationDescriptor = {
                                                                    notification: {
                                                                        severity: grich.core.util.NotificationUtils.NOTIFICATION_SEVERITY_INFO,
                                                                        titleText: "Post deleted!!!",
                                                                        contentText: "Success"
                                                                    }
                                                                };
                                                                grich.core.util.NotificationUtils.showSuccessNotification(notificationDescriptor);

                                                                Ext.ComponentQuery.query('#dynamicPost')[0].removeAll(true);
                                                            }
                                                        }
                                                    });
                                                }
                                            },{
                                                xtype: 'button',
                                                text: 'Edit',
                                                border: false,
                                                tooltip: 'Edit Post',
                                                iconCls: 'x-fa fa-pencil',
                                                handler: function () {
                                                    Ext.ComponentQuery.query('#postModule')[0].getController().onClickEditPost(item);
                                                }
                                            }

                                            ]
                                        });
                                    Ext.ComponentQuery.query('#post'+item.id+' textfield')[0].setValue(item.id);
                                    Ext.ComponentQuery.query('#post'+item.id+' textfield')[0].hide();
                                    Ext.ComponentQuery.query('#post'+item.id+' label')[0].hide();
                                    Ext.ComponentQuery.query('#post'+item.id+' textfield')[1].setValue(item.title);

                                    /* Content label and field*/
                                    Ext.ComponentQuery.query('#post'+item.id+' label')[2].hide();
                                    Ext.ComponentQuery.query('#post'+item.id+' textfield')[2].hide();

                                    /* Category label land field*/
                                    Ext.ComponentQuery.query('#post'+item.id+' label')[3].hide();
                                    Ext.ComponentQuery.query('#post'+item.id+' textfield')[3].hide();

                                    // Ext.ComponentQuery.query('#post'+item.id+' textfield')[2].setValue(item.content);
                                    // Ext.ComponentQuery.query('#gridCategory')[0].getStore().each(function (rec) {
                                    //     if(item.categoryId==rec.get('id')){
                                    //         Ext.ComponentQuery.query('#post'+item.id+' textfield')[3].setValue(rec.get('name'));
                                    //     }
                                    // })

                                }, this);
                            }
                        }
                    });
                }
            }
        });
    }
});