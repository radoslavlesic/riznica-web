Ext.define('riznica.core.view.TreeToolbarView', {
  extend: 'Ext.toolbar.Toolbar',
  xtype: 'core-view-TreeToolbarView',

  requires: [
    'Ext.button.Button',
    'Ext.button.Split',
    'Ext.data.StoreManager',
    'Ext.menu.Item',
    'Ext.layout.container.boxOverflow.Menu'
  ],

  mixins: [
    'Ext.mixin.Responsive'
  ],

  overflowHandler: 'menu',

  config: {
    storeId: null,

    /**
     * @private
     */
    wideDisplay: true
  },

  responsiveConfig: {
    'width >= 800': {
      // wideDisplay is made up property and is serves only for triggering updateWideDisplay method.
      wideDisplay: true
    },
    'width < 800': {
      wideDisplay: false
    }
  },

  listeners: {
    boxready: function() {
      this.updateWideDisplay(this.initialWideDisplay);
    }
  },

  updateWideDisplay: function(wideDisplayNew) {
    var me = this;
    var i, arrayLength;
    var items, item;

    if (!me.rendered) {
      // Store initial value to be able to call this function ob box ready.
      me.initialWideDisplay = wideDisplayNew;
      return;
    }

    items = me.items.items;

    arrayLength = items.length;
    Ext.suspendLayouts();
    for (i = 0; i < arrayLength; i++) {
      item = items[i];
      if (wideDisplayNew === true) {
        item.setText(item.textStored);
      }
      else {
        item.setText(null);
      }
    }
    Ext.resumeLayouts(true);
  },

  initComponent: function() {
    var me = this;
    var treeStore = Ext.data.StoreManager.lookup(me.storeId);
    var treeRoot = treeStore.getRoot();
    var toolbarItems = [];
    var overflowHandler = Ext.create('Ext.layout.container.boxOverflow.Menu', {});

    // This override is needed to update the item text in menu. Menu item text is taken from original toolbar item, but original toolbar item text can be empty because of responsive config.
    // Therefore, beside text attribute (which should really be called displayText), components in toolbar has additional textStored property intended for storing original text and nothing elese.
    Ext.override(overflowHandler, {
      onButtonAttrChange: function(btn) {
        var clone;

        this.callParent(arguments);

        if (btn.textStored) {
          clone = btn.overflowClone;
          clone.setText(btn.textStored);
        }
      }
    });

    me.overflowHandler = overflowHandler;

    var cascadeSpecification = {
      before: function(currentNode) {
        var currentNodeData, currentNodeDataPlugins, currentToolbarItem;

        if (currentNode.isRoot() === false) {
          currentNodeData = currentNode.getData();

          if (currentNodeData.securable) {
            currentNodeDataPlugins = currentNodeData.plugins || [];
            currentNodeDataPlugins.push({ ptype: 'grich.core.component.Securable', authorityList: currentNodeData.securable.authorityList, checkType: currentNodeData.securable.checkType });
          }

          currentToolbarItem = {
            topLevelRouteId: currentNodeData.topLevelRouteId || null,
            isHome: !!currentNodeData.isHome,
            viewConfig: currentNodeData.viewConfig || null,
            iconCls: currentNodeData.iconCls || null,
            // additional property for text saving since text attribute is manipulated and sometimes erased during responsive config handling.
            textStored: currentNodeData.text || null,
            text: currentNodeData.text || null,
            plugins: currentNodeDataPlugins || null,
            handler: 'onNavigationButtonClick',
            xtype: 'button'
          };

          if (currentNode.getDepth() === 1) {
            if (currentNode.hasChildNodes() === true) {
              if (currentNodeData.selectable === true) {
                currentToolbarItem.xtype = 'splitbutton';
              }

              currentToolbarItem.menu = [];
            }

            toolbarItems.push(currentToolbarItem);
          }
          else {
            currentToolbarItem.xtype = 'menuitem';

            if (currentNode.hasChildNodes() === true) {
              currentToolbarItem.menu = [];
            }

            currentNode.parentNode.treeToolbarViewToolbarItem.menu.push(currentToolbarItem);
          }

          currentNode.treeToolbarViewToolbarItem = currentToolbarItem;
        }
      }
    };

    treeRoot.cascadeBy(cascadeSpecification);
    me.items = toolbarItems;

    me.callParent();
  }
});
