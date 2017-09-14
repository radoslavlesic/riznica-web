Ext.define("riznica.samplemodule.blog.store.CommentStore", {
    extend: "Ext.data.Store",

    alias: "store.CommentStore",
    model: 'riznica.samplemodule.blog.model.Comment',

    // fields: ["user","content"],
    autoLoad: true,
    autoSync: true,

    proxy: {
        type: "ajax",
        api: {
            read: riznica.configuration.contextPath + "/api/comment/listByPostId",
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
