Ext.define("riznica.order.OrderViewMain", {
  extend: "Ext.tab.Panel",
  xtype: "OrderViewMain",
  alias: "widget.OrderViewMain",
  require: [
    "riznica.order.product.view.ProductViewMain",
    "Ext.layout.container.Column",
    "Ext.layout.container.Table"
  ],
  // frame: true,
  itemId: 'OrderViewMain',
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
    bodyPadding: 5,
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
      title: "Home", iconCls: "fa-home", layout: 'border', maximizable: true,
      defaults: {
        xtype: 'panel',height: 360
      },
      items: [
        {
          xtype: 'panel',
          // flex: 0.5,
          width: 180,
            // height: 150,
          layout: 'vbox',
          split: true,
          region: 'west',
          items: [
            {title: 'Search', html: 'Search',width: 180},
            {xtype: 'OrderCategoryViewModule'},
            {title: 'Special Products', collapsible: true,html: 'Special Products',width: 180},
            {title: 'Bestsellers', collapsible: true,html: 'Bestsellers',width: 180, margin: '5 0 5 0'}
          ]
        },
        {xtype: 'ProductViewMain', region: 'center'}
      ]
    }
  ]
});
