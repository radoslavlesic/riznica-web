Ext.define("riznica.demo.view.SimpleFormDemoView", {
  extend: "Ext.panel.Panel",
  xtype: "demo-view-SimpleFormDemoView",

  requires: [
    "Ext.button.Button",
    "Ext.data.Store",
    "Ext.form.FieldContainer",
    "Ext.form.FieldSet",
    "Ext.form.field.ComboBox",
    "Ext.form.field.Date",
    "Ext.form.field.Display",
    "Ext.form.field.Number",
    "Ext.form.field.Text",
    "Ext.grid.Panel",
    "Ext.layout.container.HBox",
    "grich.core.component.form.AdvancedFormPanel",
    "grich.core.component.form.ClientValidationStatus",
    "grich.core.component.form.ServerValidationStatus",
    "riznica.demo.view.SimpleFormDemoViewController",
    "riznica.demo.view.SimpleFormDemoViewModel"
  ],

  controller: "demo-view-SimpleFormDemoViewController",
  viewModel: "demo-view-SimpleFormDemoViewModel",

  i18n: {
    employeeForm: {
      globalValidate: {
        startDateInvalidText: "Start date must be before end date.",
        endDateInvalidText: "End date must be after start date.",
        dateRangeGlobalMessageText: "When defining a date range, start date must be before end date."
      },
      fieldEmailLabelText: "Email Address",
      fieldContainerDateRange: {
        labelText: "Date Range",
        fieldStartDateLabelText: "Date Range - Start Date",
        fieldEndDateLabelText: "Date Range - End Date"
      },
      fieldIncomeLabelText: "Income",
      fieldsetDetails: {
        titleText: "Details",
        fieldContainerPhone: {
          labelText: "Phone",
          fieldPhone1LabelText: "Phone 1",
          fieldPhone2LabelText: "Phone 2",
          fieldPhone3LabelText: "Phone 3"
        },
        fieldContainerTimeWorked: {
          labelText: "Time Worked",
          fieldHoursLabelText: "Time worked - hours",
          fieldHoursDisplayText: "hours",
          fieldMinutesLabelText: "Time worked - minutes",
          fieldMinutesDisplayText: "minutes"
        },
        fieldContainerFullName: {
          labelText: "Full Name",
          fieldTitle: {
            labelText: "Title",
            combo: {
              mrName: "Mr",
              mrsName: "Mrs",
              missName: "Miss"
            }
          },
          fieldFirstNameLabelText: "Full Name - First",
          fieldLastNameLabelText: "Full Name - Last"
        }
      },
      docked: {
        insideFormBoundButtonSampleText: "Inside Form Bound Button Sample",
        secondClientValidationStatus: {
          validText: "Form is valid",
          invalidText: "Form is not valid"
        },

        loadTestDataText: "Load test data",
        resetText: "Reset",

        saveMultiStoreComponentsText: "Save - Load Multiple Components With Stores",
        saveMultiStoreComponentsWithMaskViewText: "Save - Load Multiple Components With Stores And Mask View",

        saveSingleStoreComponentText: "Save - Load Single Component With Store",
        saveSingleStoreComponentWithServerValidationText: "Save with Server Validation - Load Single Component With Store",

        saveMaskComponentsText: "Save - Mask Components",
        saveDisableComponentsText: "Save - Disable Components",
        firstServerValidationStatus: {
          text: "Server validation failed"
        },

        saveFormMaskDefaultText: "Save - Form Mask Default",
        saveFormMaskCustomText: "Save - Form Mask Custom",
        saveDisableFormButtonsText: "Save - Disable Form Buttons",
        sampleDisabledButtonText: "Sample Disabled Button"
      }
    },

    emailsGrid: {
      titleText: "Emails",
      columnFirstNameText: "First Name",
      columnLastNameText: "Last Name",
      columnEmailText: "Email"
    },

    phonesGrid: {
      titleText: "Phones",
      columnFirstNameText: "First Name",
      columnLastNameText: "Last Name",
      columnPhone1EmailText: "Phone"
    },

    outsideFormBoundButton1Text: "Outside Form Bound Button Sample 1",
    outsideFormBoundButton2Text: "Outside Form Bound Button Sample 2",
    outsideFormServerValidationStatus2: {
      text: "Failed on server"
    }
  },

  autoScroll: true, bodyPadding: 10,

  initComponent: function() {
    var me = this;

    Ext.applyIf(me, {
      items: [
        {
          reference: "employeeForm", formId: "demo.SimpleFormDemoView.EmployeeForm", xtype: "grich-core-component-form-AdvancedFormPanel", autoLoadFormConfigurationMaskingParentContainer: me,
          width: 800, bodyPadding: 10, border: true,
          defaults: { anchor: "100%", labelWidth: 100 },

          globalValidate: function() {
            var startDate, endDate, startDateField, endDateField;
            var basicForm = this.getForm();
            var globalErrorMessages = [];

            startDateField = basicForm.findField("startDate");
            endDateField = basicForm.findField("endDate");

            //noinspection JSUnresolvedVariable
            if (!this.globalValidateInitialized) {
              startDateField.on("change", basicForm.checkValidity, basicForm);
              endDateField.on("change", basicForm.checkValidity, basicForm);
              this.globalValidateInitialized = true;
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
              startDateField.validate();
              endDateField.validate();
            }

            return globalErrorMessages;
          },

          getOutsideFormBoundComponents: function() {
            return [me.lookupReference("outsideFormBoundButton1"), me.lookupReference("outsideFormBoundButton2")];
          },

          getOutsideFormClientValidationStatusComponents: function() {
            return me.lookupReference("outsideFormClientValidationStatus");
          },

          getOutsideFormServerValidationStatusComponents: function() {
            return [me.lookupReference("outsideFormServerValidationStatus1"), me.lookupReference("outsideFormServerValidationStatus2")];
          },

          items: [
            { reference: "emailAddressField", xtype: "textfield", name: "email", fieldLabel: me.i18n.employeeForm.fieldEmailLabelText || "Email Address" },
            {
              xtype: "fieldcontainer", fieldLabel: me.i18n.employeeForm.fieldContainerDateRange.labelText || "Date Range", layout: "hbox",
              defaults: { flex: 1, hideLabel: true },
              items: [
                { xtype: "datefield", name: "startDate", fieldLabel: me.i18n.employeeForm.fieldContainerDateRange.fieldStartDateLabelText || "Date Range - Start Date", margin: "0 5 0 0" },
                { xtype: "datefield", name: "endDate", fieldLabel: me.i18n.employeeForm.fieldContainerDateRange.fieldEndDateLabelText || "Date Range - End Date" }
              ]
            },
            { reference: "incomeField", xtype: "numberfield", name: "income", fieldLabel: me.i18n.employeeForm.fieldIncomeLabelText || "Income" },
            {
              xtype: "fieldset", title: me.i18n.employeeForm.fieldsetDetails.titleText || "Details", collapsible: true,
              defaults: {
                labelWidth: 90, anchor: "100%",
                layout: "hbox"
              },
              items: [
                {
                  reference: "phoneFieldContainer", xtype: "fieldcontainer", fieldLabel: me.i18n.employeeForm.fieldsetDetails.fieldContainerPhone.labelText || "Phone",
                  combineErrors: true, msgTarget: "side", defaults: { hideLabel: true },
                  items: [
                    { xtype: "displayfield", value: "(" },
                    { xtype: "textfield", fieldLabel: me.i18n.employeeForm.fieldsetDetails.fieldContainerPhone.fieldPhone1LabelText || "Phone 1", name: "phone1", width: 45, margin: "0 5 0 5" },
                    { xtype: "displayfield", value: ")" },
                    { xtype: "textfield", fieldLabel: me.i18n.employeeForm.fieldsetDetails.fieldContainerPhone.fieldPhone2LabelText || "Phone 2", name: "phone2", width: 45, margin: "0 5 0 10" },
                    { xtype: "displayfield", value: "-" },
                    { xtype: "textfield", fieldLabel: me.i18n.employeeForm.fieldsetDetails.fieldContainerPhone.fieldPhone3LabelText || "Phone 3", name: "phone3", width: 90, margin: "0 0 0 5" }
                  ]
                },
                {
                  xtype: "fieldcontainer", fieldLabel: me.i18n.employeeForm.fieldsetDetails.fieldContainerTimeWorked.labelText || "Time worked",
                  defaults: { hideLabel: true },
                  items: [
                    { xtype: "numberfield", name: "hours", width: 80, fieldLabel: me.i18n.employeeForm.fieldsetDetails.fieldContainerTimeWorked.fieldHoursLabelText || "Time worked - hours" },
                    { xtype: "displayfield", value: me.i18n.employeeForm.fieldsetDetails.fieldContainerTimeWorked.fieldHoursDisplayText || "hours", margin: "0 25 0 15" },
                    { xtype: "numberfield", name: "minutes", width: 70, fieldLabel: me.i18n.employeeForm.fieldsetDetails.fieldContainerTimeWorked.fieldMinutesLabelText || "Time worked - mins" },
                    { xtype: "displayfield", value: me.i18n.employeeForm.fieldsetDetails.fieldContainerTimeWorked.fieldMinutesDisplayText || "minutes", margin: "0 0 0 15" }
                  ]
                },
                {
                  reference: "fullNameField", xtype: "fieldcontainer", fieldLabel: me.i18n.employeeForm.fieldsetDetails.fieldContainerFullName.labelText || "Full Name",
                  combineErrors: true, msgTarget: "side", defaults: { hideLabel: true },
                  items: [
                    {
                      xtype: "combo", name: "title", fieldLabel: me.i18n.employeeForm.fieldsetDetails.fieldContainerFullName.fieldTitle.labelText || "Title",
                      displayField: "name", valueField: "value", value: "mrs",
                      triggerAction: "all", queryMode: "local", forceSelection: true, editable: false,
                      width: 90, margin: "0 5 0 0",
                      store: Ext.create("Ext.data.Store", {
                        fields: ["name", "value"],
                        data: [
                          { name: me.i18n.employeeForm.fieldsetDetails.fieldContainerFullName.fieldTitle.combo.mrName || "Mr", value: "mr" },
                          { name: me.i18n.employeeForm.fieldsetDetails.fieldContainerFullName.fieldTitle.combo.mrsName || "Mrs", value: "mrs" },
                          { name: me.i18n.employeeForm.fieldsetDetails.fieldContainerFullName.fieldTitle.combo.missName || "Miss", value: "miss" }
                        ]
                      })
                    },
                    {
                      xtype: "textfield", name: "firstName", flex: 1, margin: "0 5 0 0",
                      fieldLabel: me.i18n.employeeForm.fieldsetDetails.fieldContainerFullName.fieldFirstNameLabelText || "Full Name - First"
                    },
                    {
                      xtype: "textfield", name: "lastName", flex: 1,
                      fieldLabel: me.i18n.employeeForm.fieldsetDetails.fieldContainerFullName.fieldLastNameLabelText || "Full Name - Last"
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
                { xtype: "button", text: me.i18n.employeeForm.docked.insideFormBoundButtonSampleText || "Inside Form Bound Button Sample", disabled: true, formBind: true },
                { xtype: "grich-core-component-form-ClientValidationStatus" },
                {
                  xtype: "grich-core-component-form-ClientValidationStatus",
                  validText: me.i18n.employeeForm.docked.secondClientValidationStatus.validText || "Form is valid",
                  invalidText: me.i18n.employeeForm.docked.secondClientValidationStatus.invalidText || "Form is not valid"
                },
                { xtype: "component", flex: 1 },
                { xtype: "grich-core-component-form-ServerValidationStatus" },
                { xtype: "button", text: me.i18n.employeeForm.docked.loadTestDataText || "Load test data", handler: "employeeFormLoadTestData" },
                { xtype: "button", text: me.i18n.employeeForm.docked.resetText || "Reset", handler: "employeeFormReset" }
              ]
            },
            {
              xtype: "toolbar", dock: "bottom",
              items: [
                { xtype: "button", text: me.i18n.employeeForm.docked.saveMultiStoreComponentsText || "Save - Load Multiple Components With Stores", handler: "saveMultiStoreComponents" },
                {
                  xtype: "button", text: me.i18n.employeeForm.docked.saveMultiStoreComponentsWithMaskViewText || "Save - Load Multiple Components With Stores And Mask View",
                  handler: "saveMultiStoreComponentsWithMaskViewText"
                }
              ]
            },
            {
              xtype: "toolbar", dock: "bottom",
              items: [
                { xtype: "button", text: me.i18n.employeeForm.docked.saveSingleStoreComponentText || "Save - Load Single Component With Store", handler: "saveSingleStoreComponent" },
                {
                  xtype: "button", text: me.i18n.employeeForm.docked.saveSingleStoreComponentWithServerValidationText || "Save with Server Validation - Load Single Component With Store",
                  handler: "saveSingleStoreComponentWithServerValidation"
                }
              ]
            },
            {
              xtype: "toolbar", dock: "bottom",
              items: [
                { xtype: "button", text: me.i18n.employeeForm.docked.saveMaskComponentsText || "Save - Mask Components", handler: "saveMaskComponents" },
                { xtype: "button", text: me.i18n.employeeForm.docked.saveDisableComponentsText || "Save - Disable Components", handler: "saveDisableComponents" },
                { xtype: "component", flex: 1 },
                { xtype: "grich-core-component-form-ServerValidationStatus", text: me.i18n.employeeForm.docked.firstServerValidationStatus.text || "Server validation failed" }
              ]
            },
            {
              xtype: "toolbar", dock: "bottom",
              items: [
                { xtype: "button", text: me.i18n.employeeForm.docked.saveFormMaskDefaultText || "Save - Form Mask Default", handler: "saveFormMaskDefault" },
                { xtype: "button", text: me.i18n.employeeForm.docked.saveFormMaskCustomText || "Save - Form Mask Custom", handler: "saveFormMaskCustom" },
                { xtype: "button", text: me.i18n.employeeForm.docked.saveDisableFormButtonsText || "Save - Disable Form Buttons", handler: "saveDisableFormButtons" },
                { xtype: "button", text: me.i18n.employeeForm.docked.sampleDisabledButtonText || "Sample Disabled Button", disabled: true }
              ]
            }
          ]
        },
        {
          reference: "emailsGrid", xtype: "grid", title: me.i18n.emailsGrid.titleText || "Emails",
          bind: {
            store: "{simpleFormDemoEmailStore}"
          },
          width: 800, height: 200, border: true, margin: "10 0 0 0",
          columns: [
            { text: me.i18n.emailsGrid.columnFirstNameText || "First Name",  dataIndex: "firstName" },
            { text: me.i18n.emailsGrid.columnLastNameText || "Last Name",  dataIndex: "lastName" },
            { text: me.i18n.emailsGrid.columnEmailText || "Email", dataIndex: "email", flex: 1 }
          ]
        },
        {
          reference: "phonesGrid", xtype: "grid", title: me.i18n.phonesGrid.titleText || "Phones",
          bind: {
            store: "{simpleFormDemoPhoneStore}"
          },
          width: 800, height: 200, border: true, margin: "10 0 5 0",
          columns: [
            { text: me.i18n.phonesGrid.columnFirstNameText || "First Name",  dataIndex: "firstName" },
            { text: me.i18n.phonesGrid.columnLastNameText || "Last Name",  dataIndex: "lastName" },
            {
              text: me.i18n.phonesGrid.columnPhone1EmailText || "Phone", dataIndex: "phone1", flex: 1,
              renderer: function(value, metaData, record) {
                return record.get("phone1") + "-" + record.get("phone2") + "-" + record.get("phone3");
              }
            }
          ]
        },
        { reference: "outsideFormBoundButton1", xtype: "button", text: me.i18n.outsideFormBoundButton1Text || "Outside Form Bound Button Sample 1", disabled: true, margin: "5 0 0 0" },
        { reference: "outsideFormBoundButton2", xtype: "button", text: me.i18n.outsideFormBoundButton2Text || "Outside Form Bound Button Sample 2", disabled: true, margin: "5 0 0 5" },
        { reference: "outsideFormClientValidationStatus", xtype: "grich-core-component-form-ClientValidationStatus", margin: "5 0 0 5" },
        { reference: "outsideFormServerValidationStatus1", xtype: "grich-core-component-form-ServerValidationStatus", margin: "5 0 0 5" },
        {
          reference: "outsideFormServerValidationStatus2", xtype: "grich-core-component-form-ServerValidationStatus", margin: "5 0 0 5",
          text: me.i18n.outsideFormServerValidationStatus2.text || "Failed on server"
        }
      ]
    });

    me.callParent();
  }
});
