/**
 * PagingToolbarResizer plugin for Ext PagingToolbar
 *
 * Contains a combobox where user can choose the pagesize dynamically
 *
 * @author    Loiane Groner <http://loianegroner.com> <http://loiane.com>
 * @date      September 2011
 * @version   1 - ported to Ext JS 4
 *
 * @license Ext.ux.PagingToolbarResizer is licensed under the terms of
 * the Open Source LGPL 3.0 license.  Commercial use is permitted to the extent
 * that the code/component(s) do NOT become part of another Open Source or Commercially
 * licensed development library or toolkit without explicit permission.
 *
 * License details: http://www.gnu.org/licenses/lgpl.html
 */

/**
 * @class Ext.ux.PagingToolbarResizer
 *
 * Creates new PagingToolbarResizer plugin
 * @constructor
 * @param {Object} config The config object
 *
 * How to use
 *
 * Just instatiate a new PagingToolbarResizer inside PagingToolbar plugins option:
 *
 *   bbar: new Ext.PagingToolbar({
 *          pageSize: 25,
 *          store: store,
 *          displayInfo: true,
 *          displayMsg: 'Displaying topics {0} - {1} of {2}',
 *          emptyMsg: "No topics to display",
 *          plugins : [Ext.create('Ext.ux.PagingToolbarResizer', {options : [ 50, 100, 500 ] })]
 *   })
 *
 * https://github.com/loiane/extjs4-ux-paging-toolbar-resizer
 */
Ext.define('Ext.ux.PagingToolbarResizer', {
  extend: 'Ext.AbstractPlugin',
  alias: 'plugin.pagingtoolbarresizer',

  /**
   * @cfg {Ext.data.Store} options
   * The {@link Ext.data.Store} combobox should use as its data source (required).
   * You can also use an array of integers.
   * Defaults to [5, 10, 15, 20, 25, 30, 50, 75, 100, 200, 300, 500, 1000]
   */
  options: [5, 10, 15, 20, 25, 30, 50, 75, 100, 200, 300, 500, 1000],

  /**
   * @cfg {String} mode Acceptable values are:
   *
   * 'remote' : Default
   * Automatically loads the {@link #store} the first time the trigger
   * is clicked. If you do not want the store to be automatically loaded the first time the trigger is
   * clicked, set to 'local' and manually load the store.  To force a requery of the store
   * every time the trigger is clicked see {@link #lastQuery}.
   *
   * 'local' :
   * ComboBox loads local data
   *
   *
   */
  mode: 'remote',

  /**
   * @cfg {String} displayText
   * The message to display before the combobox (defaults to 'Records per Page')
   */
  displayText: 'Records per Page',

  store: null,

  combo: null,

  constructor: function(config) {
    Ext.apply(this, config);

    this.callParent(arguments);
  },

  init: function(pagingToolbar) {
    var me = this;
    var comboStore = this.options;
    var grid = pagingToolbar.up('grid');

    me.store = grid.getStore();

    me.combo = Ext.create('Ext.form.field.ComboBox', {
      typeAhead: false,
      triggerAction: 'all',
      forceSelection: true,
      lazyRender: true,
      editable: false,
      mode: this.mode,
      width: 80,
      store: comboStore,
      listeners: {
        select: function(combo, value) {
          me.store.pageSize = value.data.field1;
          me.store.loadPage(1);
        },
        boxready: function(combo) {
          combo.setValue(me.store.pageSize);
        }
      }
    });

    var index = pagingToolbar.items.indexOf(pagingToolbar.items.map['refresh']);
    pagingToolbar.insert(++index, '-');
    pagingToolbar.insert(++index, this.displayText);
    pagingToolbar.insert(++index, me.combo);
    pagingToolbar.insert(++index, '-');

    //destroy combobox before destroying the paging toolbar
    pagingToolbar.on({
      beforedestroy: function() {
        me.combo.destroy();
        me.combo = null;
      }
    });

    grid.on('beforereconfigure', me.beforeReconfigure, me);
  },

  beforeReconfigure: function(grid, store, columns, oldStore) {
    var me = this;

    if (store && store !== oldStore) {
      me.store = store;
      me.combo.setValue(me.store.pageSize);
    }
  }
});
