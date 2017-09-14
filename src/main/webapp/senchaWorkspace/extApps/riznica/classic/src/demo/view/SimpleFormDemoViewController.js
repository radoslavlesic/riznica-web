Ext.define("riznica.demo.view.SimpleFormDemoViewController", {
  extend: "Ext.app.ViewController",

  alias: "controller.demo-view-SimpleFormDemoViewController",

  requires: [
    "riznica.demo.model.FormDemoEmployeeModel"
  ],

  i18n: {
    saveFormMaskCustom: {
      maskText: "Custom loading message..."
    },

    saveMaskComponents: {
      phoneMaskText: "Masking Phone..."
    }
  },

  employeeFormLoadTestData: function() {
    var me = this;
    var employeeFormPanel = me.lookupReference("employeeForm");
    var recordToLoad;

    recordToLoad = Ext.create("riznica.demo.model.FormDemoEmployeeModel", {
      email: "abe@sencha.com",
      title: "mr",
      firstName: "John",
      lastName: "Elias",
      phone1: "555",
      phone2: "123",
      phone3: "4567",
      hours: 7,
      minutes: 15,
      startDate: Ext.Date.add(new Date(), Ext.Date.DAY, 1),
      endDate: Ext.Date.add(new Date(), Ext.Date.DAY, -1),
      income: 12345.55
    });

    employeeFormPanel.getForm().loadRecord(recordToLoad);
  },

  employeeFormReset: function() {
    var me = this;
    var employeeFormPanel = me.lookupReference("employeeForm");

    employeeFormPanel.getForm().reset();
    employeeFormPanel.getForm().isValid();
  },

  saveFormMaskDefault: function() {
    var me = this;
    var employeeFormPanel = me.lookupReference("employeeForm");
    var advancedBasicForm = employeeFormPanel.getForm();
    //noinspection JSUnresolvedVariable
    var url = riznica.configuration.contextPath + "/api/demo/simpleFormDemo/simpleFormDemoSubmit";

    advancedBasicForm.submit({ url: url, clientValidation: false });
  },

  saveFormMaskCustom: function() {
    var me = this;
    var employeeFormPanel = me.lookupReference("employeeForm");
    var advancedBasicForm = employeeFormPanel.getForm();
    //noinspection JSUnresolvedVariable
    var url = riznica.configuration.contextPath + "/api/demo/simpleFormDemo/simpleFormDemoSubmit";

    advancedBasicForm.submit({
      url: url, clientValidation: false,
      maskForm: true,
      maskFormConfig: {
        component: employeeFormPanel,
        maskConfig: {
          msg: me.i18n.saveFormMaskCustom.maskText || "Custom loading message..."
        }
      }
    });
  },

  saveDisableFormButtons: function() {
    var me = this;
    var employeeFormPanel = me.lookupReference("employeeForm");
    var advancedBasicForm = employeeFormPanel.getForm();
    //noinspection JSUnresolvedVariable
    var url = riznica.configuration.contextPath + "/api/demo/simpleFormDemo/simpleFormDemoSubmit";

    advancedBasicForm.submit({ url: url, clientValidation: false, maskForm: false, disableFormButtons: true });
  },

  saveMaskComponents: function() {
    var me = this;
    var employeeFormPanel = me.lookupReference("employeeForm");
    var advancedBasicForm = employeeFormPanel.getForm();
    //noinspection JSUnresolvedVariable
    var url = riznica.configuration.contextPath + "/api/demo/simpleFormDemo/simpleFormDemoSubmit";

    advancedBasicForm.submit({
      url: url, clientValidation: false, maskForm: false,
      maskComponents: [
        me.lookupReference("fullNameField"),
        {
          component: me.lookupReference("phoneFieldContainer"),
          maskConfig: {
            msg: me.i18n.saveMaskComponents.phoneMaskText || "Masking Phone..."
          }
        }
      ]
    });
  },

  saveDisableComponents: function() {
    var me = this;
    var employeeFormPanel = me.lookupReference("employeeForm");
    var advancedBasicForm = employeeFormPanel.getForm();
    //noinspection JSUnresolvedVariable
    var url = riznica.configuration.contextPath + "/api/demo/simpleFormDemo/simpleFormDemoSubmit";

    advancedBasicForm.submit({
      url: url, clientValidation: false, maskForm: false,
      disableComponents: [me.lookupReference("emailAddressField"), me.lookupReference("incomeField")]
    });
  },

  saveSingleStoreComponent: function() {
    var me = this;
    var employeeFormPanel = me.lookupReference("employeeForm");
    var advancedBasicForm = employeeFormPanel.getForm();
    //noinspection JSUnresolvedVariable
    var url = riznica.configuration.contextPath + "/api/demo/simpleFormDemo/simpleFormDemoFindAllEmails";

    advancedBasicForm.submit({
      url: url, clientValidation: false,
      storeLoadingComponents: me.lookupReference("emailsGrid"), maskStoreLoadingComponents: true
    });
  },

  saveSingleStoreComponentWithServerValidation: function() {
    var me = this;
    var employeeFormPanel = me.lookupReference("employeeForm");
    var advancedBasicForm = employeeFormPanel.getForm();
    //noinspection JSUnresolvedVariable
    var url = riznica.configuration.contextPath + "/api/demo/simpleFormDemo/simpleFormDemoFindAllEmailsWithValidation";

    advancedBasicForm.submit({
      url: url, clientValidation: false,
      storeLoadingComponents: me.lookupReference("emailsGrid"), maskStoreLoadingComponents: true
    });
  },

  saveMultiStoreComponents: function() {
    var me = this;
    var employeeFormPanel = me.lookupReference("employeeForm");
    var advancedBasicForm = employeeFormPanel.getForm();
    //noinspection JSUnresolvedVariable
    var url = riznica.configuration.contextPath + "/api/demo/simpleFormDemo/simpleFormDemoFindAllEmailsAndPhones";

    advancedBasicForm.submit({
      url: url, clientValidation: false, maskStoreLoadingComponents: true,
      storeLoadingComponents: [
        { component: me.lookupReference("emailsGrid"), remoteDataQualifier: "emails" },
        { component: me.lookupReference("phonesGrid"), remoteDataQualifier: "phones" }
      ]
    });
  },

  saveMultiStoreComponentsWithMaskViewText: function() {
    var me = this;
    var employeeFormPanel = me.lookupReference("employeeForm");
    var advancedBasicForm = employeeFormPanel.getForm();
    //noinspection JSUnresolvedVariable
    var url = riznica.configuration.contextPath + "/api/demo/simpleFormDemo/simpleFormDemoFindAllEmailsAndPhones";

    advancedBasicForm.submit({
      url: url, clientValidation: false, maskForm: false, maskComponents: me.getView(),
      storeLoadingComponents: [
        { component: me.lookupReference("emailsGrid"), remoteDataQualifier: "emails" },
        { component: me.lookupReference("phonesGrid"), remoteDataQualifier: "phones" }
      ],

      // Note: Specifying success and failure handlers is optional, and they can be left out in many common cases.
      success: function(form, action) {
        console.log("---------------- submit successful", form, action);
      },

      failure: function(form, action) {
        console.log("---------------- submit failure", form, action);
      }
    });
  }
});
