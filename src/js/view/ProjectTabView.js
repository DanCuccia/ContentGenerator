/**
* ProjectTabView.js
* (c) 2015 All Rights Reserved.
* @author Daniel Cuccia
*/

define(["view/ViewBase", "i18n!nls/editor"], function (ViewBase, Strings) {
	"use strict";

	return ViewBase.extend({
		initialize: function (params) {
			this.$el.append($("<th>", { text: this.model.get("ProjectName"), addClass: "color-white" }));
			this.$el.append($("<td>", { text: this.model.get("CreateDate"), addClass: "color-white" }));
			this.$el.append($("<td>", { text: this.model.get("LastSaveDate"), addClass: "color-white" }));
			this.$el.append($("<td>", { text: this.model.get("Status").join(", "), addClass: "color-white" }));
			ViewBase.prototype.initialize.apply(this, arguments);
		}
	});
});