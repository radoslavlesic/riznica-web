Ext.define("riznica.blog.comment.model.CommentModel", {
    extend:'Ext.data.Model',

    fields:[
        {name: 'user', type:'auto', defaultValue: null, allowNull: true},
        {name: 'content', type:'string', defaultValue: null, allowNull: true},
        {name: 'dateCreated', type:'string', defaultValue: null, allowNull: true}
    ]
});