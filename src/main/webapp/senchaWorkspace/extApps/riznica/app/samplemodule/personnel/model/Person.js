Ext.define("riznica.samplemodule.personnel.model.Person", {
    extend:'Ext.data.Model',

    fields:[
        {name: 'id', type:'auto', defaultValue: null, allowNull: true},
        {name: 'name', type:'string', defaultValue: null, allowNull: true},
        {name: 'email', type: 'string', defaultValue: null, allowNull: true},
        {name: 'phone', type: 'string', defaultValue: null, allowNull: true}
    ]
});