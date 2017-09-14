/**
 * This view is an example list of people.
 */
Ext.define("riznica.samplemodule.personnel.view.CategoryListView", {
    extend: "Ext.grid.Panel",
    itemId: "gridCategory",
    xtype: "samplemodule-personnel-view-CategoryListView",

    requires: [
        "riznica.samplemodule.blog.store.CategoryStore",
        "riznica.samplemodule.view.CategoryFormView",
        "riznica.samplemodule.view.BlogViewController"
    ],
    controller: "BlogViewController",
    title: "Category registry",

    frame: true,

    store: {
        type: "samplemodule-blog-store-CategoryStore"
    },
    tools: [
        {
            type: 'plus',
            text: 'Add',
            tooltip: 'Add new category',
            handler: function () {
                var config = {
                    xtype: 'CategoryFormView',
                    mode: 'edit',
                    title: 'Add new category'
                };
                var win = Ext.ComponentMgr.create(config);

                Ext.ComponentQuery.query('#catId')[0].setValue(-1);
                Ext.ComponentQuery.query('#catId')[0].hide();

                Ext.ComponentQuery.query('#catName')[0].focus(true);
            }
        },
    ],
    columns: [
        {text: "Name", dataIndex: "name", flex: 1}
    ],

    listeners: {
        select: function (grid, record) {

            var me = Ext.ComponentQuery.query('#gridCategory')[0];
            var data = record.data;
            data.category = record.data.id;
            delete data.class;

            Ext.ComponentQuery.query('#dynamicPost')[0].removeAll(true);

            grich.core.util.AjaxSubmitHelper.invokeRequest({
                url: riznica.configuration.contextPath + "/api/post/listByCatId",
                method: "POST",
                maskComponents: {component: Ext.ComponentQuery.query('#dynamicPost')[0]},
                jsonData: Ext.util.JSON.encode(data),
                // scope: me,
                // async: false,
                success: function (response, options, responseTextDecoded) {
                    if (responseTextDecoded.success === true) {

                        Ext.each(responseTextDecoded.data || [], function (item) {
                            Ext.ComponentQuery.query('#dynamicPost')[0].add(
                                {
                                    xtype: 'SinglePost',
                                    title: item.title,
                                    itemId: 'post' + item.id,
                                    margin: '5 5 5 5',
                                    style: {'border': '1px solid #5FA2DD'},
                                    listeners: {
                                        render: function (panel) {
                                            Ext.ComponentQuery.query('#gridCategory')[0].getController().onClickOpenPostFullView(panel, item);
                                        }
                                    },
                                    tools: [{
                                        xtype: 'button',
                                        text: 'Delete',
                                        border: false,
                                        tooltip: 'Delete post',
                                        iconCls: 'x-fa fa-trash',
                                        handler: function () {
                                            Ext.ComponentQuery.query('#gridCategory')[0].getController().onClickDeletePost2(item);
                                        }
                                    }, {
                                        xtype: 'button',
                                        text: 'Edit',
                                        border: false,
                                        iconCls: 'x-fa fa-pencil',
                                        handler: function () {
                                            Ext.ComponentQuery.query('#gridCategory')[0].getController().onClickEditPost(item);
                                        }
                                    }
                                    ]
                                });

                            Ext.ComponentQuery.query('#post' + item.id + ' textfield')[0].setValue(item.id);
                            Ext.ComponentQuery.query('#post' + item.id + ' textfield')[0].hide();
                            Ext.ComponentQuery.query('#post' + item.id + ' label')[0].hide();
                            Ext.ComponentQuery.query('#post' + item.id + ' textfield')[1].setValue(item.title);

                            /* Content label and field*/
                            Ext.ComponentQuery.query('#post' + item.id + ' label')[2].hide();
                            Ext.ComponentQuery.query('#post' + item.id + ' textfield')[2].hide();

                            /* Category label land field*/
                            Ext.ComponentQuery.query('#post' + item.id + ' label')[3].hide();
                            Ext.ComponentQuery.query('#post' + item.id + ' textfield')[3].hide();

                            // Ext.ComponentQuery.query('#gridCategory')[0].getStore().each(function (rec) {
                            //     //console.log("neka kategoria: "+rec.get('name'));
                            //     if(item.categoryId==rec.get('id')){
                            //         Ext.ComponentQuery.query('#post'+item.id+' textfield')[3].setValue(rec.get('name'));
                            //     }
                            // });
                            // Ext.ComponentQuery.query('#post'+item.id+' textfield')[3].setValue(item.categoryId);

                        }, this);
                    }
                }
            });

            // Ext.Msg.alert("id: " + record.data.id);

            // var config = {
            //     xtype: 'CategoryFormView',
            //     mode: 'edit',
            //     title: 'Edit category'
            // };
            //
            // var win = Ext.ComponentMgr.create(config);
            //
            // Ext.ComponentQuery.query('#catId')[0].setValue(record.data.id);
            // Ext.ComponentQuery.query('#catName')[0].setValue(record.data.name);
        },
        // itemdblclick: function(dv, record, item, index, e) {
        //     Ext.Msg.confirm("Confirm", "Are you sure?", function(choice){
        //         if (choice === "yes") {
        //
        //             var me = Ext.ComponentQuery.query('#gridCategory')[0];
        //             var data = record.data;
        //             delete data.class;
        //
        //             grich.core.util.AjaxSubmitHelper.invokeRequest({
        //                 url: riznica.configuration.contextPath + "/api/category/delete",
        //                 method: "POST",
        //                 maskComponents: { component: me },
        //                 jsonData: Ext.util.JSON.encode(data),
        //                 scope: me,
        //                 async: false,
        //                 success: function(response, options, responseTextDecoded) {
        //                     if (responseTextDecoded.success === true) {
        //
        //                         var notificationDescriptor = {
        //                             notification: {
        //                                 severity: grich.core.util.NotificationUtils.NOTIFICATION_SEVERITY_INFO,
        //                                 titleText: "Category deleted!!!",
        //                                 contentText: "Success"
        //                             }
        //                         };
        //                         grich.core.util.NotificationUtils.showSuccessNotification(notificationDescriptor);
        //
        //                         Ext.ComponentQuery.query('#gridCategory')[0].getStore().load();
        //                     }
        //                 }
        //             });
        //
        //         }
        //     });
        // },
        itemcontextmenu: function (tree, record, item, index, e, eOpts) {
            // Optimize : create menu once
            var menu_grid = new Ext.menu.Menu({
                items:
                    [
                        {
                            text: 'Edit',
                            iconCls: 'x-fa fa-floppy-o',
                            handler: function () {
                                var config = {
                                    xtype: 'CategoryFormView',
                                    mode: 'edit',
                                    title: 'Edit category'
                                };

                                var win = Ext.ComponentMgr.create(config);

                                Ext.ComponentQuery.query('#catId')[0].setValue(record.data.id);
                                Ext.ComponentQuery.query('#catName')[0].setValue(record.data.name);
                                Ext.ComponentQuery.query('#catName')[0].focus(true);
                            }
                        }, {
                            text: 'Delete',
                            iconCls: 'x-fa fa-trash',
                            handler: function () {
                                Ext.Msg.confirm("Confirm", "Are you sure?", function (choice) {
                                    if (choice === "yes") {

                                        var me = Ext.ComponentQuery.query('#gridCategory')[0];
                                        var data = record.data;
                                        delete data.class;

                                        grich.core.util.AjaxSubmitHelper.invokeRequest({
                                            url: riznica.configuration.contextPath + "/api/category/delete",
                                            method: "POST",
                                            // maskComponents: { component: me },
                                            jsonData: Ext.util.JSON.encode(data),
                                            scope: me,
                                            async: false,
                                            success: function (response, options, responseTextDecoded) {
                                                if (responseTextDecoded.success === true) {
                                                    var notificationDescriptor = {
                                                        notification: {
                                                            severity: grich.core.util.NotificationUtils.NOTIFICATION_SEVERITY_INFO,
                                                            titleText: "Category deleted!!!",
                                                            contentText: "Success"
                                                        }
                                                    };
                                                    grich.core.util.NotificationUtils.showSuccessNotification(notificationDescriptor);

                                                    Ext.ComponentQuery.query('#gridCategory')[0].getStore().load();
                                                    Ext.ComponentQuery.query('#dynamicPost')[0].removeAll(true);
                                                }
                                            }
                                        });

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
        }
    }
});
