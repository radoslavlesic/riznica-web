Ext.define("riznica.samplemodule.blog.model.Category", {
    extend:'Ext.data.Model',

    fields:[
        {name: 'id', type:'auto', defaultValue: null, allowNull: true},
        {name: 'name', type:'string', defaultValue: null, allowNull: true}
    ]
});