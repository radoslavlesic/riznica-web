Ext.define("riznica.search.order.OrderSearchFormView",{
  extend: "grich.core.component.form.AdvancedFormPanel",
  xtype: "order-OrderSearchFormVie",
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
  
  controller: "order-OrderSearchFormViewController",
  viewModel: "order-OrderSearchFormViewModel",
  
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
    var parentView = me.up("employee-EmployeeSearchView");
    return parentView ? parentView : null;
  },
  
  initComponent:function() {
    var me = this;
    var productStore = Ext.create("riznica.order.stores.ProductStore");

    var clearTriggerConfig = { type: "clear", hideWhenMouseOut: false, weight: -1 };
    productStore.on('load', function() {
      me.down('[name=fullName]').setEditable(true).typeAhead = true;
    });

    Ext.apply(me,{

    });

    me.callParent();
  }
});