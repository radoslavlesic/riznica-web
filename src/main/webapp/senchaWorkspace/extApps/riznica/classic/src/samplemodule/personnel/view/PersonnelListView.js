/**
 * This view is an example list of people.
 */
Ext.define("riznica.samplemodule.personnel.view.PersonnelListView", {
  extend: "Ext.grid.Panel",
  xtype: "samplemodule-personnel-view-PersonnelListView",

  requires: [
    "riznica.samplemodule.personnel.store.PersonnelStore",
    "riznica.samplemodule.personnel.view.PersonnelViewController"
  ],

  // title: "Personnel",

  controller: "samplemodule-personnel-view-PersonnelViewController",

  store: {
    type: "samplemodule-personnel-store-PersonnelStore"
  },

  columns: [
    { text: "Name", dataIndex: "name" },
    { text: "Email", dataIndex: "email", flex: 1 },
    { text: "Phone", dataIndex: "phone", flex: 1 }
  ],

  listeners: {
    select: "onPersonnelListItemSelected"
  }
});
