Ext.define("riznica.samplemodule.view.SinglePost",{
    extend: 'Ext.panel.Panel',
    alias : 'widget.SinglePost',

    items:[{
        xtype: 'panel',
        // title: 'Dynamic Post',
        // width: 450,
        layout: {
            type: 'hbox',
            pack: 'start',
            align: 'stretch'
        },


        items: [
            {xtype: 'label', text: 'PostID:', margin: '5 5 5 5'},
            {xtype: 'textfield', itemId: 'id', margin: '5 5 5 5'},

            {xtype: 'label', text: 'Title:', margin: '10 5 5 5'},
            {xtype: 'textfield', itemId: 'title', margin: '5 5 5 5', readOnly: true, flex: 1},

            {xtype: 'label', text: 'Content:', margin: '5 5 0 5'},
            {xtype: 'textarea', itemId: 'content', margin: '5 5 5 5'},

            {xtype: 'label', text: 'Category:', margin: '5 5 5 5'},
            {xtype: 'textfield', itemId: 'categoryID', margin: '5 5 5 5'}
        // ,
        // {xtype: 'label', text: 'User:', margin: '5 5 0 5'},
        // {xtype: 'textfield', itemId: 'userId', margin: '5 5 0 5'},
        // {xtype: 'label', text: 'CreatedDateTime:', margin: '5 5 0 5'},
        // {xtype: 'textfield', itemdId: 'createdDtimeId', margin: '5 5 0 5'},
        // {xtype: 'label', text: 'Comment:', margin: '5 5 5 5'},
        // {xtype: 'textfield', itemdId: 'commentId', margin: '5 5 0 5'}
        ]
    }]
});