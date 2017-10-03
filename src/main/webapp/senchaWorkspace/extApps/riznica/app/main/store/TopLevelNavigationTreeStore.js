Ext.define('riznica.main.store.TopLevelNavigationTreeStore', {
  extend: 'Ext.data.TreeStore',
  storeId: 'main.store.TopLevelNavigationTreeStore',
  require: [

    "riznica.order.OrderViewMain",
    "riznica.blog.BlogViewMain"
  ],

  constructor: function(config) {
    var me = this;

    //noinspection UnknownClassInspection
    config.root = {
      expanded: true,
      children: [
        // {
        //     text: 'Demo', topLevelRouteId: 'riznica', iconCls: 'x-fa fa-search', leaf: true,
        //     viewConfig: {xtype: 'samplemodule-view-SampleModuleView'}
        // },
        {
          text: 'User', topLevelRouteId: 'user', iconCls: 'x-fa fa-search', leaf: true,
          viewConfig: { xtype: 'UserModuleView', margin: '5 5 5 5' }
        },
        {
          text: 'Person', topLevelRouteId: 'person', iconCls: 'x-fa fa-search', leaf: true,
          viewConfig: { xtype: 'samplemodule-view-SampleModuleView2' }
        },
        {
          text: 'Category', topLevelRouteId: 'categ', iconCls: 'x-fa fa-search', leaf: true,
          viewConfig: { xtype: 'blog-category-view-CategoryViewModule' }
        }, {
          text: 'Blog', topLevelRouteId: 'blog', iconCls: 'x-fa fa-search', leaf: true,
          viewConfig: { xtype: 'BlogViewMain' }
        }
        ,{
            text: 'Order', topLevelRouteId: 'order', iconCls: 'x-fa fa-search', leaf: true,
            viewConfig: {xtype: 'OrderViewMain', margin: '5 5 5 5'}
        }
      ]
    };

    me.callParent([config]);
  }
});