Ext.define("riznica.samplemodule.view.BlogModuleView", {
    extend: "Ext.tab.Panel",
    xtype: "samplemodule-view-BlogModuleView",

    requires: [
        "Ext.layout.container.boxOverflow.None",
        "Ext.plugin.Responsive",
        "riznica.samplemodule.view.PostModuleView",
        "riznica.samplemodule.personnel.view.CategoryListView",
        "riznica.samplemodule.view.BlogViewController",
        "riznica.samplemodule.blog.store.PostStore"
    ],

    itemId: 'blogModuleView',

    ui: "navigation",
    controller: "BlogViewController",

    tabBarHeaderPosition: 1,
    titleRotation: 0,
    tabRotation: 0, border: true,

    header: {
        layout: {
            align: "stretchmax"
        },
        title: {
            bind: {
                text: "{name}"
            },
            flex: 0
        },
        iconCls: "fa-th-list"
    },
    tabBar: {
        flex: 1,
        layout: {
            align: "stretch",
            overflowHandler: "none"
        }
    },

    responsiveConfig: {
        tall: {
            headerPosition: "top"
        },
        wide: {
            headerPosition: "left"
        }
    },

    defaults: {
        bodyPadding: 5,
        tabConfig: {
            plugins: "responsive",
            responsiveConfig: {
                wide: {
                    iconAlign: "left",
                    textAlign: "left"
                },
                tall: {
                    iconAlign: "top",
                    textAlign: "center",
                    width: 120
                }
            }
        }
    },
    items: [
        {
            title: "Home",
            iconCls: "fa-home",
            // style: {'border': '1px solid red'},
            layout: 'hbox',
            // width: 150,
            // height: 200,
            items: [
                {
                    xtype: 'panel',
                    itemId: 'searchCatPanel',
                    title: 'Search and Categories',
                    style: {'border':'1px solid #5FA2DD'},
                    layout: {
                        type: 'vbox',
                        pack: 'start',
                        align: 'stretch'
                    },
                    // width: 250,
                    // height: 300
                    flex:0.5,
                    items:[
                        // {
                        //     xtype: 'textfield',
                        //     margin: '5 5 5 5',
                        //     itemId: 'searchId',
                        //     iconCls: 'x-fa fa-search',
                        //     enableKeyEvents: true,
                        //     listeners: {
                        //         keypress: function (field, event) {
                        //             if(event.getKey()==event.ENTER){
                        //                 Ext.ComponentQuery.query('#dynamicPost')[0].removeAll(true);
                        //
                        //                 grich.core.util.AjaxSubmitHelper.invokeRequest({
                        //                     url: riznica.configuration.contextPath + "/api/post/findPost",
                        //                     method: "POST",
                        //                     jsonData: Ext.util.JSON.encode({title: field.value, content: field.value}),
                        //                     // async: false,
                        //                     success: function(response, options, responseTextDecoded) {
                        //                         if (responseTextDecoded.success === true) {
                        //
                        //                             var notificationDescriptor = {
                        //                                 notification: {
                        //                                     severity: grich.core.util.NotificationUtils.NOTIFICATION_SEVERITY_INFO,
                        //                                     titleText: "Pronadjeni postovi",
                        //                                     contentText: "Success"
                        //                                 }
                        //                             };
                        //                             grich.core.util.NotificationUtils.showSuccessNotification(notificationDescriptor);
                        //
                        //                             Ext.each(responseTextDecoded.data || [], function(item) {
                        //                                 Ext.ComponentQuery.query('#dynamicPost')[0].add(
                        //                                     {   xtype: 'SinglePost',
                        //                                         title: item.title,
                        //                                         itemId: 'post'+item.id,
                        //                                         margin: '5 5 5 5',
                        //                                         style: {'border': '1px solid #5FA2DD'},
                        //                                         listeners:{
                        //                                             'render': function (panel) {
                        //                                                 Ext.ComponentQuery.query('#blogModuleView')[0].getController().onClickOpenPostFullView(panel,item);
                        //                                             }
                        //                                         },
                        //
                        //                                         tools: [{
                        //                                             xtype: 'button',
                        //                                             text: 'Delete',
                        //                                             border: false,
                        //                                             tooltip: 'Delete post',
                        //                                             iconCls: 'x-fa fa-trash',
                        //                                             handler: function () {
                        //                                                 Ext.ComponentQuery.query('#blogModuleView')[0].getController().onClickDeletePost2(item);
                        //                                             }
                        //                                         },{
                        //                                             xtype: 'button',
                        //                                             text: 'Edit',
                        //                                             border: false,
                        //                                             iconCls: 'x-fa fa-pencil',
                        //                                             handler: function () {
                        //                                                 Ext.ComponentQuery.query('#blogModuleView')[0].getController().onClickEditPost(item);
                        //                                             }
                        //                                         }
                        //                                         ]
                        //                                     });
                        //
                        //                                 Ext.ComponentQuery.query('#post'+item.id+' textfield')[0].setValue(item.id);
                        //                                 Ext.ComponentQuery.query('#post'+item.id+' textfield')[0].hide();
                        //                                 Ext.ComponentQuery.query('#post'+item.id+' label')[0].hide();
                        //                                 Ext.ComponentQuery.query('#post'+item.id+' textfield')[1].setValue(item.title);
                        //
                        //                                 /* Content label and field*/
                        //                                 Ext.ComponentQuery.query('#post'+item.id+' label')[2].hide();
                        //                                 Ext.ComponentQuery.query('#post'+item.id+' textfield')[2].hide();
                        //
                        //                                 /* Category label land field*/
                        //                                 Ext.ComponentQuery.query('#post'+item.id+' label')[3].hide();
                        //                                 Ext.ComponentQuery.query('#post'+item.id+' textfield')[3].hide();
                        //                             }, this);
                        //                         }
                        //                     }
                        //                 });
                        //
                        //             }
                        //         }
                        //     }
                        // },
                        {
                            xtype: 'fieldcontainer',
                            itemId: 'filterContainer',
                            labelStyle: 'width:40px',
                            // style: {'border':'1px solid #5FA2DD'},
                            fieldLabel: 'Filter',
                            margin: '5 5 5 5',
                            padding: '5 5 5 5',
                            defaultType: 'radiofield',
                            // width: 150,
                            defaults: {
                                flex: 0.5
                            },
                            layout: 'vbox',
                            items:[
                                {
                                    boxLabel  : 'Autor',
                                    // labelStyle: 'width: 30px',
                                    inputValue: 'Autor',
                                    margin: '0',
                                    id: 'rb1',
                                    name: 'rbGroup',
                                    checked: false,
                                    listeners: {
                                        change: function () {
                                            var rb1 = Ext.getCmp('rb1');
                                            if(rb1.getValue()) {
                                                Ext.ComponentQuery.query('#gridCategory')[0].hide();
                                                Ext.ComponentQuery.query('#searchContainer')[0].show();
                                                Ext.ComponentQuery.query('#searchCatPanel')[0].remove('datePanel', true);

                                                var filter = Ext.ComponentQuery.query('#filter')[0];
                                                filter.queryParam = 'authorName';
                                                filter.displayField = 'title';

                                                var store = Ext.ComponentQuery.query('#filter')[0].getStore();
                                                store.getProxy().api.read = riznica.configuration.contextPath + "/api/post/listByAuthor";
                                                store.load();
                                            }
                                        }
                                    }
                                },{
                                    boxLabel: 'Naslov',
                                    inputValue: 'Naslov',
                                    margin: '0',
                                    id: 'rb2',
                                    name: 'rbGroup',
                                    checked: true,
                                    listeners: {
                                        change: function () {
                                            var rb2 = Ext.getCmp('rb2');
                                            if(rb2.getValue()) {
                                                Ext.ComponentQuery.query('#gridCategory')[0].hide();
                                                Ext.ComponentQuery.query('#searchContainer')[0].show();
                                                Ext.ComponentQuery.query('#searchCatPanel')[0].remove('datePanel', true);

                                                var filter = Ext.ComponentQuery.query('#filter')[0];
                                                filter.queryParam = 'title';
                                                filter.displayField = 'title';

                                                var store = Ext.ComponentQuery.query('#filter')[0].getStore();
                                                store.getProxy().api.read = riznica.configuration.contextPath + "/api/post/listByTitle";
                                                store.load();
                                            }
                                        }
                                    }
                                },{
                                    boxLabel: 'Kategorija',
                                    inputValue: 'Kategorija',
                                    margin: '0',
                                    id: 'rb3',
                                    name: 'rbGroup',
                                    checked: false,
                                    listeners: {
                                        change: function () {
                                            var rb3 = Ext.getCmp('rb3');
                                            if(rb3.getValue()) {
                                                Ext.ComponentQuery.query('#gridCategory')[0].show();
                                                Ext.ComponentQuery.query('#searchContainer')[0].hide();
                                                Ext.ComponentQuery.query('#searchCatPanel')[0].remove('datePanel', true);
                                            }
                                        }
                                    }
                                },
                                {
                                    boxLabel: 'Datum',
                                    inputValue: 'Datum',
                                    margin: '0',
                                    id: 'rb4',
                                    name: 'rbGroup',
                                    checked: false,
                                    listeners: {
                                        change: function () {
                                            var rb4 = Ext.getCmp('rb4');
                                            if(rb4.getValue()) {
                                                Ext.ComponentQuery.query('#gridCategory')[0].hide();
                                                Ext.ComponentQuery.query('#searchContainer')[0].hide();
                                                Ext.ComponentQuery.query('#searchCatPanel')[0].add(
                                                    {
                                                        xtype: 'panel',
                                                        itemId:'datePanel',
                                                        // width: 150,
                                                        margin: '5 5 5 5',
                                                        layout:{
                                                            type: 'vbox',
                                                            pack: 'start',
                                                            align: 'stretch'
                                                        },
                                                        // flex: 0.5,
                                                        items:[
                                                            {
                                                                xtype: 'datefield',
                                                                fieldLabel: 'Od',
                                                                itemId: 'dateFrom',
                                                                labelStyle: 'width:40px',
                                                                // anchor: '100%',
                                                                name: 'from_date',
                                                                // value: new Date()
                                                            }, {
                                                                xtype: 'datefield',
                                                                fieldLabel: 'Do',
                                                                itemId: 'dateTo',
                                                                labelStyle: 'width:40px',
                                                                // anchor: '100%',
                                                                name: 'to_date',
                                                                // value: new Date()
                                                            },{
                                                                xtype: 'button',
                                                                text: 'Search',
                                                                iconCls: 'x-fa fa-search',
                                                                listeners: {
                                                                    click: function () {
                                                                        var dateFrom = Ext.ComponentQuery.query('#dateFrom')[0].getValue();
                                                                        dateFrom.setTime( dateFrom.getTime() - dateFrom.getTimezoneOffset()*60*1000 );
                                                                        var dateTo = Ext.ComponentQuery.query('#dateTo')[0].getValue();
                                                                        dateTo.setTime( dateTo.getTime() - dateTo.getTimezoneOffset()*60*1000 );

                                                                        console.log("dateFrom: "+dateFrom+" dateTo: "+dateTo);

                                                                        Ext.ComponentQuery.query('#dynamicPost')[0].removeAll(true);
                                                                        grich.core.util.AjaxSubmitHelper.invokeRequest({
                                                                            url: riznica.configuration.contextPath + "/api/post/listByDate",
                                                                            method: "POST",
                                                                            jsonData: {dateFrom: dateFrom, dateTo: dateTo},
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
                                                                }
                                                            }]
                                                    }
                                                );
                                            }
                                        }
                                    }
                                }
                            ]
                        },{
                            xtype: 'fieldcontainer',
                            itemId: 'searchContainer',
                            layout: {
                                type: 'hbox',
                                pack: 'start',
                                align: 'stretch'
                            },
                            margin: '5 5 5 5',
                            items: [
                                {
                                    xtype: 'combo',
                                    anchor: '100%',
                                    fieldLabel: '',
                                    iconCls: 'x-fa fa-search',
                                    flex: 1,
                                    hideTrigger: true,
                                    displayField: 'title',
                                    // pageSize: 2,
                                    minChars: 3,
                                    // queryDelay: 250,
                                    store: {
                                        type: "samplemodule-blog-store-PostStore"
                                    },
                                    queryParam: 'title',
                                    queryMode: 'remote',
                                    typeAhead: true,
                                    // mode: 'local',
                                    // remoteFilter: false,
                                    forceSelection: true,
                                    // typeAheadDelay: 200,1
                                    itemId: 'filter',
                                    // valueField: 'title',
                                    // enableKeyEvents: true,
                                    listeners: {

                                    //     // beforequery:function(queryEvent){
                                    //     //     Ext.Ajax.abortAll(); //cancel any previous requests
                                    //     //     return true;
                                    //     // },
                                    //     keypress: function (field, event) {
                                    //         if(event.getKey()==event.ENTER){
                                    //             Ext.ComponentQuery.query('#filter')[0].getStore().load({
                                    //                 params: {title: field.getRawValue()}
                                    //             });
                                    //             console.log('nesto: '+ field.getRawValue());
                                    //         }
                                    //     },
                                    //     // click: function () {
                                    //     //
                                    //     // },
                                        select: function (combo,records, eOpts) {


                                            // Ext.ComponentQuery.query('#filter')[0].getStore().load({
                                            //     params: {title: records.data.name}
                                            // });
                                            console.log('id: '+records.data.id+' title: '+records.data.title+
                                                " catId: "+records.data.categoryId);


                                            Ext.ComponentQuery.query('#dynamicPost')[0].removeAll(true);
                                            Ext.ComponentQuery.query('#dynamicPost')[0].add(
                                                {
                                                    xtype: 'PostFullView',
                                                    title: 'Post View'
                                                });

                                            Ext.ComponentQuery.query('#postIdFull')[0].setValue(records.data.id);
                                            Ext.ComponentQuery.query('#postIdFull')[0].hide();
                                            Ext.ComponentQuery.query('#postTitle')[0].setValue(records.data.title);
                                            Ext.ComponentQuery.query('#postContent')[0].setValue(records.data.content);
                                            Ext.ComponentQuery.query('#postAuthor')[0].setValue(records.data.authorName);

                                            Ext.ComponentQuery.query('#gridCategory')[0].getStore().each(function (rec) {
                                                if (records.data.categoryId == rec.get('id')) {
                                                    Ext.ComponentQuery.query('#postCategory')[0].setValue(rec.get('name'));
                                                }
                                            });

                                            /* Load CommentStore by postId */
                                            Ext.ComponentQuery.query('#PostCommentGrid')[0].getStore().load({
                                                params: {post: records.data.id}
                                            });
                                        }
                                    }
                                }
                                // ,{
                                //     xtype: 'button',
                                //     iconCls: 'x-fa fa-search',
                                //     margin: '0 0 0 5',
                                //     itemId: 'doFilter',
                                //     text: ''
                                // }
                            ]
                        },{
                            xtype: "samplemodule-personnel-view-CategoryListView",
                            title: 'Categories',
                            hidden: true,
                            frame: false
                        }
                    ]
                },{
                    xtype: 'samplemodule-view-PostModuleView',
                    // title: 'Posts',
                    margin: '0 0 5 5',
                    flex: 1.5,
                    style: {'border':'1px solid #5FA2DD'}
                }
            ]
        }
    ]
});
