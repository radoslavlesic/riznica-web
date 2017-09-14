Ext.define('grich.overrides.core.form.FormConfigurationManager', {
  override: 'grich.core.form.FormConfigurationManager',

  doApplyFormConfigurationOnSingleFormOrGridComponent: function(formIdComponentOrContainer, formConfiguration) {
    var me = this;
    var formId, formFieldConfigurationList, isForm, isGrid, formIdComponent, formFieldsMixedCollection;
    var gridColumns, gridColumn, gridColumnEditor, formField, formFieldConfiguration, fieldPropertyConfigurationList, fieldPropertyConfiguration, fieldPropertyName, fieldPropertyValue;
    var i, arrayLength, j, jArrayLength, k, kArrayLength;

    if (!Ext.isObject(formConfiguration) || Ext.Object.isEmpty(formConfiguration)
        || Ext.isEmpty(formConfiguration.formId) || Ext.isEmpty(formConfiguration.formId.trim())
        || !Ext.isArray(formConfiguration.formFieldConfigurationList))
    {
      //<debug>
      console.log('Next message is from ' + Ext.getClassName(me) + '.' + arguments.callee.$name + ': arguments: ', arguments);
      console.log('Invalid formConfiguration param is passed in. Returning without applying form configuration... ', formConfiguration);
      //</debug>

      return false;
    }

    if (!Ext.isObject(formIdComponentOrContainer) || Ext.Object.isEmpty(formIdComponentOrContainer) || !formIdComponentOrContainer.isComponent) {
      //<debug>
      console.log('Next message is from ' + Ext.getClassName(me) + '.' + arguments.callee.$name + ': arguments: ', arguments);
      console.log('Invalid formIdComponentOrContainer param is passed in. Returning without applying form configuration... ', formIdComponentOrContainer);
      //</debug>

      return false;
    }

    formId = formConfiguration.formId;

    //noinspection JSCheckFunctionSignatures
    isForm = formIdComponentOrContainer.isXType('form');
    //noinspection JSCheckFunctionSignatures
    isGrid = formIdComponentOrContainer.isXType('grid');

    //noinspection JSUnresolvedVariable
    if (!isForm && !isGrid && !formIdComponentOrContainer.isContainer) {
      //<debug>
      console.log('Next message is from ' + Ext.getClassName(me) + '.' + arguments.callee.$name + ': arguments: ', arguments);
      console.log('formIdComponentOrContainer is not form, nor grid, nor container. Returning without applying form configuration... ', formIdComponentOrContainer);
      //</debug>

      return false;
    }

    if (isForm || isGrid) {
      formIdComponent = formIdComponentOrContainer;
    }
    // it is a container which is neither form nor grid
    else {
      //noinspection JSUnresolvedFunction
      formIdComponent = formIdComponentOrContainer.down('[formId="' + formId + '"]');

      if (formIdComponent) {
        if (formIdComponent.isXType('form')) {
          isForm = true;
        }
        else if (formIdComponent.isXType('grid')) {
          isGrid = true;
        }
      }
      else {
        //<debug>
        console.log('Next message is from ' + Ext.getClassName(me) + '.' + arguments.callee.$name + ': arguments: ', arguments);
        console.log('in the container, component with desired formId can not be found. Returning without applying form configuration... ', formIdComponentOrContainer);
        //</debug>

        return false;
      }
    }

    if (isForm) {
      formFieldsMixedCollection = formIdComponent.getForm().getFields();
    }
    else if (isGrid) {
      formFieldsMixedCollection = new Ext.util.MixedCollection();
      gridColumns = formIdComponent.getColumns();
      for (i = 0, arrayLength = gridColumns.length; i < arrayLength; i++) {
        gridColumn = gridColumns[i];
        if (gridColumn.hasOwnProperty('getEditor')) {
          gridColumnEditor = gridColumn.getEditor();
          if (gridColumnEditor) {
            formFieldsMixedCollection.add(gridColumnEditor);
          }
        }
      }
    }
    // formIdComponent is a component which is neither the grid or the form
    else {
      //<debug>
      console.log('Next message is from ' + Ext.getClassName(me) + '.' + arguments.callee.$name + ': arguments: ', arguments);
      console.log('formIdComponent is not a form, nor a grid. Most probably formIdComponentOrContainer contains non-form-or-grid component with formId property set. Returning without applying form configuration... ', formIdComponent);// jscs:ignore maximumLineLength
      //</debug>

      return false;
    }

    formFieldConfigurationList = formConfiguration.formFieldConfigurationList;
    for (i = 0, arrayLength = formFieldsMixedCollection.getCount(); i < arrayLength; i++) {
      formField = formFieldsMixedCollection.getAt(i);

      for (j = 0, jArrayLength = formFieldConfigurationList.length; j < jArrayLength; j++) {
        formFieldConfiguration = formFieldConfigurationList[j];

        if (formFieldConfiguration.fieldName === formField.name) {
          fieldPropertyConfigurationList = Ext.isArray(formFieldConfiguration.fieldPropertyConfigurationList) ? formFieldConfiguration.fieldPropertyConfigurationList : [];

          for (k = 0, kArrayLength = fieldPropertyConfigurationList.length; k < kArrayLength; k++) {
            fieldPropertyConfiguration = fieldPropertyConfigurationList[k];
            //noinspection JSUnresolvedVariable
            fieldPropertyName = fieldPropertyConfiguration.fieldPropertyName;
            fieldPropertyValue = fieldPropertyConfiguration.fieldPropertyValue;

            if (formField.xtype === 'datefield' && (fieldPropertyName === 'minValue' || fieldPropertyName === 'maxValue')) {
              formField[fieldPropertyName] = Ext.Date.parse(fieldPropertyValue, 'c');
            }
            else {
              formField[fieldPropertyName] = fieldPropertyValue;
            }
          }

          break;
        }
      }
    }

    return true;
  }
});
