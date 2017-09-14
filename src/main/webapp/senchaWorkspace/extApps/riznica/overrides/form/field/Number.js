Ext.define('Ext.overrides.form.field.Number', {
  override: 'Ext.form.field.Number',

  requires: [
    'Ext.util.Format'
  ],

  /**
   * @cfg {Boolean} useThousandSeparator
   */
  useThousandSeparator: false,

  /**
   * @cfg {Boolean} limitDecimalPlaces
   */
  limitDecimalPlaces: false,

  initComponent: function() {
    if (this.limitDecimalPlaces) {
      this.enableKeyEvents = true;
      this.addListener('keyup', this.onLimitDecimalPlaces, this);
    }
    this.callParent(arguments);
  },

  /**
   * @inheritdoc
   */
  toRawNumber: function(value) {
    var me = this;
    var thousandSeparatorRegex = new RegExp(me.escapeRegex(Ext.util.Format.thousandSeparator), 'g');

    if (me.decimalSeparator === '.') {
      return String(value).replace(me.decimalSeparator, '.').replace(thousandSeparatorRegex, '');
    } else {
      return String(value).replace(thousandSeparatorRegex, '').replace(me.decimalSeparator, '.');
    }
  },

  /**
   * @inheritdoc
   */
  getErrors: function(value) {
    if (!this.useThousandSeparator) {
      return this.callParent(arguments);
    }

    var me = this,
        errors = Ext.form.field.Text.prototype.getErrors.apply(me, arguments),
        format = Ext.String.format,
        num;

    value = Ext.isDefined(value) ? value : me.processRawValue(me.getRawValue());

    if (value.length < 1) { // if it's blank and textfield didn't flag it then it's valid
      return errors;
    }

    value = me.toRawNumber(value);

    if (isNaN(value.replace(Ext.util.Format.thousandSeparator, ''))) {
      errors.push(format(me.nanText, value));
    }

    num = parseFloat(value);

    if (me.minValue === 0 && num < 0) {
      errors.push(me.negativeText);
    }
    else if (num < me.minValue) {
      errors.push(format(me.minText, me.minValue));
    }

    if (num > me.maxValue) {
      errors.push(format(me.maxText, me.maxValue));
    }

    return errors;
  },

  /**
   * @inheritdoc
   */
  valueToRaw: function(value) {
    if (!this.useThousandSeparator) {
      return this.callParent(arguments);
    }

    var me = this;

    var format = '0,000';
    for (var i = 0; i < me.decimalPrecision; i++) {
      if (i == 0)
        format += '.';
      format += '0';
    }

    value = me.parseValue(Ext.util.Format.number(value, format));
    value = me.fixPrecision(value);
    value = Ext.isNumber(value) ? value : parseFloat(me.toRawNumber(value));
    value = isNaN(value) ? '' : String(Ext.util.Format.number(value, format));
    return value;
  },

  /**
   * @inheritdoc
   */
  getSubmitValue: function() {
    if (!this.useThousandSeparator) {
      return this.callParent(arguments);
    }

    var me = this,
        value = me.callParent();

    if (!me.submitLocaleSeparator) {
      value = me.toRawNumber(value);
    }
    return value;
  },

  /**
   * @inheritdoc
   */
  setMinValue: function(value) {
    if (!this.useThousandSeparator) {
      return this.callParent(arguments);
    }
    var me = this,
        allowed;

    me.minValue = Ext.Number.from(value, Number.NEGATIVE_INFINITY);
    me.toggleSpinners();

    // Build regexes for masking and stripping based on the configured options
    if (me.disableKeyFilter !== true) {
      allowed = me.baseChars + '';

      if (me.allowExponential) {
        allowed += me.decimalSeparator + 'e+-';
      }
      else {
        allowed += Ext.util.Format.thousandSeparator;
        if (me.allowDecimals) {
          allowed += me.decimalSeparator;
        }
        if (me.minValue < 0) {
          allowed += '-';
        }
      }

      allowed = Ext.String.escapeRegex(allowed);
      me.maskRe = new RegExp('[' + allowed + ']');
      if (me.autoStripChars) {
        me.stripCharsRe = new RegExp('[^' + allowed + ']', 'gi');
      }
    }
  },

  /**
   * @private
   */
  parseValue: function(value) {
    if (!this.useThousandSeparator) {
      return this.callParent(arguments);
    }
    value = parseFloat(this.toRawNumber(value));
    return isNaN(value) ? null : value;
  },

  /**
   * @private
   */
  escapeRegex: function(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  },

  /**
   * @private
   */
  getNumberOfDecimalPlaces: function(value) {
    value = this.toRawNumber(value);

    if (isNaN(value.replace(Ext.util.Format.thousandSeparator, ''))) {
      return 0;
    }

    var num = parseFloat(value);

    var match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
    if (!match) {
      return 0;
    }
    // Count the number of digits in the fraction and subtract the
    // exponent to simulate moving the decimal point left by exponent places.
    // 1.234e+2 has 1 fraction digit and '234'.length -  2 == 1
    // 1.234e-2 has 5 fraction digit and '234'.length - -2 == 5
    return Math.max(
        0,
        // Number of digits right of decimal point.
        (match[1] ? match[1].length : 0)
        // Adjust for scientific notation.
        - (match[2] ? +match[2] : 0)
    );
  },

  /**
   * @private
   */
  onLimitDecimalPlaces: function(me, event) {
    var value = event.target.value;
    if (this.limitDecimalPlaces) {
      var numOfDecimalPlaces = this.getNumberOfDecimalPlaces(value);
      if (numOfDecimalPlaces > this.decimalPrecision) {
        this.setRawValue(value.substring(0, value.length - (numOfDecimalPlaces - this.decimalPrecision)));
      }
    }
  }

});
