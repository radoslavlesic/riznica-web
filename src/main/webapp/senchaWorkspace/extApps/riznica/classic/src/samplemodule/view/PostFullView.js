Ext.define("riznica.samplemodule.view.PostFullView", {
    extend: 'Ext.panel.Panel',
    alias: 'widget.PostFullView',
    requires: [
        "Ext.panel.Panel",
        "riznica.samplemodule.view.PostCommentForm",
        "riznica.samplemodule.view.PostCommentGrid"
    ],
    xtype: 'PostFullView',
    // autoShow: true,
    margin: '5 5 5 5',
    layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'textfield',
            margin:'5 5 5 0',
            fieldLabel: 'ID',
            itemId: 'postIdFull',
            readOnly: true
        },
        {
            xtype: 'textfield',
            margin:'5 5 5 0',
            fieldLabel: 'Title',
            itemId: 'postTitle',
            readOnly: true
        },
        {
            xtype: 'textarea',
            margin:'5 5 5 0',
            fieldLabel: 'Content',
            itemId: 'postContent',
            readOnly: true
        },
        {
            xtype: 'textfield',
            margin:'5 5 5 0',
            fieldLabel: 'Author',
            itemId: 'postAuthor',
            readOnly: true
        },
        {
            xtype: 'textfield',
            margin:'5 5 5 0',
            fieldLabel: 'Category',
            itemId: 'postCategory',
            readOnly: true
        }
        ,
        {
            xtype: 'panel',
            title: 'Comments',

            // layout: {
            //     type: 'vbox',
            //     pack: 'start',
            //     align: 'stretch'
            // },
            tools: [
                {
                    xtype: 'button',
                    iconCls: 'x-fa fa-plus',
                    border: false,
                    title: 'Add',
                    tooltip: 'Add new comment',
                    handler: function () {
                        var config = {
                            xtype: 'PostCommentForm',

                            title: 'New comment'
                        };
                        var win = Ext.ComponentMgr.create(config);
                        Ext.ComponentQuery.query('#commentArea')[0].focus(true);
                    }
                }
            ],
            items:[
                {xtype: 'PostCommentGrid'}
            ]
        }
    ]
});