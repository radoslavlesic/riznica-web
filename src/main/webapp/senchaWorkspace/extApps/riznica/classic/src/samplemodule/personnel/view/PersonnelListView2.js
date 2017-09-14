/**
 * This view is an example list of people.
 */
Ext.define("riznica.samplemodule.personnel.view.PersonnelListView2", {
    extend: "Ext.grid.Panel",
    itemId: "gridPerson",
    xtype: "samplemodule-personnel-view-PersonnelListView2",

    requires: [
        "riznica.samplemodule.personnel.store.PersonnelStore",
        "riznica.samplemodule.personnel.view.PersonnelViewController",
        "riznica.samplemodule.view.PersonEditView"
    ],
    title: "Person registry",

    frame: true,

    controller: "samplemodule-personnel-view-PersonnelViewController",

    store: {
        type: "samplemodule-personnel-store-PersonnelStore"
    },
    tools: [
        {
            type: 'plus',
            text: 'Add',
            tooltip: 'Add nesto',
            handler: function () {
                var config = {
                    xtype: 'SimpleForm',
                    mode: 'edit',
                    title: 'Add new record'
                    // ,
                    // editId: this.id
                };
                var win = Ext.ComponentMgr.create(config);

                // Ext.getCmp('#userName').focus();
                Ext.ComponentQuery.query('#userName')[0].focus();
                // win.show();
            }
        }],

    columns: [
        {text: "Name", dataIndex: "name"},
        {text: "Email", dataIndex: "email", flex: 1},
        {text: "Phone", dataIndex: "phone", flex: 1}
    ],

    listeners: {
        select: "onPersonnelListItemSelected",
        // cellclick: function(view, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        //     Ext.Msg.alert('Selected Record', 'Name : ' + record.get('name') + ' Email: ' + record.get('email'));
        // },
        itemdblclick: function(dv, record, item, index, e) {
            var config = {
                xtype: 'PersonEditView',
                mode: 'edit',
                title: 'Edit record'
                // ,
                // editId: this.id
            };

            var win = Ext.ComponentMgr.create(config);

            Ext.ComponentQuery.query('#userId')[0].setValue(record.data.id);
            Ext.ComponentQuery.query('#userName')[0].setValue(record.data.name);
            Ext.ComponentQuery.query('#userEmail')[0].setValue(record.data.email);
            Ext.ComponentQuery.query('#userPhone')[0].setValue(record.data.phone);
        }
    }
});
