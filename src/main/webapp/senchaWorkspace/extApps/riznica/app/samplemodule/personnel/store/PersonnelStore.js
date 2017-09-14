Ext.define("riznica.samplemodule.personnel.store.PersonnelStore", {
    extend: "Ext.data.Store",

    alias: "store.samplemodule-personnel-store-PersonnelStore",
    model: 'riznica.samplemodule.personnel.model.Person',

    fields: ["name", "email", "phone"],
    autoLoad: true,
    autoSync: true,

    // data: {
    //   items: [
    //     { name: "Jean Luc", email: "jeanluc.picard@enterprise.com", phone: "555-111-1111" },
    //     { name: "Worf", email: "worf.moghsson@enterprise.com", phone: "555-222-2222" },
    //     { name: "Deanna", email: "deanna.troi@enterprise.com", phone: "555-333-3333" },
    //     { name: "Data", email: "mr.data@enterprise.com", phone: "555-444-4444" }
    //   ]
    // },

    proxy: {
        type: "ajax",
        api: {
            read: riznica.configuration.contextPath + "/api/person/list",
            write: riznica.configuration.contextPath + "/api/person/create"
        },
        reader: {
            type: "json",
            rootProperty: "data",
            totalProperty: "total"
        },

        writer: {
            type: 'json',
            writeAllFields: false,
            rootProperty: 'data'
        },
        actionMethods: { create: "POST", read: "POST", update: "POST", destroy: "POST" },
        paramsAsJson: true,
        simpleSortMode: true,
        sortParam: "sortBy",
        directionParam: "sortDirection"
    }
});
