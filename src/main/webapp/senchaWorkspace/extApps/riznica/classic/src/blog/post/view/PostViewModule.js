Ext.define("riznica.blog.post.view.PostViewModule", {
  extend: "Ext.panel.Panel",
  xtype: "PostViewModule",
  itemId: 'postModule',
  requires: [
    "Ext.layout.container.boxOverflow.None",
    "Ext.plugin.Responsive",

    "riznica.blog.post.view.PostViewSingle",
    "riznica.blog.post.view.PostViewForm",
    "riznica.blog.post.view.PostViewFull",

    "riznica.blog.category.view.CategoryViewList",

    "riznica.blog.post.controller.PostViewController"
  ],
  controller: "PostViewController",
  items: [
    {
      xtype: 'panel',title: 'Posts',itemId: "dynamicPost",height: 750,autoScroll: true,
      // style: {'border':'1px solid #5FA2DD'},
      layout: {type: 'vbox',pack: 'start',align: 'stretch'
      },
      tools: [
        {
          type: 'refresh',text: 'Refresh',tooltip: 'Refresh',
          listeners: {
            click: function(thisEl) {
              thisEl.up("#postModule").getController().onClickRefresh(thisEl);
            }
          }
        }, {
          type: 'plus',text: 'Add',tooltip: 'Add new post',
          listeners: {
            click: function(thisEl) {
              thisEl.up("#postModule").getController().onClickAddNewPost();
            }
          }
        }
      ]
    }
  ]
});
