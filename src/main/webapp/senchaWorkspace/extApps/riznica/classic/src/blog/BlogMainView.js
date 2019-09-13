Ext.define("riznica.blog.BlogViewMain", {
  extend: "Ext.tab.Panel",
  xtype: "BlogViewMain",

  requires: [
    "Ext.layout.container.boxOverflow.None",
    "Ext.plugin.Responsive",
    "riznica.blog.category.view.CategoryViewList",
    "riznica.blog.post.view.PostViewModule",
    "riznica.blog.controller.BlogMainViewController",
    "riznica.blog.store.PostStore"
  ],

  itemId: 'BlogViewMain',
  ui: "navigation",
  controller: "BlogMainViewController",
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
      title: "Home", iconCls: "fa-home", layout: 'hbox',
      items: [
        {
          xtype: 'panel',itemId: 'searchCatPanel',title: 'Search and Categories',style: {'border': '1px solid #5FA2DD'},
          layout: { type: 'vbox', pack: 'start', align: 'stretch' },flex: 0.5,
          items: [
            {
              xtype: 'fieldcontainer',itemId: 'filterContainer',labelStyle: 'width:40px',fieldLabel: 'Filter',
              title: 'filter',
              margin: '5 5 5 5',padding: '5 5 5 5',defaultType: 'radiofield',defaults: { flex: 0.5 },layout: 'vbox',
              items: [
                {
                  boxLabel: 'Autor', inputValue: 'Autor', margin: '0', id: 'rb1', name: 'rbGroup', checked: false,
                  listeners: {
                    change: function() {
                      Ext.ComponentQuery.query('#BlogViewMain')[0].getController().onChangeAuthor();
                    }
                  }
                }, {
                  boxLabel: 'Naslov', inputValue: 'Naslov', margin: '0', id: 'rb2', name: 'rbGroup', checked: true,
                  listeners: {
                    change: function() {
                      Ext.ComponentQuery.query('#BlogViewMain')[0].getController().onChangeTitle();
                    }
                  }
                }, {
                  boxLabel: 'Kategorija',inputValue: 'Kategorija',margin: '0',id: 'rb3',name: 'rbGroup',checked: false,
                  listeners: {
                    change: function() {
                      Ext.ComponentQuery.query('#BlogViewMain')[0].getController().onChangeCategory();
                    }
                  }
                },
                {
                  boxLabel: 'Datum', inputValue: 'Datum', margin: '0', id: 'rb4', name: 'rbGroup', checked: false,
                  listeners: {
                    change: function() {
                      Ext.ComponentQuery.query('#BlogViewMain')[0].getController().onChangeDate();
                    }
                  }
                }
              ]
            },
            {
              xtype: 'fieldcontainer',itemId: 'searchContainer',layout: {type: 'hbox', pack: 'start', align: 'stretch'},
              margin: '5 5 5 5',
              items: [
                {
                  xtype: 'combo',anchor: '100%',fieldLabel: '',iconCls: 'x-fa fa-search',flex: 1,hideTrigger: true,
                  displayField: 'title',minChars: 3,
                  store: { type: "samplemodule-blog-store-PostStore" },queryParam: 'title',queryMode: 'remote',
                  typeAhead: true,forceSelection: true,itemId: 'filter',
                  listeners: {
                    select: function(combo, records, eOpts) {
                      Ext.ComponentQuery.query('#BlogViewMain')[0].getController().onComboSearch(combo, records, eOpts);
                    }
                  }
                }
              ]
            }, { xtype: "blog-category-view-CategoryViewList", title: 'Categories', hidden: true, frame: false }
          ]
        }, {
          xtype: 'PostViewModule', margin: '0 0 5 5', flex: 1.5, style: { 'border': '1px solid #5FA2DD' }
        }
      ]
    }
  ]
});
