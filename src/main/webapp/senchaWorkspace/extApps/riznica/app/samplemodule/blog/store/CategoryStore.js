Ext.define("riznica.samplemodule.blog.store.CategoryStore", {
    extend: "Ext.data.Store",

    alias: "store.samplemodule-blog-store-CategoryStore",
    model: 'riznica.samplemodule.blog.model.Category',

    // pageSize: 2,

    fields: ["id", "name"],
    autoLoad: true,
    autoSync: true,
    remoteFilter: false,
    remoteSort: false,
    proxy: {
        type: "ajax",
        api: {
            read: riznica.configuration.contextPath + "/api/category/list",
            write: riznica.configuration.contextPath + "/api/category/create"
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
