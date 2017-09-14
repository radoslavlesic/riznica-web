Ext.define("riznica.samplemodule.blog.store.PostStore", {
    extend: "Ext.data.Store",

    alias: "store.samplemodule-blog-store-PostStore",
    model: 'riznica.samplemodule.blog.model.Post',

    fields: ["id", "title", "content"],
    autoLoad: true,
    autoSync: true,

    proxy: {
        type: "ajax",
        api: {
            read: riznica.configuration.contextPath + "/api/post/list",
            write: riznica.configuration.contextPath + "/api/post/create"
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
