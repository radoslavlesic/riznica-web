Ext.define("riznica.blog.post.view.PostViewSingle", {
  extend: 'Ext.panel.Panel',
  alias: 'widget.PostViewSingle',
  viewModel: {type: 'PostViewFullModel'},
  items: [{
    xtype: 'panel',
    layout: { type: 'hbox', pack: 'start', align: 'stretch' },
    items: [
      { xtype: 'label', text: 'PostID:', margin: '5 5 5 5' ,hideLabel: true,
        hidden : true},
      { xtype: 'textfield', itemId: 'id', margin: '5 5 5 5' ,hideLabel: true,
        hidden : true},

      { xtype: 'label', text: 'Title:', margin: '10 5 5 5' },
      { xtype: 'textfield', itemId: 'title', margin: '5 5 5 5', bind: {value:'{post.title}'},readOnly: true, flex: 1 },

      { xtype: 'label', text: 'Content:', margin: '5 5 0 5' ,hideLabel: true,
        hidden : true},
      { xtype: 'textarea', itemId: 'content', margin: '5 5 5 5' ,bind: {value:'{post.content}'},hideLabel: true,
        hidden : true},

      { xtype: 'label', text: 'Category:', margin: '5 5 5 5' ,hideLabel: true,
        hidden : true},
      { xtype: 'textfield', itemId: 'categoryID', margin: '5 5 5 5' ,hideLabel: true,
        hidden : true}

      // {xtype: 'label', text: 'User:', margin: '5 5 0 5'},
      // {xtype: 'textfield', itemId: 'userId', margin: '5 5 0 5'},
      // {xtype: 'label', text: 'CreatedDateTime:', margin: '5 5 0 5'},
      // {xtype: 'textfield', itemdId: 'createdDateId', margin: '5 5 0 5'},
      // {xtype: 'label', text: 'Comment:', margin: '5 5 5 5'},
      // {xtype: 'textfield', itemdId: 'commentId', margin: '5 5 0 5'}
    ]
  }]
});