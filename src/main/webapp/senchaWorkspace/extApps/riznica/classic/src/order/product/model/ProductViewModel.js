Ext.define("riznica.order.product.model.ProductViewModel", {
  extend: 'Ext.data.Model',

  fields:[
    { name: 'id', type: 'auto', defaultValue: null, allowNull: true },
    { name: 'title', type: 'string', defaultValue: null, allowNull: true },
    { name: 'description', type: 'string', defaultValue: null, allowNull: true },
    { name: 'price', type: 'float', allowNull: false },
    { name: 'qty', type: 'float', allowNull: false },
    { name: 'image', type: 'auto', defaultValue: null, allowNull: true },
    { name: 'thumbnail', type: 'auto', defaultValue: null, allowNull: true }
  ]
  // ,
  // validators: {
  //   price:[
  //     {type: 'presence'}
  //   ]
  // }
});