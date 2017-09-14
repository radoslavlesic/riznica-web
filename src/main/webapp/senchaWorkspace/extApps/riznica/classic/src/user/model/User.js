Ext.define("riznica.samplemodule.user.model.User", {
    extend:'Ext.data.Model',

    fields:[
        {name: 'id', type:'auto', defaultValue: null, allowNull: true},
        {name: 'username', type:'string', defaultValue: null, allowNull: true},
        {name: 'password', type: 'string', defaultValue: null, allowNull: true},
        {name: 'enabled', type: 'string', defaultValue: null, allowNull: true}
    ]
});