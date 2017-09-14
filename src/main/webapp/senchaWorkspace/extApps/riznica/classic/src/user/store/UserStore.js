Ext.define("riznica.samplemodule.user.store.UserStore", {
    extend: "Ext.data.Store",

    alias: "store.UserStore",
    model: 'riznica.samplemodule.user.model.User',

    fields: ["id","username", "password", "enabled"],
    autoLoad: true,
    autoSync: true,
    proxy: {
        type: "ajax",
        api: {
            read: riznica.configuration.contextPath + "/api/user/list"
            // write: riznica.configuration.contextPath + "/api/user/create"
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