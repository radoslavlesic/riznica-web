Ext.define("riznica.blog.store.PostStore", {
    extend: "Ext.data.Store",

    alias: "store.samplemodule-blog-store-PostStore",
    model: 'riznica.blog.post.model.PostViewModel',
    storeId: 'post',
    fields: ["id", "title", "content"],
    autoLoad: false,
    autoSync: true,
    remoteFilter: false,
    proxy: {
        type: "ajax",
        api: {
            read: riznica.configuration.contextPath + "/api/post/listByTitle",
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
        actionMethods: { create: "POST", read: "GET", update: "POST", destroy: "POST" },
        paramsAsJson: true,
        simpleSortMode: true,
        sortParam: "sortBy",
        directionParam: "sortDirection"
    }
});
