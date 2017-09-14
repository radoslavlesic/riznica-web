Ext.define("riznica.misc.model.AboutModel", {
  extend: "Ext.data.Model",

  fields: [
    { name: "name", type: "string" },
    { name: "longName", type: "string" },
    { name: "version", type: "string" },
    { name: "grailsVersion", type: "string" },
    { name: "build", type: "string" },
    { name: "description", type: "string" },
    { name: "author", type: "string" },
    { name: "developmentTeam", type: "auto" },
    { name: "supportContact", type: "string" },
    { name: "startupTime", type: "date", dateFormat: "c" }
  ]
});
