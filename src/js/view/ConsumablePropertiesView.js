/**
* ConsumablePropertiesView.js
* (c) 2015 All Rights Reserved.
* @author Daniel Cuccia
*/

define(["view/ComponentBaseView", "util/Utility", "i18n!nls/editor"], 
	function (ComponentBaseView, Util, Strings) {
	"use strict";

	return ComponentBaseView.extend({
		events: { 
			"click .click-collapse" : "onCollapse"
		},

		initialize: function (params) {
			this.template(this.$el, "props-consumable-template", params, Strings);
			ComponentBaseView.prototype.initialize.apply(this, arguments);
		},

		onCollapse: function (e) {
			Util.IconAccordion(this.$el, e);
		},
	});
});