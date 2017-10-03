Ext.define("rbvt.core.view.search.AbstractSearchView", {
  extend: "Ext.panel.Panel",
  alias: "widget.core-AbstractSearchView",
  requires: [
    "Ext.button.Button",
    "Ext.form.FieldSet",
    "Ext.toolbar.Fill",
    "Ext.form.Panel",
    "Ext.form.action.StandardSubmit",
    "grich.core.component.form.ClientValidationStatus",
    "grich.core.component.form.ServerValidationStatus",
    "grich.core.util.AjaxSubmitHelper",
    "rbvt.core.infrastructure.RbVtRenderUtils"
  ],

  closable: true, scrollable: true, fieldsetTitle: "Search",

  config: {
    formXtype: "",
    formId: "",
    gridXtype: "",
    calendarGridXtype: "",
    store: null,
    detailsUrl: "",
    printable: false,
    printUrl: "",
    radioButtons: false
  },

  formConfig: {
    searchBarButtonStyle: rbvt.util.RbVtThemeUtils.searchBarButtonStyle
  },

  listeners: {
    afterrender: function () {
      var me = this;
      me.down("#resultsGrid").getStore().removeAll();
      rbvt.core.infrastructure.RbVtRenderUtils.applyDefaultWindowKeyMap(me, false, true);
      var searchForm = me.down("#searchForm");
      searchForm.getForm().getFields().getAt(0).focus([1000, 1000], true);
      searchForm.initializeClientValidationStatusComponents();
    }
  },

  layout: {type: "vbox", align: "center"},

  //Nije potrebno
  onFormConfigurationChange: function (formConfigurationData) {
    var me = this;
    if (formConfigurationData.formId.indexOf(me.getXType()) !== 0) {
      return;
    }

    me.formConfigurationManager.doApplyFormConfigurationOnSingleFormOrGridComponent(me.down("[formId='" + formConfigurationData.formId + "']"), formConfigurationData);
    me.down("[formId='" + formConfigurationData.formId + "']").getForm().isValid();
  },

  initComponent: function () {
    var me = this;
    var cond = this.xtype != "reports-vacation-view-VacationStatusReportView";
    me.formConfigurationManager = grich.core.form.FormConfigurationManager;

    Ext.applyIf(me, {
      items: [
        {
          xtype: "fieldset", title: me.fieldsetTitle,
          padding: 10,
          margin: 10,
          itemId: "searchFormFieldSet",
          //flex: 1,
          layout: {type: "vbox", align: "center"},
          items: [
            {
              xtype: me.config.formXtype,
              width: cond ? 1200 : 1450,
              itemId: "searchForm",
              formId: me.config.formId,
              border: false,
              standardSubmit: true,
              dockedItems: [
                {
                  xtype: "toolbar", dock: "bottom", defaults: {minWidth: 75}, layout: {pack: "end"},
                  items: [
                    {
                      xtype: "fieldcontainer",
                      defaultType: "radiofield",
                      layout: "vbox",
                      hidden: !me.config.radioButtons,
                      items: [{
                        boxLabel: "Employee",
                        name: "radioGroup",
                        itemId: "employeeRadioButton",
                        inputValue: "em",
                        value: true,
                        listeners: {
                          change: function (newValue) {
                            me.handleMultiResultsView(newValue);
                          }
                        }
                      },
                        {
                          boxLabel: "Request",
                          name: "radioGroup",
                          itemId: "requestRadioButton",
                          inputValue: "rq"
                        }]
                    },
                    "->",
                    {xtype: "grich-core-component-form-ServerValidationStatus", minWidth: 16},
                    {
                      xtype: "grich-core-component-form-ClientValidationStatus",
                      minWidth: 16,
                      validText: [],
                      invalidText: "",
                      margin: "0 5 0 0"
                    },
                    {
                      xtype: "button",
                      text: '<div style="color: white">Search</div>',
                      formBind: true,
                      itemId: "btnPretrazi",
                      style: me.formConfig.searchBarButtonStyle,
                      handler: function (config) {

                        var myForm = me.down("form");
                        var criteria = myForm.getForm().getNestedValues();

                        if (this.up().up().xtype == "search-request-RequestSearchFormView") {
                          var employees = [];
                          var countries = [];
                          var functions = [];
                          this.up().up().down("#employee").getStore().each(function (record) {
                            employees.push(record.data.id);
                          });
                          this.up().up().down("#functions").getStore().each(function (record) {
                            functions.push(record.data.id);
                          });
                          this.up().up().down("#country").getStore().each(function (record) {
                            countries.push(record.data.id);
                          });
                          delete criteria.usersCombo;
                          criteria.employees = employees;
                          criteria.countries = countries;
                          criteria.functions = functions;
                        }

                        if (this.up().up().xtype == "reports-sickness-view-SicknessStatusReportFormView") {
                          var employees = [];
                          var countries = [];
                          var functions = [];
                          var managers = [];
                          this.up().up().down("#employee").getStore().each(function (record) {
                            employees.push(record.data.id);
                          });
                          this.up().up().down("#manager").getStore().each(function (record) {
                            managers.push(record.data.id);
                          });
                          this.up().up().down("#functions").getStore().each(function (record) {
                            functions.push(record.data);
                          });
                          this.up().up().down("#country").getStore().each(function (record) {
                            countries.push(record.data);
                          });
                          delete criteria.usersCombo;
                          criteria.employees = employees;
                          criteria.countries = countries;
                          criteria.functions = functions;
                          criteria.managers = managers;
                        }
                        if (this.up().up().xtype == "reports-vacationtobeused-view-VacationToBeUsedStatusReportFormView") {
                          var employees = [];
                          var countries = [];
                          var superiors = [];
                          this.up().up().down("#employee").getStore().each(function (record) {
                            employees.push(record.data.id);
                          });
                          this.up().up().down("#manager").getStore().each(function (record) {
                            superiors.push(record.data.id);
                          });
                          this.up().up().down("#country").getStore().each(function (record) {
                            countries.push(record.data);
                          });
                          delete criteria.usersCombo;
                          criteria.employees = employees;
                          criteria.countries = countries;
                          criteria.superiors = superiors;
                        }
                        var xtype = this.up().up().xtype;
                        if (xtype === "search-history-HistorySearchFormView") {
                          var countryList = [];
                          var employeeList = [];
                          this.up().up().down("#countryGrid").getStore().each(function (record) {
                            countryList.push(record.data.id);
                          });
                          this.up().up().down("#employeeGrid").getStore().each(function (record) {
                            employeeList.push(record.data.id);
                          });
                          delete criteria.usersCombo;
                          criteria.countryGrid = countryList;
                          criteria.employeeGrid = employeeList;

                        }
                        if (this.up().up().xtype == "reports-travel-view-TravelStatusReportFormView") {
                          var employees = [];
                          var countries = [];
                          var functions = [];
                          var managers = [];
                          var destinationCountries = [];
                          this.up().up().down("#employee").getStore().each(function (record) {
                            employees.push(record.data.id);
                          });
                          this.up().up().down("#manager").getStore().each(function (record) {
                            managers.push(record.data.id);
                          });
                          this.up().up().down("#functions").getStore().each(function (record) {
                            functions.push(record.data);
                          });
                          this.up().up().down("#country").getStore().each(function (record) {
                            countries.push(record.data);
                          });
                          this.up().up().down("#destinationCountry").getStore().each(function (record) {
                            destinationCountries.push(record.data);
                          });
                          delete criteria.usersCombo;
                          criteria.employees = employees;
                          criteria.countries = countries;
                          criteria.functions = functions;
                          criteria.managers = managers;
                          criteria.destinationCountries = destinationCountries;
                        }

                        if (this.up().up().xtype == "reports-vacation-view-VacationStatusReportFormView") {
                          var employees = [];
                          var countries = [];
                          var functions = [];
                          var managers = [];
                          this.up().up().down("#employee").getStore().each(function (record) {
                            employees.push(record.data.id);
                          });
                          this.up().up().down("#manager").getStore().each(function (record) {
                            managers.push(record.data.id);
                          });
                          this.up().up().down("#functions").getStore().each(function (record) {
                            functions.push(record.data.id);
                          });
                          this.up().up().down("#country").getStore().each(function (record) {
                            countries.push(record.data.id);
                          });
                          delete criteria.usersCombo;
                          criteria.employees = employees;
                          criteria.countries = countries;
                          criteria.functions = functions;
                          criteria.managers = managers;

                          var roles = rbvt.configuration.security.authorityList;
                          var currentUser = rbvt.configuration.security.currentEmployee;
                          if(Ext.Array.contains(roles, "ROLE_MANAGER")) {
                            if(criteria.countries.length == 0) {
                              criteria.countries.push(currentUser.country.id);
                            }
                            if(criteria.managers.length == 0) {
                              criteria.managers.push(currentUser.id);
                            }
                          }
                          if(Ext.Array.contains(roles, "ROLE_ADMIN_COUNTRY")) {
                            if(criteria.countries.length == 0) {
                              this.up().up().down("#countryCombo").comboStore.each(function (record) {
                                criteria.countries.push(record.data.id);
                              });
                            }
                          }

                        }

                        var resultsGrid = me.down("#resultsGrid");
                        var resultsStore = resultsGrid.getStore();

                        resultsStore.getProxy().extraParams = {};
                        Ext.Object.each(criteria, function (key, value) {
                          if (key.toLowerCase().indexOf("internaltype") >= 0) {
                            resultsStore.getProxy().setExtraParam(key, value.id);
                          }
                          else {
                            resultsStore.getProxy().setExtraParam(key, value);
                          }
                        });
                        resultsStore.loadPage(1);

                      }
                    },
                    {
                      xtype: "button",
                      text: '<div style="color: white">Search</div>',
                      formBind: true,
                      hidden: true,
                      itemId: "searchVacationCalendarReport",
                      style: me.formConfig.searchBarButtonStyle,
                      handler: function () {
                        var submitData = me.down("form").getForm().getNestedValues();
                        var y = me.down("#yearCombo").selection.data.year;
                        if (this.up().up().xtype == "reports-vacation-view-VacationStatusReportFormView") {
                          var employees = [];
                          var countries = [];
                          var functions = [];
                          var managers = [];
                          var months = [];

                          this.up().up().down("#month").getStore().each(function (record) {
                            months.push(record.data.id);
                          });
                          this.up().up().down("#employee").getStore().each(function (record) {
                            employees.push(record.data.id);
                          });
                          this.up().up().down("#manager").getStore().each(function (record) {
                            managers.push(record.data.id);
                          });
                          this.up().up().down("#functions").getStore().each(function (record) {
                            functions.push(record.data.id);
                          });
                          this.up().up().down("#country").getStore().each(function (record) {
                            countries.push(record.data.id);
                          });
                          delete submitData.usersCombo;
                          delete submitData.radioGroup;
                          submitData.employees = employees;
                          submitData.countries = countries;
                          submitData.functions = functions;
                          submitData.managers = managers;
                          submitData.months = months;
                          submitData.start = 0;
                          submitData.limit = 0;

                          var roles = rbvt.configuration.security.authorityList;
                          var currentUser = rbvt.configuration.security.currentEmployee;
                          if(Ext.Array.contains(roles, "ROLE_MANAGER")) {
                            if(submitData.countries.length == 0) {
                              submitData.countries.push(currentUser.country.id);
                            }
                            if(submitData.managers.length == 0) {
                              submitData.managers.push(currentUser.id);
                            }
                          }
                          if(Ext.Array.contains(roles, "ROLE_ADMIN_COUNTRY")) {
                            if(submitData.countries.length == 0) {
                              this.up().up().down("#countryCombo").comboStore.each(function (record) {
                                submitData.countries.push(record.data.id);
                              });
                            }
                          }

                          grich.core.util.AjaxSubmitHelper.invokeRequest({
                            url: rbvt.configuration.contextPath + "/api/reports/vacationStatusReport/generateCalendarReport",
                            method: "POST",
                            maskComponents: {component: me},
                            jsonData: submitData,
                            scope: me,
                            async: false,
                            success: function (response, options, responseTextDecoded) {
                              if (responseTextDecoded.success === true) {
                                var m = months;
                                var year = y;
                                var calendarView = this.down("#calendarResults");
                                calendarView.removeAll();
                                var legend = rbvt.core.infrastructure.RbVtRenderUtils.generateCalendarLegend();
                                calendarView.insert(legend);
                                for (var i = 0; i < responseTextDecoded.data.length; i++) {
                                  var mm = m.length > 0 ? m[i] : i+1;
                                  var grid = rbvt.core.infrastructure.RbVtRenderUtils.generateCalendarOverview(year, mm, responseTextDecoded.data[i]);
                                  calendarView.insert(grid);
                                }
                              }
                            }
                          });

                        }
                      }
                    },
                    {
                      xtype: "button",
                      text: '<div style="color: white">Generate report</div>',
                      hidden: !me.config.printable,
                      itemId: "btnIspisi",
                      formBind: true,
                      style: me.formConfig.searchBarButtonStyle,
                      handler: function () {
                        var resultsGrid = me.down("#resultsGrid");
                        var resultsStore = resultsGrid.getStore();
                        var sortBy = "", sortDirection = "";

                        if (resultsStore.sorters && resultsStore.sorters.items) {
                          var sortedColumns = resultsStore.sorters.items;
                          if (sortedColumns.length > 0) {
                            sortBy = sortedColumns[0].property;
                            sortDirection = sortedColumns[0].direction;
                          }
                        }
                        var submitData = me.down("form").getForm().getNestedValues();
                        submitData.sortBy = sortBy ? sortBy : null;
                        submitData.sortDirection = sortDirection ? sortDirection : null;

                        if (this.up().up().xtype == "search-request-RequestSearchFormView") {
                          var employees = [];
                          var countries = [];
                          var functions = [];
                          this.up().up().down("#employee").getStore().each(function (record) {
                            employees.push(record.data.id);
                          });
                          this.up().up().down("#functions").getStore().each(function (record) {
                            functions.push(record.data.id);
                          });
                          this.up().up().down("#country").getStore().each(function (record) {
                            countries.push(record.data.id);
                          });
                          delete submitData.usersCombo;
                          submitData.employees = employees;
                          submitData.countries = countries;
                          submitData.functions = functions;
                        }

                        if (this.up().up().xtype == "reports-sickness-view-SicknessStatusReportFormView") {
                          var employees = [];
                          var countries = [];
                          var functions = [];
                          var managers = [];
                          this.up().up().down("#employee").getStore().each(function (record) {
                            employees.push(record.data.id);
                          });
                          this.up().up().down("#manager").getStore().each(function (record) {
                            managers.push(record.data.id);
                          });
                          this.up().up().down("#functions").getStore().each(function (record) {
                            functions.push(record.data.id);
                          });
                          this.up().up().down("#country").getStore().each(function (record) {
                            countries.push(record.data.id);
                          });
                          delete submitData.usersCombo;
                          submitData.employees = employees;
                          submitData.countries = countries;
                          submitData.functions = functions;
                          submitData.managers = managers;
                        }
                        if (this.up().up().xtype == "reports-vacationtobeused-view-VacationToBeUsedStatusReportFormView") {
                          var employees = [];
                          var countries = [];
                          var superiors = [];
                          this.up().up().down("#employee").getStore().each(function (record) {
                            employees.push(record.data.id);
                          });
                          this.up().up().down("#manager").getStore().each(function (record) {
                            superiors.push(record.data.id);
                          });
                          this.up().up().down("#country").getStore().each(function (record) {
                            countries.push(record.data.id);
                          });
                          delete submitData.usersCombo;
                          submitData.employees = employees;
                          submitData.countries = countries;
                          submitData.superiors = superiors;
                        }

                        if (this.up().up().xtype == "reports-travel-view-TravelStatusReportFormView") {
                          var employees = [];
                          var countries = [];
                          var functions = [];
                          var managers = [];
                          var destinationCountry = [];
                          this.up().up().down("#employee").getStore().each(function (record) {
                            employees.push(record.data.id);
                          });
                          this.up().up().down("#manager").getStore().each(function (record) {
                            managers.push(record.data.id);
                          });
                          this.up().up().down("#functions").getStore().each(function (record) {
                            functions.push(record.data.id);
                          });
                          this.up().up().down("#country").getStore().each(function (record) {
                            countries.push(record.data.id);
                          });
                          this.up().up().down("#destinationCountry").getStore().each(function (record) {
                            destinationCountry.push(record.data.id);
                          });
                          delete submitData.usersCombo;
                          submitData.employees = employees;
                          submitData.countries = countries;
                          submitData.functions = functions;
                          submitData.managers = managers;
                          submitData.destinationCountries = destinationCountry;
                        }
                        var xtype = this.up().up().xtype;
                        if (xtype === "search-history-HistorySearchFormView") {
                          var countryList = [];
                          var employeeList = [];
                          this.up().up().down("#countryGrid").getStore().each(function (record) {
                            countryList.push(record.data.id);
                          });
                          this.up().up().down("#employeeGrid").getStore().each(function (record) {
                            employeeList.push(record.data.id);
                          });
                          delete submitData.usersCombo;
                          submitData.countryGrid = countryList;
                          submitData.employeeGrid = employeeList;

                        }

                        if (this.up().up().xtype == "reports-vacation-view-VacationStatusReportFormView") {
                          var employees = [];
                          var countries = [];
                          var functions = [];
                          var managers = [];
                          this.up().up().down("#employee").getStore().each(function (record) {
                            employees.push(record.data.id);
                          });
                          this.up().up().down("#manager").getStore().each(function (record) {
                            managers.push(record.data.id);
                          });
                          this.up().up().down("#functions").getStore().each(function (record) {
                            functions.push(record.data.id);
                          });
                          this.up().up().down("#country").getStore().each(function (record) {
                            countries.push(record.data.id);
                          });
                          delete submitData.usersCombo;
                          submitData.employees = employees;
                          submitData.countries = countries;
                          submitData.functions = functions;
                          submitData.managers = managers;

                          var roles = rbvt.configuration.security.authorityList;
                          var currentUser = rbvt.configuration.security.currentEmployee;
                          if(Ext.Array.contains(roles, "ROLE_MANAGER")) {
                            if(submitData.countries.length == 0) {
                              submitData.countries.push(currentUser.country.id);
                            }
                            if(submitData.managers.length == 0) {
                              submitData.managers.push(currentUser.id);
                            }
                          }
                          if(Ext.Array.contains(roles, "ROLE_ADMIN_COUNTRY")) {
                            if(submitData.countries.length == 0) {
                              this.up().up().down("#countryCombo").comboStore.each(function (record) {
                                submitData.countries.push(record.data.id);
                              });
                            }
                          }

                        }

                        Ext.Object.each(submitData, function (key, value) {
                          if (Ext.isDate(value)) {
                            submitData[key] = value.toJSON();
                          }
                        });
                        var hiddenForm = Ext.create('Ext.form.Panel', {
                          standardSubmit: true,
                          timeout: 45000
                        });
                        hiddenForm.getForm().submit({
                          url: rbvt.configuration.contextPath + me.config.printUrl,
                          target: "_self",
                          params: submitData
                        });
                      }
                    },
                    {
                      xtype: "button",
                      text: '<div style="color: white">Generate report</div>',
                      hidden: true,
                      itemId: "btnIspisiVacationCalendarReport",
                      formBind: true,
                      style: me.formConfig.searchBarButtonStyle,
                      handler: function () {
                        var submitData = me.down("form").getForm().getNestedValues();
                        var y = me.down("#yearCombo").selection.data.year;
                        if (this.up().up().xtype == "reports-vacation-view-VacationStatusReportFormView") {
                          var employees = [];
                          var countries = [];
                          var functions = [];
                          var managers = [];
                          var months = [];

                          this.up().up().down("#month").getStore().each(function (record) {
                            months.push(record.data.id);
                          });
                          this.up().up().down("#employee").getStore().each(function (record) {
                            employees.push(record.data.id);
                          });
                          this.up().up().down("#manager").getStore().each(function (record) {
                            managers.push(record.data.id);
                          });
                          this.up().up().down("#functions").getStore().each(function (record) {
                            functions.push(record.data.id);
                          });
                          this.up().up().down("#country").getStore().each(function (record) {
                            countries.push(record.data.id);
                          });
                          delete submitData.usersCombo;
                          delete submitData.radioGroup;
                          submitData.employees = employees;
                          submitData.countries = countries;
                          submitData.functions = functions;
                          submitData.managers = managers;
                          submitData.months = months;
                          submitData.start = 0;
                          submitData.limit = 0;

                          var roles = rbvt.configuration.security.authorityList;
                          var currentUser = rbvt.configuration.security.currentEmployee;
                          if(Ext.Array.contains(roles, "ROLE_MANAGER")) {
                            if(submitData.countries.length == 0) {
                              submitData.countries.push(currentUser.country.id);
                            }
                            if(submitData.managers.length == 0) {
                              submitData.managers.push(currentUser.id);
                            }
                          }
                          if(Ext.Array.contains(roles, "ROLE_ADMIN_COUNTRY")) {
                            if(submitData.countries.length == 0) {
                              this.up().up().down("#countryCombo").comboStore.each(function (record) {
                                submitData.countries.push(record.data.id);
                              });
                            }
                          }

                          Ext.Object.each(submitData, function (key, value) {
                            if (Ext.isDate(value)) {
                              submitData[key] = value.toJSON();
                            }
                          });
                          var hiddenForm = Ext.create('Ext.form.Panel', {
                            standardSubmit: true,
                            timeout: 45000
                          });
                          hiddenForm.getForm().submit({
                            url: rbvt.configuration.contextPath + "/api/reports/vacationStatusReport/getXLSCalendarReport?X-CSRF-Token=" + grich.core.security.CsrfAjaxManager.token,
                            target: "_self",
                            params: submitData
                          });

                        }
                      }
                    },
                    {
                      xtype: "button",
                      text: '<div style="color: white">Clear filters</div>',
                      hidden: !me.config.reset,
                      itemId: "btnObrisiKateg",
                      style: me.formConfig.searchBarButtonStyle,
                      handler: function () {
                        this.up("form").getForm().reset();
                      }
                    },
                    {
                      xtype: "button",
                      text: '<div style="color: white">Cancel</div>',
                      itemId: "btnOdustani",
                      scope: me,
                      style: me.formConfig.searchBarButtonStyle,
                      handler: function () {
                        this.up("tabpanel").getActiveTab().close();
                      }

                    }
                  ]
                }
              ]
            },
            {
              xtype: "grich-core-component-form-AdvancedFormPanel",
              title: "Search results",
              itemId: "searchResultFieldSet",
              margin: "5 0 0 0",
              flex: 1,
              width: cond ? 1200 : 1450,
              layout: "fit",
              items: [
                {
                  xtype: me.config.gridXtype,
                  itemId: "resultsGrid",
                  store: me.config.store,
                  listeners: {
                    itemdblclick: function (grid, record) {
                      me.fetchEntityData(record.getId());
                    }
                  }
                }
              ]
            },
            {
              xtype: "grich-core-component-form-AdvancedFormPanel",
              title: "Calendar view",
              itemId: "calendarResultFieldSet",
              margin: "5 0 0 0",
              flex: 1,
              width: 1450,
              layout: "fit",
              hidden: true,
              items: [
                {
                  xtype: me.config.calendarGridXtype,
                  itemId: "calendarResults"
                }
              ]
            }
          ]
        }
      ]
    });
    me.callParent(arguments);
  },
  fetchEntityData: "",
  handleMultiResultsView: ""

});
