Ext.define("riznica.blog.comment.view.CommentViewGrid", {
  extend: 'Ext.grid.Panel',
  requires: [
    'riznica.blog.store.CommentStore'
  ],
  alias: 'widget.CommentViewGrid',
  itemId: 'PostCommentGrid',
  store: {
    type: 'CommentStore'
  },
  columns: [
    {
      text: 'User', dataIndex: 'user', flex: 0.25,
      renderer: function(value, metaData, record) {
        return record.data.user.username;
      }
    },
    { text: 'Content', dataIndex: 'content', flex: 1 },
    {
      text: 'Created', dataIndex: 'dateCreated', flex: 0.5,
      renderer: function(value, field) {
        var date = new Date(value);
        var newVal = Ext.Date.format(date, 'd.m.Y H:i:s');
        return newVal;
      }
    }
  ],
  listeners:{
    cellclick: function(view, cellEl, colIdx, record, rowEl, rowIdx, event) {
      var commentForm = Ext.create('riznica.blog.comment.view.CommentViewForm');
      commentForm.getViewModel().data.comment = record.data;
      commentForm.show();
    }
  }
});