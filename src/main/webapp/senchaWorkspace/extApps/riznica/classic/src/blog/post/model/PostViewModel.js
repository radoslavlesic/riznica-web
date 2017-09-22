Ext.define("riznica.blog.post.model.PostViewModel", {
  extend: 'Ext.data.Model',

  fields: [
    { name: 'id', type: 'auto', defaultValue: null, allowNull: true },
    { name: 'title', type: 'string', defaultValue: null, allowNull: true },
    { name: 'content', type: 'string', defaultValue: null, allowNull: true }
  ]
});