Ext.define("riznica.demo.view.NestedFormDemoView", {
  extend: "Ext.panel.Panel",
  xtype: "demo-view-NestedFormDemoView",

  requires: [
    "Ext.button.Button",
    "Ext.form.FieldContainer",
    "Ext.form.FieldSet",
    "Ext.form.field.ComboBox",
    "Ext.form.field.Date",
    "Ext.form.field.Display",
    "Ext.form.field.Number",
    "Ext.form.field.Text",
    "Ext.grid.Panel",
    "Ext.layout.container.HBox",
    "Ext.ux.form.trigger.Clear",
    "grich.core.component.form.AdvancedFormPanel",
    "grich.core.component.form.ClientValidationStatus",
    "grich.core.component.form.ServerValidationStatus",
    "grich.core.form.FormUtils",
    "riznica.demo.view.NestedFormDemoViewController",
    "riznica.demo.view.NestedFormDemoViewModel"
  ],

  controller: "demo-view-NestedFormDemoViewController",
  viewModel: "demo-view-NestedFormDemoViewModel",

  i18n: {
    loadTestDataText: "Load test data",
    resetText: "Reset",

    employeeForm: {
      globalValidate: {
        startDateInvalidText: "Start date must be before end date.",
        endDateInvalidText: "End date must be after start date.",
        dateRangeGlobalMessageText: "When defining a date range, start date must be before end date.",

        phoneMissingText: "Phone must be specified."
      },

      firstPartFieldset: {
        titleText: "First part of Employee Form",
        fieldEmailLabelText: "Email Address",
        fieldContainerDateRange: {
          labelText: "Date Range",
          fieldStartDateLabelText: "Date Range - Start Date",
          fieldEndDateLabelText: "Date Range - End Date"
        },
        fieldIncomeLabelText: "Income"
      },

      detailsFieldset: {
        titleText: "Details",
        nestedPhoneFormFieldsetTitleText: "Nested Form - Phone Search",
        phoneSearchForm: {
          fieldSearchPhoneLabelText: "Phone to search",
          clientValidationStatusNotificationTitleText: "Phone Search",
          clientValidationStatusNotificationContentText: "Phone Search"
        },
        buttonSearchPhoneText: "Search Phones",
        foundPhonesGrid: {
          titleText: "Select Single Phone",
          columnPhone1Text: "Area Code",
          columnPhone2Text: "Number"
        },
        clientValidationStatus: {
          validText: "Phone search form is valid",
          invalidText: "Phone search form is not valid"
        }
      },

      secondPartFieldset: {
        titleText: "Second part of Employee Form",
        fieldContainerTimeWorked: {
          labelText: "Time worked",
          fieldHoursLabelText: "Time worked - Hours",
          displayFieldHoursText: "hours",
          fieldMinutesLabelText: "Time worked - Mins",
          displayFieldMinutesText: "mins"
        },
        fieldContainerFullName: {
          labelText: "Full Name",
          fieldTitleLabelText: "Title",
          fieldFirstNameLabelText: "Full Name - First Name",
          fieldLastNameLabelText: "Full Name - Last Name"
        }
      },

      docked: {
        clientValidationStatus: {
          validText: "Employee form is valid",
          invalidText: "Employee form is not valid"
        },

        addEmailButtonText: "Add Email",
        addEmailWithCascadingValidationButtonText: "Add email with cascading server side validation"
      }
    },

    emailsGrid: {
      titleText: "Added Emails",
      columnFirstNameText: "First Name",
      columnLastNameText: "Last Name",
      columnEmailText: "Email",
      columnPhone1EmailText: "Phone"
    },

    outsideFormClientValidationStatus1: {
      validText: "Employee form is very very valid",
      invalidText: "Employee form is definitely not valid"
    }
  },

  autoScroll: true, bodyPadding: 10, cls: "nestedFormDemoView",

  initComponent: function() {
    var me = this;
    var clearTriggerConfig = { type: "clear", hideWhenMouseOut: false, weight: -1 };

    Ext.applyIf(me, {
      items: [
        {
          xtype: "toolbar", width: 800, defaultButtonUI: "default", margin: "0 0 5 0", padding: "6 0 6 0",
          items: [
            { xtype: "button", text: me.i18n.loadTestDataText || "Load test data", handler: "employeeFormLoadTestData" },
            { xtype: "button", text: me.i18n.resetText || "Reset", handler: "employeeFormReset" }
          ]
        },
        {
          reference: "employeeForm", formId: "demo.NestedFormDemoView.EmployeeForm", xtype: "grich-core-component-form-AdvancedFormPanel",
          width: 800, margin: "0 0 15 0", bodyPadding: "0 10 10 10", border: true,

          doApplyEnterNavigationKeyMap: function() {
            var thisForm = this;
            grich.core.form.FormUtils.applyEnterNavigationKeyMap(thisForm, null, "[isFormField]:not([excludeForm])");
          },

          getOutsideFormClientValidationStatusComponents: function() {
            return [me.lookupReference("outsideFormClientValidationStatus1"), me.lookupReference("outsideFormClientValidationStatus2")];
          },

          globalValidate: function() {
            var thisForm = this;
            var basicForm = thisForm.getForm();
            var startDate, endDate, startDateField, endDateField, foundPhonesGrid, globalErrorMessages = [];

            startDateField = me.lookupReference("startDateField");
            endDateField = me.lookupReference("endDateField");
            foundPhonesGrid = me.lookupReference("foundPhonesGrid");

            if (!thisForm.globalValidateInitialized) {
              startDateField.on("change", basicForm.checkValidity, basicForm);
              endDateField.on("change", basicForm.checkValidity, basicForm);
              foundPhonesGrid.on("selectionchange", basicForm.checkValidityForced, basicForm);
              thisForm.globalValidateInitialized = true;
            }

            // validate date range
            startDate = startDateField.getValue();
            endDate = endDateField.getValue();

            if (startDate && endDate && startDate >= endDate) {
              startDateField.markInvalid(me.i18n.employeeForm.globalValidate.startDateInvalidText || "Start date must be before end date.");
              endDateField.markInvalid(me.i18n.employeeForm.globalValidate.endDateInvalidText || "End date must be after start date.");

              globalErrorMessages.push(me.i18n.employeeForm.globalValidate.dateRangeGlobalMessageText || "When defining a date range, start date must be before end date.");
            }
            else {
              startDateField.isValid();
              endDateField.isValid();
            }

            // validate phone selection
            if (foundPhonesGrid.getSelectionModel().getCount() < 1) {
              globalErrorMessages.push(me.i18n.employeeForm.globalValidate.phoneMissingText || "Phone must be specified.");
            }

            return globalErrorMessages;
          },

          items: [
            {
              xtype: "fieldset", title: me.i18n.employeeForm.firstPartFieldset.titleText || "First part of Employee Form",
              defaults: {
                anchor: "100%", labelWidth: 100,
                triggers: { clear: clearTriggerConfig }
              },
              items: [
                { xtype: "textfield", name: "email", fieldLabel: me.i18n.employeeForm.firstPartFieldset.fieldEmailLabelText || "Email Address" },
                {
                  xtype: "fieldcontainer", fieldLabel: me.i18n.employeeForm.firstPartFieldset.fieldContainerDateRange.labelText || "Date Range", layout: "hbox",
                  defaults: {
                    flex: 1, hideLabel: true,
                    triggers: { clear: clearTriggerConfig }
                  },
                  items: [
                    {
                      reference: "startDateField", xtype: "datefield", name: "startDate", margin: "0 5 0 0",
                      fieldLabel: me.i18n.employeeForm.firstPartFieldset.fieldContainerDateRange.fieldStartDateLabelText || "Date Range - Start Date"
                    },
                    {
                      reference: "endDateField", xtype: "datefield", name: "endDate",
                      fieldLabel: me.i18n.employeeForm.firstPartFieldset.fieldContainerDateRange.fieldEndDateLabelText || "Date Range - End Date"
                    }
                  ]
                },
                { xtype: "numberfield", name: "income", fieldLabel: me.i18n.employeeForm.firstPartFieldset.fieldIncomeLabelText || "Income" }
              ]
            },
            {
              xtype: "fieldset", title: me.i18n.employeeForm.detailsFieldset.titleText || "Details", collapsible: true, cls: "detailsFieldset",
              items: [
                {
                  reference: "phoneSearchFieldset", xtype: "fieldset", cls: "phoneSearchFieldset",
                  title: me.i18n.employeeForm.detailsFieldset.nestedPhoneFormFieldsetTitleText || "Nested Form - Phone Search",
                  items: [
                    {
                      reference: "phoneSearchForm", formId: "demo.NestedFormDemoView.PhoneSearchForm", xtype: "grich-core-component-form-AdvancedFormPanel",
                      clientValidationStatusNotificationAlign: "tr",
                      clientValidationStatusNotificationTitleText:  me.i18n.employeeForm.detailsFieldset.phoneSearchForm.clientValidationStatusNotificationTitleText || "Phone Search",
                      clientValidationStatusNotificationContentText: me.i18n.employeeForm.detailsFieldset.phoneSearchForm.clientValidationStatusNotificationContentText || "Phone Search",
                      defaults: { triggers: { clear: clearTriggerConfig } },
                      items: [
                        {
                          xtype: "textfield", name: "searchPhone", labelWidth: 100, anchor: "100%",
                          fieldLabel: me.i18n.employeeForm.detailsFieldset.phoneSearchForm.fieldSearchPhoneLabelText || "Phone to search"
                        }
                      ],
                      dockedItems: [
                        {
                          xtype: "toolbar", dock: "bottom", padding: "6 0 6 0", defaultButtonUI: "default",
                          items: [
                            { text: me.i18n.employeeForm.detailsFieldset.buttonSearchPhoneText || "Search Phones", formBind: true, handler: "searchPhones", cls: "riznica-toolbar-btn-main" },
                            {
                              xtype: "grich-core-component-form-ClientValidationStatus",
                              validText: me.i18n.employeeForm.detailsFieldset.clientValidationStatus.validText || "Phone search form is valid",
                              invalidText: me.i18n.employeeForm.detailsFieldset.clientValidationStatus.invalidText || "Phone search form is not valid"
                            },
                            { xtype: "grich-core-component-form-ServerValidationStatus" }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  reference: "foundPhonesGrid", xtype: "grid", border: true,
                  bind: {
                    store: "{foundPhonesStore}"
                  },
                  selModel: { selType: "checkboxmodel", mode: "SINGLE", showHeaderCheckbox: false, allowDeselect: true },
                  title: me.i18n.employeeForm.detailsFieldset.foundPhonesGrid.titleText || "Select Single Phone", height: 200, margin: "10 0 10 0",
                  columns: [
                    { text: me.i18n.employeeForm.detailsFieldset.foundPhonesGrid.columnPhone1Text || "Area Code", dataIndex: "phone1", flex: 1 },
                    {
                      text: me.i18n.employeeForm.detailsFieldset.foundPhonesGrid.columnPhone2Text || "Number", dataIndex: "phone2", flex: 5,
                      renderer: function(value, metaData, record) {
                        return record.get("phone2") + "-" + record.get("phone3");
                      }
                    }
                  ]
                }
              ]
            },
            {
              xtype: "fieldset", title: me.i18n.employeeForm.secondPartFieldset.titleText || "Second part of Employee Form",
              defaults: {
                labelWidth: 90, anchor: "100%",
                layout: "hbox"
              },
              items: [
                {
                  xtype: "fieldcontainer", fieldLabel: me.i18n.employeeForm.secondPartFieldset.fieldContainerTimeWorked.labelText || "Time worked",
                  combineErrors: true, msgTarget: "side",
                  defaults: { hideLabel: true, triggers: { clear: clearTriggerConfig } },
                  items: [
                    { name: "hours", xtype: "numberfield", width: 125, fieldLabel: me.i18n.employeeForm.secondPartFieldset.fieldContainerTimeWorked.fieldHoursLabelText || "Time worked - Hours" },
                    { xtype: "displayfield", value: me.i18n.employeeForm.secondPartFieldset.fieldContainerTimeWorked.displayFieldHoursText || "hours", margin: "0 25 0 15" },
                    { name: "minutes", xtype: "numberfield", width: 125, fieldLabel: me.i18n.employeeForm.secondPartFieldset.fieldContainerTimeWorked.fieldMinutesLabelText || "Time worked - Mins" },
                    { xtype: "displayfield", value: me.i18n.employeeForm.secondPartFieldset.fieldContainerTimeWorked.displayFieldMinutesText || "mins", margin: "0 0 0 15" }
                  ]
                },
                {
                  xtype: "fieldcontainer", fieldLabel: me.i18n.employeeForm.secondPartFieldset.fieldContainerFullName.labelText || "Full Name",
                  combineErrors: true, msgTarget: "side",
                  defaults: { hideLabel: true, triggers: { clear: clearTriggerConfig } },
                  items: [
                    {
                      xtype: "combo", name: "title", fieldLabel: me.i18n.employeeForm.secondPartFieldset.fieldContainerFullName.fieldTitleLabelText || "Title",
                      displayField: "name", valueField: "value", value: "mrs",
                      triggerAction: "all", queryMode: "local", forceSelection: true, editable: false,
                      width: 125, margin: "0 5 0 0",
                      bind: {
                        store: "{titlesStore}"
                      }
                    },
                    {
                      xtype: "textfield", name: "firstName", fieldLabel: me.i18n.employeeForm.secondPartFieldset.fieldContainerFullName.fieldFirstNameLabelText || "Full Name - First Name",
                      flex: 1, margin: "0 5 0 0"
                    },
                    {
                      xtype: "textfield", name: "lastName", fieldLabel: me.i18n.employeeForm.secondPartFieldset.fieldContainerFullName.fieldLastNameLabelText || "Full Name - Last Name",
                      flex: 1
                    }
                  ]
                }
              ]
            }
          ],

          dockedItems: [
            {
              xtype: "toolbar", dock: "bottom", ui: "footer", cls: "x-panel-default-outer-border-rbl",
              items: [
                { text: me.i18n.employeeForm.docked.addEmailButtonText || "Add Email", formBind: true, handler: "addEmail", cls: "riznica-toolbar-btn-main" },
                {
                  text: me.i18n.employeeForm.docked.addEmailWithCascadingValidationButtonText || "Add email with cascading server side validation", formBind: true,
                  handler: "addEmailWithCascadingValidation"
                },
                {
                  xtype: "grich-core-component-form-ClientValidationStatus",
                  validText: me.i18n.employeeForm.docked.clientValidationStatus.validText || "Employee form is valid",
                  invalidText: me.i18n.employeeForm.docked.clientValidationStatus.invalidText || "Employee form is not valid"
                },
                { reference: "employeeFormServerValidationStatus", xtype: "grich-core-component-form-ServerValidationStatus" }
              ]
            }
          ]
        },

        {
          reference: "emailsGrid", xtype: "grid", title: me.i18n.emailsGrid.titleText || "Added Emails",
          width: 800, height: 200, border: true,
          bind: {
            store: "{nestedFormDemoEmailStore}"
          },
          columns: [
            { text: me.i18n.emailsGrid.columnFirstNameText || "First Name",  dataIndex: "firstName", flex: 10 },
            { text: me.i18n.emailsGrid.columnLastNameText || "Last Name",  dataIndex: "lastName", flex: 10 },
            { text: me.i18n.emailsGrid.columnEmailText || "Email", dataIndex: "email", flex: 15 },
            {
              text: me.i18n.emailsGrid.columnPhone1EmailText || "Phone", dataIndex: "phone1", flex: 10,
              renderer: function(value, metaData, record) {
                return record.get("phone1") + "-" + record.get("phone2") + "-" + record.get("phone3");
              }
            }
          ]
        },

        {
          reference: "outsideFormClientValidationStatus1", xtype: "grich-core-component-form-ClientValidationStatus",
          validText: me.i18n.outsideFormClientValidationStatus1.validText || "Employee form is very very valid",
          invalidText: me.i18n.outsideFormClientValidationStatus1.invalidText || "Employee form is definitely not valid"
        },
        { reference: "outsideFormClientValidationStatus2", xtype: "grich-core-component-form-ClientValidationStatus" }
      ]
    });

    me.callParent();
  }
});
