Ext.define("riznica.blog.post.controller.PostViewController", {
  extend: 'Ext.app.ViewController',
  alias: 'controller.PostViewController',

  onClickAddNewPost: function() {
    var config = {
      xtype: 'PostViewForm',
      mode: 'edit',
      title: 'Add new post'
    };
    var win = Ext.ComponentMgr.create(config);
    win.show();
    Ext.ComponentQuery.query('#postId')[0].setValue(-1);
    Ext.ComponentQuery.query('#postId')[0].hide();
    Ext.ComponentQuery.query('#postTitle')[0].focus();
  },

  onClickEditPost: function(item) {

    var edit = Ext.create('riznica.blog.post.view.PostViewForm');
    edit.getViewModel().data.post = item;
    edit.title = "Edit post";
    edit.show();
    // var config = {
    //   xtype: 'PostViewForm',
    //   mode: 'edit',
    //   title: 'Edit post'
    // };
    // var win = Ext.ComponentMgr.create(config);
    // win.show();
    // Ext.ComponentQuery.query('#postId')[0].setValue(item.id);
    // Ext.ComponentQuery.query('#postTitle')[0].setValue(item.title);
    // Ext.ComponentQuery.query('#postContent')[0].setValue(item.content);
    // Ext.ComponentQuery.query('#postCategory')[0].setValue(item.categoryId);
  },

  onClickRefresh: function() {

    Ext.ComponentQuery.query("#dynamicPost")[0].removeAll(true);

    grich.core.util.AjaxSubmitHelper.invokeRequest({
      url: riznica.configuration.contextPath + "/api/post/list",
      method: "POST",
      jsonData: null,
      maskComponents: Ext.ComponentQuery.query('#dynamicPost')[0],
      success: function(response, options, responseTextDecoded) {
        if (responseTextDecoded.success === true) {
          Ext.each(responseTextDecoded.data || [], function(item) {
            Ext.ComponentQuery.query("#dynamicPost")[0].add(
              {
                xtype: 'PostViewSingle',title: item.title,itemId: 'post' + item.id,margin: '5 5 5 5',
                style: { 'border': '1px solid #5FA2DD' },
                listeners: {
                  render: function(panel) {
                    // Ext.ComponentQuery.query('#postModule')[0].getController().onClickOpenPostFullView(panel, item);
                    Ext.ComponentQuery.query("#postModule")[0].getController().onClickOpenPostFullView(panel, item);
                  }
                },
                tools: [{
                  xtype: 'button',text: 'Delete',border: false,iconCls: 'x-fa fa-trash',tooltip: 'Delete',
                  handler: function() {
                    Ext.ComponentQuery.query("#postModule")[0].getController().onClickDeletePost(item);
                  }
                }, {
                  xtype: 'button',text: 'Edit',border: false,iconCls: 'x-fa fa-pencil',tooltip: 'Edit Post',
                  handler: function() {
                    Ext.ComponentQuery.query("#postModule")[0].getController().onClickEditPost(item);
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
          }, this);
        }
      }
    });

  },

  onClickOpenPostFullView: function(panel, item) {
    panel.body.on(
      'click', function() {

        // var postViewDetails = Ext.create('riznica.blog.post.view.PostViewFull');
        // // postViewDetails.title = 'Post View Details';
        // postViewDetails.getViewModel().data.post = item;

        var postViewDetails = Ext.create('riznica.blog.post.view.PostViewFull');
        postViewDetails.getViewModel().data.post = item;
        postViewDetails.title = item.title;
        postViewDetails.margin = '5 5 5 5';
        postViewDetails.tools = [{
          xtype: 'button',text: 'Edit', id: 'editPost',border: false,tooltip: 'Edit Post',iconCls: 'x-fa fa-pencil',
          handler: function() {
            Ext.ComponentQuery.query('#postModule')[0].getController().onClickEditPost(item);
          }
        },{
          xtype: 'button',text: 'Delete',border: false,iconCls: 'x-fa fa-trash',tooltip: 'Delete',
          handler: function() {
            Ext.ComponentQuery.query('#postModule')[0].getController().onClickDeletePost(item);
          }
        }
        ]

        Ext.ComponentQuery.query("#dynamicPost")[0].removeAll(true);
        Ext.ComponentQuery.query("#dynamicPost")[0].add(
          {xtype: postViewDetails});
        Ext.ComponentQuery.query('#postIdFull')[0].hide();

        Ext.ComponentQuery.query('#gridCategory')[0].getStore().each(function(rec) {
          if (item.categoryId == rec.get('id')) {
            Ext.ComponentQuery.query('#postCategory')[0].setValue(rec.get('name'));
          }
        });

        /* Load CommentStore by postId */
        Ext.ComponentQuery.query('#PostCommentGrid')[0].getStore().load({
          params: { post: item.id }
        });
      }
    );
  },

  onClickDeletePost: function(item) {

    grich.core.util.AjaxSubmitHelper.invokeRequest({
      url: riznica.configuration.contextPath + "/api/post/delete",
      method: "POST",
      maskComponents: Ext.ComponentQuery.query('#dynamicPost')[0],
      jsonData: { id: item.id },
      // scope: me,
      async: false,
      success: function(response, options, responseTextDecoded) {
        if (responseTextDecoded.success === true) {

          var notificationDescriptor = {
            notification: {
              severity: grich.core.util.NotificationUtils.NOTIFICATION_SEVERITY_INFO,
              titleText: "Post deleted!!!",
              contentText: "Success"
            }
          };

          grich.core.util.NotificationUtils.showSuccessNotification(notificationDescriptor);

          Ext.ComponentQuery.query('#dynamicPost')[0].removeAll(true);
          // grich.core.util.AjaxSubmitHelper.invokeRequest({
          //     url: riznica.configuration.contextPath + "/api/post/list",
          //     method: "POST",
          //     jsonData: null,
          //     maskComponents:Ext.ComponentQuery.query('#dynamicPost')[0],
          //     success: function (response, options, responseTextDecoded) {
          //         if (responseTextDecoded.success === true) {
          //
          //             Ext.each(responseTextDecoded.data || [], function(item) {
          //                 Ext.ComponentQuery.query('#dynamicPost')[0].add(
          //                     {   xtype: 'SinglePost',
          //                         title: item.title,
          //                         itemId: 'post'+item.id,
          //                         margin: '5 5 5 5',
          //                         style: {'border': '1px solid #5FA2DD'},
          //                         tools: [{
          //                             xtype: 'button',
          //                             text: 'Delete',
          //                             border: false,
          //                             iconCls: 'fa-trash',
          //                             tooltip: 'Delete',
          //                             handler: function () {
          //
          //                                 grich.core.util.AjaxSubmitHelper.invokeRequest({
          //                                     url: riznica.configuration.contextPath + "/api/post/delete",
          //                                     method: "POST",
          //                                     maskComponents: Ext.ComponentQuery.query('#dynamicPost')[0],
          //
          //                                     jsonData: {id:item.id},
          //                                     // scope: me,
          //                                     async: false,
          //                                     success: function(response, options, responseTextDecoded) {
          //                                         if (responseTextDecoded.success === true) {
          //
          //                                             var notificationDescriptor = {
          //                                                 notification: {
          //                                                     severity: grich.core.util.NotificationUtils.NOTIFICATION_SEVERITY_INFO,
          //                                                     titleText: "Post deleted!!!",
          //                                                     contentText: "Success"
          //                                                 }
          //                                             };
          //                                             grich.core.util.NotificationUtils.showSuccessNotification(notificationDescriptor);
          //
          //                                             Ext.ComponentQuery.query('#dynamicPost')[0].removeAll(true);
          //                                         }
          //                                     }
          //                                 });
          //                             }
          //                         }
          //
          //                         ]
          //                     });
          //                 Ext.ComponentQuery.query('#post'+item.id+' textfield')[0].setValue(item.id);
          //                 Ext.ComponentQuery.query('#post'+item.id+' textfield')[0].hide();
          //                 Ext.ComponentQuery.query('#post'+item.id+' label')[0].hide();
          //                 Ext.ComponentQuery.query('#post'+item.id+' textfield')[1].setValue(item.title);
          //                 Ext.ComponentQuery.query('#post'+item.id+' textfield')[2].setValue(item.content);
          //                 Ext.ComponentQuery.query('#gridCategory')[0].getStore().each(function (rec) {
          //                     if(item.categoryId==rec.get('id')){
          //                         Ext.ComponentQuery.query('#post'+item.id+' textfield')[3].setValue(rec.get('name'));
          //                     }
          //                 })
          //
          //             }, this);
          //         }
          //     }
          // });
        }
      }
    });
  },

  onClickDeletePost2: function(item) {
    grich.core.util.AjaxSubmitHelper.invokeRequest({
      url: riznica.configuration.contextPath + "/api/post/delete",
      method: "POST",
      maskComponents: Ext.ComponentQuery.query('#dynamicPost')[0],
      jsonData: { id: item.id },
      // scope: me,
      async: false,
      success: function(response, options, responseTextDecoded) {
        if (responseTextDecoded.success === true) {
          var notificationDescriptor = {
            notification: {
              severity: grich.core.util.NotificationUtils.NOTIFICATION_SEVERITY_INFO,
              titleText: "Post deleted!!!",
              contentText: "Success"
            }
          };
          grich.core.util.NotificationUtils.showSuccessNotification(notificationDescriptor);

          Ext.ComponentQuery.query('#dynamicPost')[0].removeAll(true);

          grich.core.util.AjaxSubmitHelper.invokeRequest({
            url: riznica.configuration.contextPath + "/api/post/list",
            method: "POST",
            jsonData: null,
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
                      tools: [{
                        xtype: 'button',
                        text: 'Delete',
                        border: false,
                        iconCls: 'x-fa fa-trash',
                        tooltip: 'Delete',
                        handler: function() {
                          grich.core.util.AjaxSubmitHelper.invokeRequest({
                            url: riznica.configuration.contextPath + "/api/post/delete",
                            method: "POST",
                            maskComponents: Ext.ComponentQuery.query('#dynamicPost')[0],
                            jsonData: { id: item.id },
                            // scope: me,
                            async: false,
                            success: function(response, options, responseTextDecoded) {
                              if (responseTextDecoded.success === true) {

                                var notificationDescriptor = {
                                  notification: {
                                    severity: grich.core.util.NotificationUtils.NOTIFICATION_SEVERITY_INFO,
                                    titleText: "Post deleted!!!",
                                    contentText: "Success"
                                  }
                                };
                                grich.core.util.NotificationUtils.showSuccessNotification(notificationDescriptor);

                                Ext.ComponentQuery.query('#dynamicPost')[0].removeAll(true);
                              }
                            }
                          });
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
    });
  }
});