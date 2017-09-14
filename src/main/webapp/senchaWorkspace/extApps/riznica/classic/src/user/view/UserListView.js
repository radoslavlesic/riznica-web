Ext.define("riznica.samplemodule.user.view.UserListView", {
    extend: "Ext.grid.Panel",
    xtype: "UserListView",

    requires: [
        "riznica.samplemodule.user.store.UserStore",
        "riznica.samplemodule.user.view.UserForm"
        // "riznica.samplemodule.user.view.UserViewController"
    ],
    frame: true,

    title: "Users",

    // controller: "UserViewController",

    store: {
        type: "UserStore"
    },

    columns: [
        { text: "ID", dataIndex: "id", width: 100 },
        { text: "Name", dataIndex: "username", width: 100 },
        { text: "Password", dataIndex: "password", width: 230 },
        { text: "Enabled", dataIndex: "enabled", width: 150 }
    ],
    tools:[
        {   xtype: 'button',
            title: 'Add',
            tooltip: 'Add new user',
            iconCls: 'x-fa fa-plus',
            border: false,
            handler: function () {
                var config = {
                    xtype: 'UserForm',
                    title: 'Add new user'
                };
                var win = Ext.ComponentMgr.create(config);

                Ext.ComponentQuery.query( '#username')[0].setValue(" ");

            }
        },
        {xtype: 'button', title: 'Edit', tooltip: 'Edit', iconCls: 'x-fa fa-pencil', border: false},
        {xtype: 'button', title: 'Delete', tooltip: 'Delete', iconCls: 'x-fa fa-trash', border: false}
    ]

    // listeners: {
    //     select: "onUserListItemSelected"
    // }
});
