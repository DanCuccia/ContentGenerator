/**
* CompParamView.js
* (c) 2015 All Rights Reserved.
* @author Daniel Cuccia
*/

define(["view/ViewBase", "i18n!nls/Editor"], 
	function (ViewBase, Strings) {
	"use strict";

	return ViewBase.extend({
		events: {

		},

		initialize: function (params) {
			this.template(this.$el, "ced-param-template", this.model.attributes, Strings);
			ViewBase.prototype.initialize.apply(this, arguments);
		}
	});
});