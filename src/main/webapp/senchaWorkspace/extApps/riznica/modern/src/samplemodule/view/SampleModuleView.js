Ext.define("riznica.samplemodule.view.SampleModuleView", {
  extend: "Ext.tab.Panel",
  xtype: "samplemodule-view-SampleModuleView",

  requires: [
    "riznica.samplemodule.view.SampleModuleViewModel",
    "riznica.samplemodule.personnel.view.PersonnelListView"
  ],

  viewModel: {
    type: "samplemodule-view-SampleModuleViewModel"
  },

  defaults: {
    tab: {
      iconAlign: "top"
    },
    styleHtmlContent: true
  },

  tabBarPosition: "bottom",

  items: [
    {
      title: "Home",
      iconCls: "x-fa fa-home",
      layout: "fit",

      // The following grid shares a store with the classic version's grid as well.
      items: [
        { xtype: "samplemodule-personnel-view-PersonnelListView" }
      ]
    },
    {
      title: "Personnel",
      iconCls: "x-fa fa-user",
      bind: {
        html: "{loremIpsum}"
      }
    },
    {
      title: "Groups",
      iconCls: "x-fa fa-users",
      bind: {
        html: "{loremIpsum}"
      }
    },
    {
      title: "Settings",
      iconCls: "x-fa fa-cog",
      bind: {
        html: "{loremIpsum}"
      }
    }
  ]
});
