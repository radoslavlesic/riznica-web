Ext.define("riznica.blog.post.view.PostViewFull", {
  extend: 'Ext.panel.Panel',
  alias: 'widget.PostViewFull',
  requires: [
    "Ext.panel.Panel",
    "riznica.blog.comment.view.CommentViewForm",
    "riznica.blog.comment.view.CommentViewGrid"
  ],
  viewModel: {type: 'PostViewFullModel'},xtype: 'PostViewFull',layout: {type: 'vbox',pack: 'start',align: 'stretch'},
  maring: '5 5 5 5',
  items: [
    {xtype: 'textfield',margin: '5 5 5 5',fieldLabel: 'ID',itemId: 'postIdFull',
      readOnly: true, bind:{value:"{post.id}"}},
    {xtype: 'textfield',margin: '5 5 5 5',fieldLabel: 'Title',itemId: 'postTitle',
      readOnly: true, bind:{value:"{post.title}"}},
    {xtype: 'textarea',margin: '5 5 5 5',fieldLabel: 'Content',itemId: 'postContent',
      readOnly: true, bind:{value:"{post.content}"}},
    {xtype: 'textfield',margin: '5 5 5 5',fieldLabel: 'Author',itemId: 'postAuthor',
      readOnly: true, bind:{value:"{post.authorName}"}},
    {xtype: 'textfield',margin: '5 5 5 5',fieldLabel: 'Category',itemId: 'postCategory',
      readOnly: true},
    {xtype: 'panel',title: 'Comments',
      tools: [
        {xtype: 'button',iconCls: 'x-fa fa-plus',border: false,title: 'Add',tooltip: 'Add new comment',
          handler: function() {
            var config = {xtype: 'CommentViewForm',title: 'New comment'};
            var win = Ext.ComponentMgr.create(config);
            Ext.ComponentQuery.query('#commentArea')[0].focus(true);
          }
        }
      ],
      items: [{xtype: 'CommentViewGrid'}]
    }
  ]
});