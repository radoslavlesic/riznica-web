Ext.define("riznica.demo.model.FormDemoEmployeeModel", {
  extend: "Ext.data.Model",

  fields: [
    { name: "id", type: "int", defaultValue: null, allowNull: true },
    { name: "version", type: "int", defaultValue: null, allowNull: true },
    { name: "email", type: "string", defaultValue: null, allowNull: true },
    { name: "firstName", type: "string", defaultValue: null, allowNull: true },
    { name: "lastName", type: "string", defaultValue: null, allowNull: true },
    { name: "title", type: "string", defaultValue: null, allowNull: true },
    { name: "startDate", type: "date", defaultValue: null, dateFormat: "c" },
    { name: "endDate", type: "date", defaultValue: null, dateFormat: "c" },
    { name: "income", type: "float", defaultValue: null, allowNull: true },
    { name: "hours", type: "int", defaultValue: null, allowNull: true },
    { name: "minutes", type: "int", defaultValue: null, allowNull: true },
    { name: "phone1", type: "string", defaultValue: null, allowNull: true },
    { name: "phone2", type: "string", defaultValue: null, allowNull: true },
    { name: "phone3", type: "string", defaultValue: null, allowNull: true }
  ]
});
