/**
 * This class is the main view for the application. It is specified in app.js as the "mainView" property. That setting automatically applies the "viewport" plugin causing this view to become the
 * body element (i.e., the viewport).
 */
Ext.define("riznica.samplemodule.view.SampleModuleView", {
    extend: "Ext.tab.Panel",
    xtype: "samplemodule-view-SampleModuleView",

    requires: [
        "Ext.layout.container.boxOverflow.None",
        "Ext.plugin.Responsive",
        "riznica.samplemodule.view.SampleModuleViewModel",
        "riznica.samplemodule.personnel.view.PersonnelListView"
    ],

    viewModel: {
        type: "samplemodule-view-SampleModuleViewModel"
    },

    ui: "navigation",

    tabBarHeaderPosition: 1,
    titleRotation: 0,
    tabRotation: 0, border: true,

    header: {
        layout: {
            align: "stretchmax"
        },
        title: {
            bind: {
                text: "{name}"
            },
            flex: 0
        },
        iconCls: "fa-th-list"
    },

    tabBar: {
        flex: 1,
        layout: {
            align: "stretch",
            overflowHandler: "none"
        }
    },

    responsiveConfig: {
        tall: {
            headerPosition: "top"
        },
        wide: {
            headerPosition: "left"
        }
    },

    defaults: {
        bodyPadding: 20,
        tabConfig: {
            plugins: "responsive",
            responsiveConfig: {
                wide: {
                    iconAlign: "left",
                    textAlign: "left"
                },
                tall: {
                    iconAlign: "top",
                    textAlign: "center",
                    width: 120
                }
            }
        }
    },

    items: [
        {
            title: "fsdfdsf",
            iconCls: "fa-home",

            // The following grid shares a store with the modern version's grid as well.
            items: [
                {xtype: "samplemodule-personnel-view-PersonnelListView"}

            ]
        }
        // ,
        // {
        //     title: "Personnel",
        //     iconCls: "fa-user",
        //     bind: {
        //         html: "{loremIpsum}"
        //     }
        // },
        // {
        //     title: "Groups",
        //     iconCls: "fa-users",
        //     bind: {
        //         html: "{loremIpsum}"
        //     }
        // },
        // {
        //     title: "Settings",
        //     iconCls: "fa-cog",
        //     bind: {
        //         html: "{loremIpsum}"
        //     }
        // }
    ]
});
