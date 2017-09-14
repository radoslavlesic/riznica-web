Ext.define("riznica.demo.view.NestedFormDemoViewController", {
  extend: "Ext.app.ViewController",

  alias: "controller.demo-view-NestedFormDemoViewController",

  requires: [
    "grich.core.util.AjaxSubmitHelper",
    "riznica.demo.model.FormDemoEmployeeModel"
  ],

  i18n: {
    dockedToolbarButtonSearchPrefixText: "Add"
  },

  employeeFormLoadTestData: function() {
    var me = this;
    var employeeFormPanel = me.lookupReference("employeeForm");
    var recordToLoad;

    recordToLoad = Ext.create("riznica.demo.model.FormDemoEmployeeModel", {
      email: "abe@sencha.com",
      title: "mr",
      firstName: "Abraham",
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
    employeeFormPanel.doFocusDefaultField();
  },

  employeeFormReset: function() {
    var me = this;
    var employeeFormPanel = me.lookupReference("employeeForm");

    employeeFormPanel.getForm().reset();
    employeeFormPanel.getForm().isValid();
    employeeFormPanel.doFocusDefaultField();
  },

  searchPhones: function() {
    var me = this;
    var phoneSearchFormPanel = me.lookupReference("phoneSearchForm");
    var basicForm = phoneSearchFormPanel.getForm();
    //noinspection JSUnresolvedVariable
    var url = riznica.configuration.contextPath + "/api/demo/nestedFormDemo/nestedFormDemoSearchPhones";

    basicForm.submit({
      url: url,
      maskForm: false,
      maskComponents: me.lookupReference("phoneSearchFieldset"),
      maskStoreLoadingComponents: true,
      storeLoadingComponents: me.lookupReference("foundPhonesGrid")
    });
  },

  addEmail: function() {
    var me = this;
    var employeeFormPanel = me.lookupReference("employeeForm");
    var employeeBasicForm = employeeFormPanel.getForm();
    var foundPhonesGrid = me.lookupReference("foundPhonesGrid");
    var selectedPhoneRecord = foundPhonesGrid.getSelectionModel().getSelection()[0];

    var additionalParams = {
      phone1: selectedPhoneRecord.get("phone1"),
      phone2: selectedPhoneRecord.get("phone2"),
      phone3: selectedPhoneRecord.get("phone3")
    };

    //noinspection JSUnresolvedVariable
    var url = riznica.configuration.contextPath + "/api/demo/nestedFormDemo/nestedFormDemoAddEmail";

    employeeBasicForm.submit({
      url: url,
      maskStoreLoadingComponents: true,
      storeLoadingComponents: {
        component: me.lookupReference("emailsGrid"),
        append: true
      },
      params: additionalParams,
      success: function() {
        var phoneSearchForm = me.lookupReference("phoneSearchForm");
        var phoneSearchBasicForm = phoneSearchForm.getForm();

        phoneSearchBasicForm.reset();
        phoneSearchBasicForm.isValid();

        foundPhonesGrid.getStore().removeAll();

        employeeBasicForm.reset();
        employeeBasicForm.isValid();
        employeeFormPanel.doFocusDefaultField();
      }
    });
  },

  addEmailWithCascadingValidation: function() {
    var me = this;
    var employeeFormPanel = me.lookupReference("employeeForm");
    var employeeBasicForm = employeeFormPanel.getForm();

    //noinspection JSUnresolvedVariable
    var url = riznica.configuration.contextPath + "/api/demo/nestedFormDemo/nestedFormDemoAddEmailWithDeepValidation";

    var foundPhonesGrid = me.lookupReference("foundPhonesGrid");
    var selectedPhoneRecord = foundPhonesGrid.getSelectionModel().getSelection()[0];

    // Almost in all cases, to get form's values in correct format and to not get values of non submitting fields, getValues() with specified flags as bellow, should be always used.
    var jsonData = employeeBasicForm.getValues(false, false, false, true, true);

    jsonData.phone = {
      phone1: selectedPhoneRecord.get("phone1"),
      phone2: selectedPhoneRecord.get("phone2"),
      phone3: selectedPhoneRecord.get("phone3")
    };

    grich.core.util.AjaxSubmitHelper.invokeRequest({
      url: url,
      method: "POST",
      jsonData: jsonData,
      serverValidationStatusComponents: me.lookupReference("employeeFormServerValidationStatus"),
      forceAutoCloseNotificationIfServerValidationStatusComponentsPresent: false,
      disableComponents: employeeFormPanel.getDockedItems("toolbar button[text^=" + me.dockedToolbarButtonSearchPrefixText + "]"),
      maskStoreLoadingComponents: true,
      storeLoadingComponents: {
        component: me.lookupReference("emailsGrid"),
        append: true
      },
      success: function(response, options, responseTextDecoded) {
        var phoneSearchForm, phoneSearchBasicForm;

        if (responseTextDecoded.success === true) {
          phoneSearchForm = me.lookupReference("phoneSearchForm");
          phoneSearchBasicForm = phoneSearchForm.getForm();

          phoneSearchBasicForm.reset();
          phoneSearchBasicForm.isValid();

          foundPhonesGrid.getStore().removeAll();

          employeeBasicForm.reset();
          employeeBasicForm.isValid();
          employeeFormPanel.doFocusDefaultField();
        }
      }
    });
  }
});
