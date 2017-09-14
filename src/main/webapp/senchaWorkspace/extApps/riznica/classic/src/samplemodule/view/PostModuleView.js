Ext.define("riznica.samplemodule.view.PostModuleView", {
    extend: "Ext.panel.Panel",
    xtype: "samplemodule-view-PostModuleView",
    itemId: 'postModule',
    requires: [
        "Ext.layout.container.boxOverflow.None",
        "Ext.plugin.Responsive",
        "riznica.samplemodule.personnel.view.CategoryListView",
        "riznica.samplemodule.view.SinglePost",
        "riznica.samplemodule.view.SimpleForm",
        "riznica.samplemodule.view.PostFullView",
        "riznica.samplemodule.view.BlogViewController"
    ],
    controller: "BlogViewController",
    items: [
        {
            xtype: 'panel',
            title: 'Posts',
            itemId: "dynamicPost",
            height: 750,
            autoScroll: true,
            // style: {'border':'1px solid #5FA2DD'},
            layout: {
                type: 'vbox',
                pack: 'start',
                align: 'stretch'
            },
            tools: [
                {
                    type: 'refresh',
                    text: 'Refresh',
                    tooltip: 'Refresh',

                    handler: function () {
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
                                            {
                                                xtype: 'SinglePost',
                                                title: item.title,
                                                itemId: 'post' + item.id,
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
                                                            Ext.ComponentQuery.query('#postModule')[0].getController().onClickDeletePost(item);
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

                                        // Ext.ComponentQuery.query('#post'+item.id+' textfield')[0].setValue(item.id);
                                        // Ext.ComponentQuery.query('#post'+item.id+' textfield')[0].hide();
                                        // Ext.ComponentQuery.query('#post'+item.id+' label')[0].hide();
                                        // Ext.ComponentQuery.query('#post'+item.id+' textfield')[1].setValue(item.title);
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
                },{
                    type: 'plus',
                    text: 'Add',
                    tooltip: 'Add new post',
                    handler: function () {
                       var config = {
                            xtype: 'PostFormView',
                            mode: 'edit',
                            title: 'Add new post'
                        };
                        var win = Ext.ComponentMgr.create(config);
                        Ext.ComponentQuery.query('#postId')[0].setValue(-1);
                        Ext.ComponentQuery.query('#postId')[0].hide();
                        Ext.ComponentQuery.query('#postTitle')[0].focus();

                    }
                }
             ]
        }
    ]
});
