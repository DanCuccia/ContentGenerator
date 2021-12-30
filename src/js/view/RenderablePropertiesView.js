/**
* RenderablePropertiesView.js
* (c) 2015 All Rights Reserved.
* @author Daniel Cuccia
*/

define(["view/ComponentBaseView", "util/Utility", "i18n!nls/editor"], 
	function (ComponentBaseView, Util, Strings) {
	"use strict";

	return ComponentBaseView.extend({
		events: { 
			"click .click-collapse": "onCollapse",

			"change #prop-icon-small": "onIconSmallChange",
			"change #prop-icon-medium": "onIconMediumChange",
			"change #prop-icon-large": "onIconLargeChange",

			"click #prop-icon-small-browse": "onSmallBrowse",
			"click #prop-icon-small-sheet": "onSmallSheet",

			"click #prop-icon-medium-browse": "onMediumBrowse",
			"click #prop-icon-medium-sheet": "onMediumSheet",

			"click #prop-icon-large-browse": "onLargeBrowse",
			"click #prop-icon-large-sheet": "onLargeSheet"
		},

		initialize: function (params) {
			this.template(this.$el, "props-renderable-template", params, Strings);
			ComponentBaseView.prototype.initialize.apply(this, arguments);
		},

		onCollapse: function(e) {
			Util.IconAccordion(this.$el, e);
		},

		onIconSmallChange: function () {
			this.model.set("IconSmall", this.$el.find("#prop-icon-small").val(), {validate: true});
		},

		onIconMediumChange: function () {
			this.model.set("IconMedium", this.$el.find("#prop-icon-small").val(), {validate: true});
		},

		onIconLargeChange: function () {
			this.model.set("IconLarge", this.$el.find("#prop-icon-small").val(), {validate: true});
		},

		onSmallBrowse: function () {
			// ...
		},

		onSmallSheet: function () {
			// ...
		},

		onMediumBrowse: function () {
			// ...
		},

		onMediumSheet: function () {
			// ...
		},

		onLargeBrowse: function () {
			// ...
		},

		onLargeSheet: function () {
			// ...
		}
	});
});