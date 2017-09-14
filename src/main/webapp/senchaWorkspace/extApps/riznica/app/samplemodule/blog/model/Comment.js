Ext.define("riznica.samplemodule.blog.model.Comment", {
    extend:'Ext.data.Model',

    fields:[
        {name: 'user', type:'auto', defaultValue: null, allowNull: true},
        {name: 'content', type:'string', defaultValue: null, allowNull: true}
    ]
});