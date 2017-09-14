Ext.define("riznica.misc.view.AboutView", {
  extend: "Ext.window.Window",
  xtype: "misc-view-AboutView",

  requires: [
    "Ext.data.StoreManager",
    "Ext.layout.container.Fit",
    "Ext.mixin.Responsive",
    "Ext.view.View",
    "grich.core.GrichCoreConstants",
    "riznica.misc.store.AboutStore"
  ],

  mixins: [
    "Ext.mixin.Responsive"
  ],

  autoShow: true, modal: true, layout: "fit",

  i18n: {
    titleText: "About",
    nameLabelText: "Name:",
    longNameLabelText: "Long name:",
    descriptionLabelText: "Description:",
    authorLabelText: "Author:",
    developmentTeamLabelText: "Development team:",
    supportContactLabelText: "Support contact:",
    versionLabelText: "Version:",
    grailsVersionLabelText: "Grails Version:",
    buildLabelText: "Build:",
    startupTimeLabelText: "Startup Time:"
  },

  listeners: {
    show: function() {
      // Trigger responsive config reevaluation since some component properties can only be updated after component is rendered, and first responsive config evaluation happens before component
      // is rendered. Therefore, we need to trigger responsive component reevaluation once component is ready, meaning it is rendered.
      Ext.mixin.Responsive.notify();
    }
  },

  config: {
    normalWidth: 570,
    normalHeight: 250,
    normalY: 65,

    smallWidth: "80%",
    smallHeight: "80%",
    smallY: null,

    smallViewportWidth: 600,
    smallViewportHeight: 350,

    smallWidthAndHeight: [false, false]
  },

  responsiveFormulas: {
    smallWidthAndHeightRule: function(context) {
      var me = this;
      var viewportWidth = context.width, viewportHeight = context.height;
      return !!(viewportWidth < me.smallViewportWidth && viewportHeight < me.smallViewportHeight);
    },

    smallWidthRule: function(context) {
      var me = this;
      var viewportWidth = context.width, viewportHeight = context.height;
      return !!(viewportWidth < me.smallViewportWidth && viewportHeight >= me.smallViewportHeight);
    },

    smallHeightRule: function(context) {
      var me = this;
      var viewportWidth = context.width, viewportHeight = context.height;
      return !!(viewportWidth >= me.smallViewportWidth && viewportHeight < me.smallViewportHeight);
    },

    smallNothingRule: function(context) {
      var me = this;
      var viewportWidth = context.width, viewportHeight = context.height;
      return !!(viewportWidth >= me.smallViewportWidth && viewportHeight >= me.smallViewportHeight);
    }
  },

  responsiveConfig: {
    smallWidthAndHeightRule: {
      smallWidthAndHeight: [true, true]
    },
    smallWidthRule: {
      smallWidthAndHeight: [true, false]
    },
    smallHeightRule: {
      smallWidthAndHeight: [false, true]
    },
    smallNothingRule: {
      smallWidthAndHeight: [false, false]
    }
  },

  applySmallWidthAndHeight: function(smallWidthAndHeightFlags) {
    var me = this;
    var isSmallWidth = smallWidthAndHeightFlags[0];
    var isSmallHeight = smallWidthAndHeightFlags[1];

    // console.log("applySmallWidthAndHeight - isSmallWidth: " + isSmallWidth + ", isSmallHeight: " + isSmallHeight + ", isRendered: " + me.rendered);

    if (me.rendered === false) {
      return;
    }

    Ext.suspendLayouts();

    if (isSmallWidth) {
      me.setWidth(me.smallWidth);
    }
    else {
      me.setWidth(me.normalWidth);
    }

    if (isSmallHeight) {
      me.setHeight(me.smallHeight);
      me.alignTo(me.container, "c-c", [0, me.smallY]);
    }
    else {
      me.setHeight(me.normalHeight);
      me.alignTo(me.container, "t-t", [0, me.normalY]);
    }

    // Without this, when returning to normal width, on first responsive update, window is not centered horizontally to the viewport.
    if (!isSmallWidth) {
      //noinspection JSValidateTypes
      if (isSmallHeight) {
        Ext.defer(function() {
          me.alignTo(me.container, "c-c", [0, me.smallY]);
        }, 1);
      }
      else {
        Ext.defer(function() {
          me.alignTo(me.container, "t-t", [0, me.normalY]);
        }, 1);
      }
    }

    Ext.resumeLayouts(false);
    me.updateLayout();
  },

  initComponent: function() {
    var me = this;

    Ext.apply(me, { title: me.i18n.titleText || "About", width: me.normalWidth, height: me.normalHeight, y: me.normalY });
    Ext.applyIf(me, {
      items: [
        {
          xtype: "dataview",
          store: Ext.data.StoreManager.lookup("misc.store.AboutStore.thisViewUniqueInstance") || Ext.create("riznica.misc.store.AboutStore", { storeId: "misc.store.AboutStore.thisViewUniqueInstance" }),// jscs:ignore maximumLineLength
          itemSelector: "div.about-view-content",
          scrollable: true,
          tpl: Ext.create("Ext.XTemplate", [
            '<tpl for=".">',
            '  <div class="about-view-content">',
            "    <table>",
            '      <tr><td class="title">' + (me.i18n.nameLabelText || "Name:") + "</td><td>{name}</td></tr>",
            '      <tr><td class="title">' + (me.i18n.longNameLabelText || "Long name:") + "</td><td>{longName}</td></tr>",
            '      <tr><td class="title">' + (me.i18n.descriptionLabelText || "Description:") + "</td><td>{description}</td></tr>",
            '      <tr><td class="title">' + (me.i18n.authorLabelText || "Author:") + "</td><td>{author}</td></tr>",
            "      <tr>",
            '        <td class="title">' + (me.i18n.developmentTeamLabelText || "Development team:") + "</td>",
            "        <td>",
            '          <tpl for="developmentTeam">',
            "            <div>{.}</div>",
            "          </tpl>",
            "        </td>",
            "      </tr>",
            '      <tr><td class="title">' + (me.i18n.supportContactLabelText || "Support contact:") + "</td><td>{supportContact}</td></tr>",
            '      <tr><td class="title">' + (me.i18n.versionLabelText || "Version:") + "</td><td>{version}</td></tr>",
            '      <tr><td class="title">' + (me.i18n.grailsVersionLabelText || "Grails Version:") + "</td><td>{grailsVersion}</td></tr>",
            '      <tr><td class="title">' + (me.i18n.buildLabelText || "Build:") + "</td><td>{build}</td></tr>",
            "      <tr>",
            '        <td class="title">' + (me.i18n.startupTimeLabelText || "Startup Time:") + "</td>",
            "        <td>{[Ext.Date.format(values.startupTime, grich.core.GrichCoreConstants.dateTimeFormat)]}</td>",
            "      </tr>",
            "    </table>",
            "  </div>",
            "</tpl>"
          ])
        }
      ]
    });

    me.callParent();
  }
});
