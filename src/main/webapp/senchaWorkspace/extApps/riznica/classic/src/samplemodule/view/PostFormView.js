Ext.define("riznica.samplemodule.view.PostFormView", {
    extend: 'Ext.window.Window',
    requires: [
        "riznica.samplemodule.view.SinglePost",
        "riznica.samplemodule.blog.store.CategoryStore",
        "riznica.samplemodule.view.BlogViewController"
    ],
    alias: 'widget.PostFormView',
    itemId: 'postWindowId',
    flex: 1,
    autoShow: true,//dont have to call .show()
    title: 'Add new post',
    controller: "BlogViewController",
    items: [{
        xtype: 'form',
        itemId: "postFormId",
        bodyPadding: 5,//my "Default"
        flex: 1,//scale childs to fit parent
        defaultType: 'textfield',
        items: [
        {
                name: 'id',
                itemId: 'postId',
                fieldLabel: 'ID',
                readOnly: true
            },
            {
                name: 'title',
                itemId: 'postTitle',
                fieldLabel: 'Title'
            },{
                name: 'content',
                xtype: 'textarea',
                itemId: 'postContent',
                fieldLabel: 'Content'
            },{
                name: 'category',
                xtype: 'combobox',
                itemId: 'postCategory',
                fieldLabel: 'Category',
                tpl: Ext.create('Ext.XTemplate',
                    '<ul class="x-list-plain"><tpl for=".">',
                    '<li role="option" class="x-boundlist-item">{id} - {name}</li>',
                    '</tpl></ul>'
                ),
                valueField: 'id',
                displayTpl: Ext.create('Ext.XTemplate',
                        '<tpl for=".">',
                            '{id} - {name}',
                        '</tpl>'
                ),
                store: {
                    type: "samplemodule-blog-store-CategoryStore"
                }
            }
        ]
    }],
    buttons: [{
        text: 'Save',
        iconCls: 'x-fa fa-floppy-o',//declared CSS Background somewhere
        listeners: {
            click: function (thisEl) {

                var me = Ext.ComponentQuery.query('#postWindowId')[0];
                var data = me.down("#postFormId").getForm().getNestedValues();

                if(data.id==-1) {
                    Ext.ComponentQuery.query('#dynamicPost')[0].removeAll(true);

                    grich.core.util.AjaxSubmitHelper.invokeRequest({
                        url: riznica.configuration.contextPath + "/api/post/create",
                        method: "POST",
                        maskComponents: {component: Ext.ComponentQuery.query('#dynamicPost')[0]},
                        jsonData: data,
                        success: function (response, options, responseTextDecoded) {
                            if (responseTextDecoded.success === true) {

                                // Ext.each(responseTextDecoded.data || [], function (item) {
                                //     Ext.ComponentQuery.query('#dynamicPost')[0].add(
                                //         {
                                //             xtype: 'SinglePost',
                                //             title: item.content,
                                //             itemId: 'post' + item.id,
                                //             margin: '5 5 5 5',
                                //             style: {'border': '1px solid #5FA2DD'}
                                //         });
                                //     Ext.ComponentQuery.query('#post' + item.id + ' textfield')[0].setValue(item.id);
                                //     Ext.ComponentQuery.query('#post' + item.id + ' textfield')[1].setValue(item.title);
                                //     Ext.ComponentQuery.query('#post' + item.id + ' textfield')[2].setValue(item.content);
                                //
                                // }, this);
                                var notificationDescriptor = {
                                    notification: {
                                        severity: grich.core.util.NotificationUtils.NOTIFICATION_SEVERITY_INFO,
                                        titleText: "Post saved!!!",
                                        contentText: "Success"
                                    }
                                };


                                grich.core.util.AjaxSubmitHelper.invokeRequest({
                                    url: riznica.configuration.contextPath + "/api/post/listByCatId",
                                    method: "POST",
                                    jsonData: {category: data.category},
                                    // maskComponents:Ext.ComponentQuery.query('#dynamicPost')[0],
                                    success: function (response, options, responseTextDecoded) {
                                        if (responseTextDecoded.success === true) {
                                            Ext.each(responseTextDecoded.data || [], function(item) {
                                                Ext.ComponentQuery.query('#dynamicPost')[0].add(
                                                    {
                                                        xtype: 'SinglePost',
                                                        title: item.title,
                                                        itemId: 'post'+item.id,
                                                        margin: '5 5 5 5',
                                                        style: {'border': '1px solid #5FA2DD'},
                                                        listeners:{
                                                            render: function(panel){
                                                                Ext.ComponentQuery.query('#postModule')[0].getController().onClickOpenPostFullView(panel, item);
                                                            }
                                                        },
                                                        tools: [{
                                                            xtype: 'button',
                                                            text: 'Delete',
                                                            border: false,
                                                            iconCls: 'x-fa fa-trash',
                                                            tooltip: 'Delete',
                                                            handler: function () {
                                                                Ext.ComponentQuery.query('#postModule')[0].getController().onClickDeletePost2(item);
                                                            }
                                                        },{
                                                            xtype: 'button',
                                                            text: 'Edit',
                                                            tooltip: 'Edit Post',
                                                            border: false,
                                                            iconCls: 'x-fa fa-pencil',
                                                            handler: function () {
                                                                Ext.ComponentQuery.query('#postModule')[0].getController().onClickEditPost(item);
                                                                // var config = {
                                                                //     xtype: 'PostFormView',
                                                                //     mode: 'edit',
                                                                //     title: 'Edit post'
                                                                // };
                                                                // var win = Ext.ComponentMgr.create(config);
                                                                //
                                                                // Ext.ComponentQuery.query('#postId')[0].setValue(item.id);
                                                                // Ext.ComponentQuery.query('#postTitle')[0].setValue(item.title);
                                                                // Ext.ComponentQuery.query('#postContent')[0].setValue(item.content);
                                                                // Ext.ComponentQuery.query('#postCategory')[0].setValue(item.categoryId);
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
                                                // });
                                            }, this);
                                        }
                                    }
                                });

                                grich.core.util.NotificationUtils.showSuccessNotification(notificationDescriptor);

                                // Ext.ComponentQuery.query('#gridCategory')[0].getStore().load();
                                Ext.ComponentQuery.query('#postWindowId')[0].close();
                            }
                        }
                    });
                }else{
                    grich.core.util.AjaxSubmitHelper.invokeRequest({
                        url: riznica.configuration.contextPath + "/api/post/update",
                        method: "POST",
                        maskComponents: Ext.ComponentQuery.query('#dynamicPost')[0],
                        jsonData: data,
                        // scope: me,
                        async: false,
                        success: function (response, options, responseTextDecoded) {
                            if (responseTextDecoded.success === true) {
                                var notificationDescriptor = {
                                    notification: {
                                        severity: grich.core.util.NotificationUtils.NOTIFICATION_SEVERITY_INFO,
                                        titleText: "Post edited!!!",
                                        contentText: "Success"
                                    }
                                };
                                grich.core.util.NotificationUtils.showSuccessNotification(notificationDescriptor);
                            }
                            Ext.ComponentQuery.query('#postWindowId')[0].close();
                        }
                    });
                    Ext.ComponentQuery.query('#dynamicPost')[0].removeAll(true);
                }
            }
        }
    }, {
        text: 'Cancel',
        iconCls: 'button-cancel',
        handler: function (btn) {
            btn.up('window').close();
        }
    }]
});