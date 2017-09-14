Ext.define("riznica.samplemodule.personnel.view.PersonnelViewController", {
  extend: "Ext.app.ViewController",

  alias: "controller.samplemodule-personnel-view-PersonnelViewController",

  onPersonnelListItemSelected: function(sender, record) {
    console.log("ID: "+record.data.id);
    Ext.Msg.confirm("Confirm", "Are you sure?", function(choice){
        if (choice === "yes") {

            var me = Ext.ComponentQuery.query('#gridPanel')[0];
            var data = record.data;
            delete data.class;

            grich.core.util.AjaxSubmitHelper.invokeRequest({
                url: riznica.configuration.contextPath + "/api/person/delete",
                method: "POST",
                maskComponents: { component: me },
                jsonData: Ext.util.JSON.encode(data),
                scope: me,
                async: false,
                success: function(response, options, responseTextDecoded) {
                    if (responseTextDecoded.success === true) {

                        var notificationDescriptor = {
                            notification: {
                                severity: grich.core.util.NotificationUtils.NOTIFICATION_SEVERITY_INFO,
                                titleText: "Person deleted!!!",
                                contentText: "Success"
                            }
                        };
                        grich.core.util.NotificationUtils.showSuccessNotification(notificationDescriptor);

                        Ext.ComponentQuery.query('#gridPerson')[0].getStore().load();
                    }
                }
            });

            console.log("Test");
            console.log(record.data.id);
        }
    }, this);
  }
});
