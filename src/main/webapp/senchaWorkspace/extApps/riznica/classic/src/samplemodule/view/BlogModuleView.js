Ext.define("riznica.samplemodule.view.BlogModuleView", {
    extend: "Ext.tab.Panel",
    xtype: "samplemodule-view-BlogModuleView",

    requires: [
        "Ext.layout.container.boxOverflow.None",
        "Ext.plugin.Responsive",
        "riznica.samplemodule.view.PostModuleView",
        "riznica.samplemodule.personnel.view.CategoryListView",
        "riznica.samplemodule.view.BlogViewController"
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
                            fieldLabel: 'Filter',
                            margin: '5',
                            defaultType: 'radiofield',
                            // defaults: {
                            //     flex: 1
                            // },
                            layout: 'hbox',
                            items:[
                                {
                                    xtype: 'radio',
                                    boxLabel: 'Autor',
                                    // margin: '5 5 5 5',
                                    id: 'rb1',
                                    name: 'rbGroup',
                                    checked: false,
                                    hideLabel: true
                                },{
                                    xtype: 'radio',
                                    boxLabel: 'Naslov',
                                    margin: '0 5 0 5',
                                    id: 'rb2',
                                    name: 'rbGroup',
                                    checked: false,
                                    hideLabel: false
                                },{
                                    xtype: 'radio',
                                    boxLabel: 'Kategorija',
                                    // margin: '5 5 5 5',
                                    id: 'rb4',
                                    name: 'rbGroup',
                                    checked: false,
                                    hideLabel: false
                                }
                            ]
                        },{
                            xtype: 'fieldcontainer',
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
                                    flex: 1,
                                    // width: 300,
                                    hideTrigger: true,
                                    displayField: 'name',
                                    // pageSize: 2,
                                    minChars: 3,
                                    // queryDelay: 250,
                                    store: {
                                        type: "samplemodule-blog-store-CategoryStore"
                                    },
                                    // queryParam: 'name',
                                    typeAhead: true,
                                    // mode: 'remote',
                                    // forceSelection: true,
                                    // typeAheadDelay: 200,1
                                    itemId: 'filter',
                                    valueField: 'name',
                                    listeners: {
                                        select: function (combo,records, eOpts) {

                                        }
                                    }
                                },{
                                    xtype: 'button',
                                    iconCls: 'x-fa fa-search',
                                    margin: '0 0 0 5',
                                    itemId: 'doFilter',
                                    text: ''
                                }
                            ]
                        },{
                            xtype: "samplemodule-personnel-view-CategoryListView",
                            title: 'Categories',
                            frame: false
                        }
                    ]
                },{
                    xtype: 'samplemodule-view-PostModuleView',
                    // title: 'Posts',
                    margin: '0 0 5 5',
                    // itemId: 'postModule',
                    flex: 1.5,
                    style: {'border':'1px solid #5FA2DD'}
                }
            ]
        }
    ]
});
