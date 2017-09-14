/**
 * This class is the main view for the application. It is specified in app.js as the "mainView" property. That setting causes an instance of this class to be created and added to the Viewport
 * container.
 */
Ext.define("riznica.main.view.MainView", {
    extend: "Ext.Container",
    xtype: "main-view-MainView",

    requires: [
        "riznica.samplemodule.view.SampleModuleView"
    ],

    layout: "fit",

    items: [
        {xtype: "samplemodule-view-SampleModuleView"}
    ]
});
