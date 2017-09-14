Ext.define('Ext.overrides.form.field.TextFeatures', {
  override: 'Ext.form.field.Text',

  requires: [
    'Ext.util.Format'
  ],

  // ----- Part of xss preventions mechanism - START
  // Part of XSS prevention mechanism.
  //
  // As a measure for XSS prevention, server's JSON responses (not html encoded) should always be html encoded on the client and in such encoded form
  // stored in stores. When store content is sent back to server, it should be html decoded so it can be stored unconverted in the backend.
  //
  // However, in text form fields (form text input and form textarea input), html encoded values are rendered in their html encoded form which is not
  // very convenient for end users. Therefore, these altered functions are intended to convert html encoded text to decoded form just before
  // displaying to the user (raw value), and vice versa, converting html decoded text to its html encoded form (original value) just before returning
  // a value to the extjs framework, i.e. for storing in a corresponding store.
  //
  // Implementation notes:
  //   There is a function processRawValue in form.field.Base which at first looks like right place to implement this patch. However,
  //   processRawValue() is used from isValid() in order to prepare form field for validation. It is very probable that we do not want to validate
  //   htmlEncoded data. Therefore, processRawValue() is not used in this patch, but rather getSubmitValue() and rawToValue(). For further
  //   customization take a look how processRawValue(), getSubmitValue() and rawToValue() are used in form.field.Base and form.field.Text.
  valueToRaw: function(value) {
    var returnValue = this.callParent(arguments);
    if (returnValue) {
      return Ext.util.Format.htmlDecode(returnValue);
    }
    else {
      return returnValue;
    }
  },

  getSubmitValue: function() {
    var rawValue = this.callParent(arguments);
    return Ext.util.Format.htmlEncode(rawValue);
  },

  rawToValue: function(rawValue) {
    return Ext.util.Format.htmlEncode(rawValue);
  }
  // ----- Part of xss preventions mechanism - END
});