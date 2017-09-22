Ext.define("riznica.blog.category.view.CategoryViewModule", {
  extend: "Ext.tab.Panel",
  xtype: "blog-category-view-CategoryViewModule",

  requires: [
    "Ext.layout.container.boxOverflow.None",
    "Ext.plugin.Responsive",
    "riznica.blog.category.view.CategoryViewList"
  ],

  ui: "navigation",
  closable: true,
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
      iconCls: "x-fa fa-home ",
      items: [
        { xtype: "blog-category-view-CategoryViewList" }
      ]
    }
  ]
});
