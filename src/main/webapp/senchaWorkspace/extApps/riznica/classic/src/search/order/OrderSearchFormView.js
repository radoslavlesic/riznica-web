Ext.define("riznica.search.order.OrderSearchFormView",{
  extend: "grich.core.component.form.AdvancedFormPanel",
  xtype: "order-OrderSearchFormView",
  requires:[
    "Ext.button.Button",
    "Ext.container.Container",
    "Ext.form.FieldContainer",
    "Ext.form.Label",
    "Ext.form.field.Checkbox",
    "Ext.form.field.ComboBox",
    "Ext.form.field.Number",
    "Ext.form.field.Text",
    "Ext.form.field.Hidden",
    "Ext.layout.container.Box",
    "Ext.layout.container.HBox",
    "Ext.layout.container.VBox",
    "grich.core.component.form.AdvancedFormPanel",
    "grich.core.form.FormUtils",
    "Ext.form.field.Hidden",
    "riznica.search.order.OrderSearchFormViewController",
    "riznica.search.order.OrderSearchFormViewModel",
    "riznica.order.stores.ProductStore"
  ],
  
  controller: "order-search-OrderSearchFormViewController",
  viewModel: "order-search-OrderSearchFormViewModel",

  formConfig:{
    labelWidthWider: 120,
    labelAlign: "right",
    buttonWidth: 50
    // readOnlyFieldStyle: 
  },
  title: "Search conditions",
  border: true, collapsible: true, titleCollapse: true, animCollapse: true, padding: 10,

  getParentView: function() {
    var me = this;
    var parentView = me.up("order-OrderSearchView");
    return parentView ? parentView : null;
  },
  
  initComponent:function() {
    var me = this;
    var productStore = Ext.create("riznica.order.stores.ProductStore");

    var clearTriggerConfig = { type: "clear", hideWhenMouseOut: false, weight: -1 };

    Ext.apply(me,{
      items:[
        {
          defaults:{
            layout: {type: "vbox"}, border: false,
            defaults: {
              width: "100%", margin: "5 0 5 0", triggers:{clear: clearTriggerConfig},
              labelWidth: me.formConfig.labelWidthWider, labelAlign: me.formConfig.labelAlign
            }
          },
          items:[
            {
              columnWidth: .0499,
              items: [
                { xtype: "textfield", name: "id", fieldLabel: "Product ID", flex: 1, margin: "8 50 5 0", maxLength: 4, enforceMaxLength: true },
                {
                  xtype: "combo", name: "title", fieldLabel: "Product name", editable: false, margin: "8 50 5 0",
                  displayField: "title", valueField: "title",
                  store: productStore, itemId: "product",
                  queryMode: "local", typeAhead: false, minChars: 2,

                  tpl: Ext.create('Ext.XTemplate',
                    '<ul class="x-list-plain"><tpl for=".">',
                    '<li role="option" class="x-boundlist-item">{id} - {title}</li>',
                    '</tpl></ul>'
                  ),
                  // template for the content inside text field
                  displayTpl: Ext.create('Ext.XTemplate',
                    '<tpl for=".">',
                    '{id} - {title}',
                    '</tpl>'
                  ),

                  listeners: {
                    change: function(thisEl, newValue, oldValue) {
                      var filters = thisEl.store.getFilters();
                      if (thisEl.value) {
                        thisEl.mm = filters.add({
                          id: "id",
                          property: "title",
                          value: thisEl.value,
                          anyMatch: true,
                          caseSensitive: false
                        });
                      }
                      else if(thisEl.mm) {
                        filters.remove(thisEl.mm);
                        thisEl.mm = null;
                      }
                    }
                  }
                }
              ]
            }
          ]
        }
      ]

    });

    me.callParent();
  }
});