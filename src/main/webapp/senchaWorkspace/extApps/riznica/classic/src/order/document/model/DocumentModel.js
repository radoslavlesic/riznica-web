Ext.define("riznica.order.document.model.DocumentModel", {
  extend: 'Ext.data.Model',

  fields:[
    { name: 'id', type: 'auto', defaultValue: null, allowNull: true },
    { name: 'name', type: 'string', defaultValue: null, allowNull: true },
    { name: 'path', type: 'string', defaultValue: null, allowNull: true },
    { name: 'image', type: 'auto', defaultValue: null, allowNull: true }
  ]
});