Ext.define("riznica.user.view.UserModuleView", {
    extend: "Ext.tab.Panel",
    xtype: "UserModuleView",
    requires: [
        "Ext.layout.container.boxOverflow.None",
        "Ext.plugin.Responsive",
        "riznica.samplemodule.user.view.UserListView"
    ],

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
            title: "Home",
            iconCls: "fa-home",

            // The following grid shares a store with the modern version's grid as well.
            items: [
                {xtype: "UserListView"},
            ]
        }
    ]
});