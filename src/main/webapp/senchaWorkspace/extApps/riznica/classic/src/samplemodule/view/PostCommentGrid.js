Ext.define("riznica.samplemodule.view.PostCommentGrid",{
    extend: 'Ext.grid.Panel',
    requires:[
        'riznica.samplemodule.blog.store.CommentStore'
    ],
    alias: 'widget.PostCommentGrid',
    itemId: 'PostCommentGrid',
    // title: 'Comment List',
    store: {
        type: 'CommentStore'
    },
    columns: [
        {text: 'User', dataIndex: 'user', flex: 0.15,
            renderer: function (value, metaData, record) {
                // alert(record.data.user.username);
                // console.log(record);
                return record.data.user.username;
            }
        },
        {text: 'Content', dataIndex: 'content', flex: 1}
    ]
});