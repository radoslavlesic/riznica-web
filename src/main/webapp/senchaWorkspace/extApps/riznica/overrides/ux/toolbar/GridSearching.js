Ext.define('Ext.overrides.ux.toolbar.GridSearching', {
  override: 'Ext.ux.toolbar.GridSearching',

  // ----- feature 001 - start
  // This feature adds flexible positioning of a GridSearching component into a toolbar. There are few options now.
  //
  // First, in components list, user can specify the 'gridSearching' placeholder. This placeholder designates position in the toolbar where searching components will be placed. For this to work,
  // position property of grid searching toolbar must be set to 'placeholder':
  //
  //     someGrid.addDocked({
  //         dock: 'top', xtype: 'gridsearchingbar', grid: someGrid, ....
  //         position: 'placeholder'
  //     });
  //
  // Second option is to specify itemsBefore and itemsAfter arrays, where items that should be placed to the left of grid searching toolbar goes into itemsBefore array, while other items goes into
  // itemsAfter array.
  //
  // Implementation note: this override actually deprecates (since it is not used any more) addCustomComponents() method from original class.
  // -----
  itemsBefore: [],
  itemsAfter: [],

  initComponent: function() {
    var userAndSearchingItems = [];
    var gridSearchingOwnItemsAdded = false;
    var userItems;
    var i, userItem;

    this.menu = Ext.create('Ext.menu.Menu');

    this.field = Ext.create('Ext.form.TwinTriggerField', {
      width           : this.inputWidth,
      trigger1Cls     : 'x-form-clear-trigger',
      trigger2Cls     : 'x-form-search-trigger',
      onTrigger1Click : Ext.bind(this.onTriggerClear, this),
      onTrigger2Click : Ext.bind(this.onTriggerSearch, this),
      minLength       : this.minLength
    });

    if (Ext.isEmpty(this.itemsBefore) === false) {
      userAndSearchingItems = userAndSearchingItems.concat(this.itemsBefore);

      gridSearchingOwnItemsAdded = true;
      userAndSearchingItems = userAndSearchingItems.concat(this.getGridSearchingItems());
    }

    if (Ext.isEmpty(this.itemsAfter) === false) {
      if (gridSearchingOwnItemsAdded === false) {
        gridSearchingOwnItemsAdded = true;
        userAndSearchingItems = userAndSearchingItems.concat(this.getGridSearchingItems());
      }

      userAndSearchingItems = userAndSearchingItems.concat(this.itemsAfter);
    }

    if (gridSearchingOwnItemsAdded) {
      this.items = userAndSearchingItems;
    }
    else {
      userAndSearchingItems = [];
      userItems = this.items || [];
      this.items = [];

      switch(this.position) {
        case 'last':
          userAndSearchingItems = userAndSearchingItems.concat(userItems);
          userAndSearchingItems = userAndSearchingItems.concat(this.getGridSearchingItems());
          break;

        case 'placeholder':
          for (i = 0; i < userItems.length; i++) {
            userItem = userItems[i];
            if (userItem === 'gridSearching') {
              userAndSearchingItems = userAndSearchingItems.concat(this.getGridSearchingItems());
            }
            else {
              userAndSearchingItems.push(userItem);
            }
          }

          break;

        default: // 'first' and everything else
          userAndSearchingItems = userAndSearchingItems.concat(this.getGridSearchingItems());
          userAndSearchingItems = userAndSearchingItems.concat(userItems);
          break;
      }

      this.items = userAndSearchingItems;
    }

    Ext.ux.toolbar.GridSearching.superclass.initComponent.call(this, arguments);
  },

  getGridSearchingItems: function() {
    var gridSearchingOwnItems = [];

    if (true === this.hideMenu) {
      gridSearchingOwnItems.push(this.field);
    }
    else if ('right' === this.menuPosition) {
      gridSearchingOwnItems.push(this.field);
      gridSearchingOwnItems.push('-');
      gridSearchingOwnItems.push(this.getMenuButton());
    }
    else {
      gridSearchingOwnItems.push(this.getMenuButton());
      gridSearchingOwnItems.push('-');
      gridSearchingOwnItems.push(this.field);
    }

    return gridSearchingOwnItems;
  },
  // ----- feature 001 - end


  // ----- feature 002 - start
  // Search menu button designates fields whose names will be sent to the server when issuing remote search request. In normal setup that names are equal to related column dataIndex, where dataIndex
  // represents the name of a field in the grid's store model definition.
  //
  // However, in some more complex scenarios, i.e. when grid column renders a computed value, sending simple field name (dataIndex) might not be enough. Fortunately, Ext JS predicted similar scenario
  // for sorting grids. Each grid column has a getSortParam() method which is used to acquire sorting parameter string which is sent to the server when requesting remote sorting. In default
  // implementation, getSortParam() returns column dataIndex (or simple field name from a method) which is very fortunate since we can use (and possibly override) that method as a simple replacement
  // for column.dataIndex expression.
  //
  // When we render some computed value, we probably want to send customized sorting param to the server. This is where getSortParam() method jumps in, allowing us to configure sort param string as
  // appropriate for particular situation. On the other hand, if our situation is simple, and we just want to use dataIndex, default implementation of getSortParam() will return dataIndex.
  //
  // Completely analog is situation with sending field names for searching. If we have more complex scenario, than we will want to send customized param instead of simple dataIndex value.
  // Therefore, this feature, by default, uses column getSortParam() method to determine "field name" for which search should be made. Accessing getSortParam() is encapsulated in standalone
  // getSearchParamForColumn() method, which allows for simple overriding if we need even more customization for some particular case.
  // -----
  // Menu creation function
  populateMenu: function(){
    var lastRemoteGridSearchingOptions;
    if (!this.grid) {
      this.grid = this.up('grid');
    }

    lastRemoteGridSearchingOptions = this.grid.store.lastRemoteGridSearchingOptions;

    if (lastRemoteGridSearchingOptions && this.isColumnConfigurationSame(this.grid.getColumns(), lastRemoteGridSearchingOptions[this.jsonNames.fields])) {
      this.checkIndexes = lastRemoteGridSearchingOptions[this.jsonNames.fields];
    }

    // remove old items
    this.menu.removeAll();

    // add Select All item plus separator
    if(this.showSelectAll && 'radio' !== this.menuStyle) {
      var selectAllFn = function(item) {
        var checked = item.checked;
        item.parentMenu.items.each(function(i) {
          if(item !== i && i.setChecked && !i.disabled) {
            i.setChecked(checked);
          }
        });
      };

      var selectAll = {
        xtype       : 'menucheckitem',
        text        : this.selectAllText,
        checked     : 'all' === this.checkItems,
        hideOnClick : false,
        handler     : selectAllFn,
        itemId      : 'selectAll'
      };

      this.menu.add(selectAll, '-');
    }

    // add new items
    var columns = this.grid.getColumns();

    var group = undefined;

    if('radio' === this.menuStyle) {
      group = 'g' + (new Date).getTime();
    }

    // adding not disabled items
    Ext.each(columns, function(column) {
      var disable = false;
      if(column.text && column.text != '&#160;' && column.dataIndex && column.dataIndex != '') {
        Ext.each(this.disableIndexes, function(item) {
          disable = disable ? disable : item === column.dataIndex;
        });

        if(!disable) {
          var deselectAllFn = function(item) {
            var checked = item.checked;
            var selectAllItem = item.parentMenu.down('#selectAll');
            var allChecked = true, i, arrayLength, menuItems;

            if (checked === false && selectAllItem.checked === true) {
              selectAllItem.setChecked(false);
            }
            else if (selectAllItem.checked === false) {
              menuItems = item.parentMenu.items.getRange();
              arrayLength = menuItems.length;
              for (i = 0; i < arrayLength; i++) {
                if (menuItems[i].itemId !== "selectAll") {
                  if (menuItems[i].checked === false) {
                    allChecked = false;
                    break;
                  }
                }
              }

              selectAllItem.setChecked(allChecked);
            }
          };

          var searchParamForColumn = this.getSearchParamForColumn(column);
          this.menu.add({
            xtype       : 'menucheckitem',
            text        : this.indexLabels[column.dataIndex] || column.text,
            hideOnClick : false,
            group       : group,
            checked     : 'all' === this.checkIndexes,
            dataIndex   : searchParamForColumn,
            handler     : deselectAllFn
          });
        }
      }
    }, this);

    // check items
    if (this.checkIndexes instanceof Array) {
      Ext.each(this.checkIndexes, function(di) {
        var item = this.menu.items.findBy(function(itm) {
          return itm.dataIndex === di;
        });

        if(item) {
          item.setChecked(true, true);
        }
      }, this);
    }

    // disable items
    if (this.readonlyIndexes instanceof Array) {
      Ext.each(this.readonlyIndexes, function(di) {
        var item = this.menu.items.findBy(function(itm) {
          return itm.dataIndex === di;
        });

        if (item) {
          item.disable();
        }
      }, this);
    }

    // if all enabled items are checked, check selectAll item too
    var shouldCheckSelectAll = true;
    this.menu.items.each(function(itm) {
      if (itm.itemId !== 'selectAll' && !itm.disabled && itm.checked === false) {
        shouldCheckSelectAll = false;
        return false;
      }

      return true;
    });

    this.menu.down('#selectAll').setChecked(shouldCheckSelectAll);
  },

  getSearchParamForColumn: function(gridColumn) {
    return gridColumn.getSortParam();
  },
  // ----- feature 002 - end
  isColumnConfigurationSame: function(columns, lastColumnNames) {
    var currentColumnNames = Ext.Array.map(columns, function(item) { return item.dataIndex });

    return Ext.Array.equals(currentColumnNames, lastColumnNames);
  }
  
});
