Ext.define('Ext.overrides.form.Basic', {
  override: 'Ext.form.Basic',

  setNestedValues: function(values) {
    var me = this;
    var field, property;

    function setVal(name, value, nestedPath) {
      if (Ext.isObject(value)) {
        iterateObject(value, nestedPath + name + '.');
      }

      var field = me.findField(nestedPath + name);
      if (field) {
        field.setValue(value);
        if (me.trackResetOnLoad) {
          field.resetOriginalValue();
        }
      }
    }

    function iterateObject(object, nestedPath) {
      nestedPath = nestedPath || "";
      for (var property in object) {
        if (object.hasOwnProperty(property)) {
          setVal(property, object[property], nestedPath);
        }
      }
    }

    Ext.suspendLayouts();
    if (Ext.isObject(values)) {
      iterateObject(values);
    }
    Ext.resumeLayouts(true);
    return this;
  },

  getNestedValues: function(dirtyOnly) {
    var me = this;
    var originalData = {}, parsedData = {};
    var position, currentValue, currentProperty, nestedProperty;

    function parseProperty(name, value, parentObject) {
      position = name.indexOf('.');

      if (position > 0) {
        currentProperty = name.substring(0, position);
        nestedProperty = name.substring(position + 1, name.length);

        currentValue = parentObject[currentProperty] || {};
        parentObject[currentProperty] = parseProperty(nestedProperty, value, currentValue);
      }
      else {
        if (Ext.isEmpty(value) && Ext.Object.isEmpty(parentObject)) {
          parentObject = null;
        }
        else {
          parentObject[name] = value;
        }
      }

      return parentObject;
    }

    dirtyOnly = dirtyOnly || false;

    originalData = me.getFieldValues(dirtyOnly);

    if (Ext.isObject(originalData)) {
      Ext.iterate(originalData, function(name, value) {
        parseProperty(name, value, parsedData);
      });
    }

    return parsedData;
  }

});
