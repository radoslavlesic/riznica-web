Ext.define("rbvt.core.infrastructure.RbVtSubmitHelperUtils", {
  requires: ["grich.core.util.AjaxSubmitHelper"],

  statics: {
    invokeRequest: function (url, jsonData, parentForm, additionalConfig) {
      var config = additionalConfig || { };

      grich.core.util.AjaxSubmitHelper.invokeRequest({
        url: rbvt.configuration.contextPath + url,
        method: "POST",
        jsonData: jsonData,
        maskComponents: parentForm,
        success: function (response, options, responseTextDecoded) {
          var result = responseTextDecoded.data;
          if (responseTextDecoded.success) {

            if (!config.leaveTabOpen) {
              Ext.GlobalEvents.fireEvent(rbvt.core.infrastructure.RbVtEvents.REMOVE_TOP_LEVEL_TAB);
            }
            if (Ext.isFunction(config.success)) {
              config.success.apply(config.successScope || parentForm, [result]);
            }
            else {
              rbvt.core.infrastructure.RbVtSubmitHelperUtils.createEntityAndAddTopLevelTab(config, result);
            }
          }
        }
      });
    },

    invokePreviewRequest: function (url, jsonData, parentForm, additionalConfig) {
      var config = additionalConfig || { };

      grich.core.util.AjaxSubmitHelper.invokeRequest({
        url: rbvt.configuration.contextPath + url,
        method: "POST",
        jsonData: jsonData,
        maskComponents: parentForm,
        success: function (response, options, responseTextDecoded) {
          var result = responseTextDecoded.data;
          if (responseTextDecoded.success) {

            if(result.entity.type == "Vacation") {
              result.formConfiguration.xtype = "request-vacation-view-RequestVacationDetailsView";
            }
            if(result.entity.type == "Travel") {
              result.formConfiguration.xtype = "request-travel-view-RequestTravelDetailsView";
            }
            if (!config.leaveTabOpen) {
              Ext.GlobalEvents.fireEvent(rbvt.core.infrastructure.RbVtEvents.REMOVE_TOP_LEVEL_TAB);
            }
            if (Ext.isFunction(config.success)) {
              config.success.apply(config.successScope || parentForm, [result]);
            }
            else {
              rbvt.core.infrastructure.RbVtSubmitHelperUtils.createEntityAndAddTopLevelTab(config, result);
            }
          }
        }
      });
    },

    entityFromData: function (entityRaw, config) {
      var className = entityRaw["class"].replace(".domain", "");
      var modelArray = className.replace("com.rb.vt", "rbvt").split(".");
      modelArray.splice(modelArray.length - 1, 0, "model");
      var modelName = modelArray.join(".") + "Model";
      var entity = Ext.create(modelName, entityRaw);

      if (config.copyInstance) {
        entity = entity.copyInstance();
      }
      return entity;
    },

    formXtype: function(responseData, config) {
      return config.forceXtype || responseData.formConfiguration.xtype;
    },

    createEntityAndAddTopLevelTab: function(config, decodedResponse) {
      var me = rbvt.core.infrastructure.RbVtSubmitHelperUtils;
      var tabConfig;
      // TODO maybe add existing tab finder
      var tabDescriptor = { forceNew: true };

      if (decodedResponse && decodedResponse.entity) {
        tabConfig = {
          title: config.tabTitle,
          xtype: me.formXtype(decodedResponse, config),
          viewModel: {
            data: { entity: me.entityFromData(decodedResponse.entity, config) }
          }
        };

        Ext.defer(function() {
          Ext.GlobalEvents.fireEvent(rbvt.core.infrastructure.RbVtEvents.ADD_TOP_LEVEL_TAB, { tabConfig: tabConfig, tabDescriptor: tabDescriptor });
        }, 1);
      }
    },

    invokeFilePreviewRequest: function(url, submitParams) {
      var hiddenForm, i, arrayLength, formItem, formItems = [];

      if (Ext.isArray(submitParams)) {
        arrayLength = submitParams.length;
        for (i = 0; i < arrayLength; i++) {
          formItem = {
            xtype: "hidden",
            name: submitParams[i].name,
            value: submitParams[i].value
          };

          formItems.push(formItem);
        }
      }

      hiddenForm = Ext.create("Ext.form.Panel", {
        standardSubmit: true,
        timeout: 45000,
        items: formItems
      });

      hiddenForm.getForm().submit({
        url: rbvt.AppConfig.contextPath + url,
        timeout: rbvt.core.infrastructure.RbVtConstants.REQUEST_TIMEOUT_SECONDS,
        target: "_blank"
      })
    }
  }
});
