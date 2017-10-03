Ext.define("riznica.blog.controller.BlogMainViewController", {
  extend: 'Ext.app.ViewController',
  alias: 'controller.BlogMainViewController',

  onChangeAuthor: function() {
    var rb1 = Ext.getCmp('rb1');
    if (rb1.getValue()) {
      Ext.ComponentQuery.query('#gridCategory')[0].hide();
      Ext.ComponentQuery.query('#searchContainer')[0].show();
      Ext.ComponentQuery.query('#searchCatPanel')[0].remove('datePanel', true);

      var filter = Ext.ComponentQuery.query('#filter')[0];
      filter.queryParam = 'authorName';
      filter.displayField = 'title';

      var store = Ext.ComponentQuery.query('#filter')[0].getStore();
      store.getProxy().api.read = riznica.configuration.contextPath + "/api/post/listByAuthor";
      store.load();
    }
  },
  onChangeTitle: function() {
    var rb2 = Ext.getCmp('rb2');
    if (rb2.getValue()) {
      Ext.ComponentQuery.query('#gridCategory')[0].hide();
      Ext.ComponentQuery.query('#searchContainer')[0].show();
      Ext.ComponentQuery.query('#searchCatPanel')[0].remove('datePanel', true);

      var filter = Ext.ComponentQuery.query('#filter')[0];
      filter.queryParam = 'title';
      filter.displayField = 'title';

      var store = Ext.ComponentQuery.query('#filter')[0].getStore();
      store.getProxy().api.read = riznica.configuration.contextPath + "/api/post/listByTitle";
      store.load();
    }
  },
  onChangeCategory: function() {
    var rb3 = Ext.getCmp('rb3');
    if (rb3.getValue()) {
      Ext.ComponentQuery.query('#gridCategory')[0].show();
      Ext.ComponentQuery.query('#searchContainer')[0].hide();
      Ext.ComponentQuery.query('#searchCatPanel')[0].remove('datePanel', true);
    }
  },
  onChangeDate: function() {
    var rb4 = Ext.getCmp('rb4');
    if (rb4.getValue()) {
      Ext.ComponentQuery.query('#gridCategory')[0].hide();
      Ext.ComponentQuery.query('#searchContainer')[0].hide();
      Ext.ComponentQuery.query('#searchCatPanel')[0].add(
        {
          xtype: 'panel',
          itemId: 'datePanel',
          // width: 150,
          margin: '5 5 5 5',
          layout: {
            type: 'vbox',
            pack: 'start',
            align: 'stretch'
          },
          // flex: 0.5,
          items: [
            {
              xtype: 'datefield',
              fieldLabel: 'Od',
              itemId: 'dateFrom',
              labelStyle: 'width:40px',
              // anchor: '100%',
              name: 'from_date'
            }, {
              xtype: 'datefield',
              fieldLabel: 'Do',
              itemId: 'dateTo',
              labelStyle: 'width:40px',
              // anchor: '100%',
              name: 'to_date'
            }, {
              xtype: 'button',
              text: 'Search',
              iconCls: 'x-fa fa-search',
              listeners: {
                click: function() {
                  var dateFrom = Ext.ComponentQuery.query('#dateFrom')[0].getValue();
                  dateFrom.setTime(dateFrom.getTime() - dateFrom.getTimezoneOffset() * 60 * 1000);
                  var dateTo = Ext.ComponentQuery.query('#dateTo')[0].getValue();
                  dateTo.setTime(dateTo.getTime() - dateTo.getTimezoneOffset() * 60 * 1000);

                  console.log("dateFrom: " + dateFrom + " dateTo: " + dateTo);

                  Ext.ComponentQuery.query('#dynamicPost')[0].removeAll(true);
                  grich.core.util.AjaxSubmitHelper.invokeRequest({
                    url: riznica.configuration.contextPath + "/api/post/listByDate",
                    method: "POST",
                    jsonData: { dateFrom: dateFrom, dateTo: dateTo },

                    maskComponents: Ext.ComponentQuery.query('#dynamicPost')[0],
                    success: function(response, options, responseTextDecoded) {
                      if (responseTextDecoded.success === true) {

                        Ext.each(responseTextDecoded.data || [], function(item) {
                          Ext.ComponentQuery.query('#dynamicPost')[0].add(
                            {
                              xtype: 'PostViewSingle',
                              title: item.title,
                              itemId: 'post' + item.id,
                              margin: '5 5 5 5',
                              style: { 'border': '1px solid #5FA2DD' },
                              listeners: {
                                render: function(panel) {
                                  Ext.ComponentQuery.query('#postModule')[0].getController().onClickOpenPostFullView(panel, item);
                                }
                              },
                              tools: [{
                                xtype: 'button',
                                text: 'Delete',
                                border: false,
                                iconCls: 'x-fa fa-trash',
                                tooltip: 'Delete',
                                handler: function() {
                                  Ext.ComponentQuery.query('#postModule')[0].getController().onClickDeletePost(item);
                                }
                              }, {
                                xtype: 'button',
                                text: 'Edit',
                                border: false,
                                tooltip: 'Edit Post',
                                iconCls: 'x-fa fa-pencil',
                                handler: function() {
                                  Ext.ComponentQuery.query('#postModule')[0].getController().onClickEditPost(item);
                                }
                              }
                              ]
                            });

                          Ext.ComponentQuery.query('#post' + item.id + ' textfield')[0].setValue(item.id);
                          Ext.ComponentQuery.query('#post' + item.id + ' textfield')[0].hide();
                          Ext.ComponentQuery.query('#post' + item.id + ' label')[0].hide();
                          Ext.ComponentQuery.query('#post' + item.id + ' textfield')[1].setValue(item.title);

                          /* Content label and field*/
                          Ext.ComponentQuery.query('#post' + item.id + ' label')[2].hide();
                          Ext.ComponentQuery.query('#post' + item.id + ' textfield')[2].hide();

                          /* Category label land field*/
                          Ext.ComponentQuery.query('#post' + item.id + ' label')[3].hide();
                          Ext.ComponentQuery.query('#post' + item.id + ' textfield')[3].hide();

                          // Ext.ComponentQuery.query('#post'+item.id+' textfield')[0].setValue(item.id);
                          // Ext.ComponentQuery.query('#post'+item.id+' textfield')[0].hide();
                          // Ext.ComponentQuery.query('#post'+item.id+' label')[0].hide();
                          // Ext.ComponentQuery.query('#post'+item.id+' textfield')[1].setValue(item.title);
                          // Ext.ComponentQuery.query('#post'+item.id+' textfield')[2].setValue(item.content);
                          // Ext.ComponentQuery.query('#gridCategory')[0].getStore().each(function (rec) {
                          //     if(item.categoryId==rec.get('id')){
                          //         Ext.ComponentQuery.query('#post'+item.id+' textfield')[3].setValue(rec.get('name'));
                          //     }
                          // })

                        }, this);
                      }
                    }
                  });
                }
              }
            }]
        }
      );
    }
  },
  onComboSearch: function(combo, records, eOpts) {

    var postViewDetails = Ext.create('riznica.blog.post.view.PostViewFull');
    postViewDetails.getViewModel().data.post = records.data;
    postViewDetails.title = records.data.title;
    postViewDetails.margin = '5 5 5 5';
    postViewDetails.tools = [{
      xtype: 'button',text: 'Edit', id: 'editPost',border: false,tooltip: 'Edit Post',iconCls: 'x-fa fa-pencil',
        handler: function() {
          Ext.ComponentQuery.query('#postModule')[0].getController().onClickEditPost(records.data);
        }
      },{
      xtype: 'button',text: 'Delete',border: false,iconCls: 'x-fa fa-trash',tooltip: 'Delete',
        handler: function() {
          Ext.ComponentQuery.query('#postModule')[0].getController().onClickDeletePost(records.data);
        }
      }
    ]

    Ext.ComponentQuery.query("#dynamicPost")[0].removeAll(true);


    Ext.ComponentQuery.query("#dynamicPost")[0].add(
      {xtype: postViewDetails});
    // Ext.ComponentQuery.query("#dynamicPost")[0].addTool(
    //   {xtype: 'button',text: 'Edit',id: 'editPost',border: false,tooltip: 'Edit Post',iconCls: 'x-fa fa-pencil',
    //     handler: function() {
    //       Ext.ComponentQuery.query('#postModule')[0].getController().onClickEditPost(records.data);
    //     }
    //   }
    // );

    Ext.ComponentQuery.query('#postIdFull')[0].hide();

    Ext.ComponentQuery.query('#gridCategory')[0].getStore().each(function(rec) {
      if (records.data.categoryId == rec.get('id')) {
        Ext.ComponentQuery.query('#postCategory')[0].setValue(rec.get('name'));
      }
    });

    /* Load CommentStore by postId */
    Ext.ComponentQuery.query('#PostCommentGrid')[0].getStore().load({
      params: { post: records.data.id }
    });
  }
});