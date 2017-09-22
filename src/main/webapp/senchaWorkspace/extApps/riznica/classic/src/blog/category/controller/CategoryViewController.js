Ext.define("riznica.blog.category.controller.CategoryViewController", {
  extend: 'Ext.app.ViewController',
  alias: 'controller.CategoryViewController',

  addNewCategory: function() {
    var config = {
      xtype: 'CategoryViewForm',
      mode: 'edit',
      title: 'Add new category'
    };
    var win = Ext.ComponentMgr.create(config);

    Ext.ComponentQuery.query('#catId')[0].setValue(-1);
    Ext.ComponentQuery.query('#catId')[0].hide();

    Ext.ComponentQuery.query('#catName')[0].focus(true);
  },

  onCategorySelect: function(grid, record) {
    var data = record.data;
    data.category = record.data.id;
    delete data.class;

    Ext.ComponentQuery.query('#dynamicPost')[0].removeAll(true);

    grich.core.util.AjaxSubmitHelper.invokeRequest({
      url: riznica.configuration.contextPath + "/api/post/listByCatId",
      method: "POST",
      maskComponents: { component: Ext.ComponentQuery.query('#dynamicPost')[0] },
      jsonData: Ext.util.JSON.encode(data),
      success: function(response, options, responseTextDecoded) {
        if (responseTextDecoded.success === true) {

          Ext.each(responseTextDecoded.data || [], function(item) {
            Ext.ComponentQuery.query('#dynamicPost')[0].add(
              {
                xtype: 'PostViewSingle',title: item.title,itemId: 'post' + item.id,margin: '5 5 5 5',
                style: {'border': '1px solid #5FA2DD'},
                listeners: {
                  render: function(panel) {
                    Ext.ComponentQuery.query('#postModule')[0].getController().onClickOpenPostFullView(panel, item);
                  }
                },
                tools: [{
                  xtype: 'button',text: 'Delete',border: false,tooltip: 'Delete post',iconCls: 'x-fa fa-trash',
                  handler: function() {
                    Ext.ComponentQuery.query('#postModule')[0].getController().onClickDeletePost2(item);
                  }
                }, {
                  xtype: 'button',text: 'Edit',border: false,iconCls: 'x-fa fa-pencil',
                  handler: function() {
                    Ext.ComponentQuery.query('#postModule')[0].getController().onClickEditPost(item);
                  }
                }
                ]
              });

            Ext.ComponentQuery.query('#post' + item.id + ' textfield')[0].setValue(item.id);
            Ext.ComponentQuery.query('#post' + item.id + ' textfield')[0].hide();
            Ext.ComponentQuery.query('#post' + item.id + ' label')[0].hide();
            /* Title textfield */
            Ext.ComponentQuery.query('#post' + item.id + ' textfield')[1].setValue(item.title);

            /* Content label and field*/
            Ext.ComponentQuery.query('#post' + item.id + ' label')[2].hide();
            Ext.ComponentQuery.query('#post' + item.id + ' textfield')[2].hide();

            /* Category label land field*/
            Ext.ComponentQuery.query('#post' + item.id + ' label')[3].hide();
            Ext.ComponentQuery.query('#post' + item.id + ' textfield')[3].hide();

            // Ext.ComponentQuery.query('#gridCategory')[0].getStore().each(function (rec) {
            //     //console.log("neka kategoria: "+rec.get('name'));
            //     if(item.categoryId==rec.get('id')){
            //         Ext.ComponentQuery.query('#post'+item.id+' textfield')[3].setValue(rec.get('name'));
            //     }
            // });
            // Ext.ComponentQuery.query('#post'+item.id+' textfield')[3].setValue(item.categoryId);

          }, this);
        }
      }
    });
  },

  onRightClick: function(tree, record, item, index, e, eOpts) {
    var menu_grid = new Ext.menu.Menu({
      items:
        [
          {
            text: 'Edit', iconCls: 'x-fa fa-floppy-o',
            handler: function() {
              var editCategory = Ext.create('riznica.blog.category.view.CategoryViewForm');
              editCategory.title = "Edit category";
              editCategory.getViewModel().data.category = record.data;
              editCategory.show();
              Ext.ComponentQuery.query('#catName')[0].focus(true);
            }
          }, {
          text: 'Delete',
          iconCls: 'x-fa fa-trash',
          handler: function() {
            Ext.Msg.confirm("Confirm", "Are you sure?", function(choice) {
              if (choice === "yes") {

                var me = Ext.ComponentQuery.query('#gridCategory')[0];
                var data = record.data;
                delete data.class;

                grich.core.util.AjaxSubmitHelper.invokeRequest({
                  url: riznica.configuration.contextPath + "/api/category/delete",
                  method: "POST",
                  jsonData: Ext.util.JSON.encode(data),
                  scope: me,
                  async: false,
                  success: function(response, options, responseTextDecoded) {
                    if (responseTextDecoded.success === true) {
                      var notificationDescriptor = {
                        notification: {
                          severity: grich.core.util.NotificationUtils.NOTIFICATION_SEVERITY_INFO,
                          titleText: "Category deleted!!!",
                          contentText: "Success"
                        }
                      };
                      grich.core.util.NotificationUtils.showSuccessNotification(notificationDescriptor);

                      Ext.ComponentQuery.query('#gridCategory')[0].getStore().load();
                      Ext.ComponentQuery.query('#dynamicPost')[0].removeAll(true);
                    }
                  }
                });

              }
            });
          }
        }
        ]
    });
    // HERE IS THE MAIN CHANGE
    var position = [e.getX() - 10, e.getY() - 10];
    e.stopEvent();
    menu_grid.showAt(position);

  }

});