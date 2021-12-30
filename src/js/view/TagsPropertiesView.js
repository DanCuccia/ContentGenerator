/**
* TagsPropertiesView.js
* (c) 2015 All Rights Reserved.
* @author Daniel Cuccia
*/

define(["view/ComponentBaseView", "util/Utility", "model/TagModel", "view/TagView", "i18n!nls/editor"], 
	function (ComponentBaseView, Util, TagModel, TagView, Strings) {
	"use strict";

	return ComponentBaseView.extend({
		events: {
			"click .click-collapse": "onCollapse",
			"click .click-add-tag": "onAddTag"
		},

		_createTagView: function(model, target) {
			return new TagView({
				cid: model.cid,
				model: model,
				component: this,
				el: $("<div>", {
					cid: model.cid,
					addClass: "tag-top"
				}).appendTo(target)
			});
		},

		initialize: function(params) {
			this.template(this.$el, "props-tags-template", this.model.attributes, Strings);

			var tags = this.model.get("TagList"),
				target = this.$el.find("#tag-container");

			for( var i = 0; i < tags.length; i++ ) {
				tags[i].set("View", this._createTagView(tags[i], target), {validate: false, silent: true});
			}

			ComponentBaseView.prototype.initialize.apply(this, arguments);
		},

		onCollapse: function (e) {
			Util.IconAccordion(this.$el, e);
		},

		remove: function () {
			var tags = this.model.get("TagList");
			for( var i = 0; i < tags.length; i++ ) {
				tags[i].get("View").undelegateEvents();
				tags[i].get("View").remove();
				tags[i].unset("View");
			}
			ComponentBaseView.prototype.remove.apply(this, arguments);
		},

		onAddTag: function () {
			var tag = new TagModel();

			tag.set("View", this._createTagView(tag, this.$el.find("#tag-container")), {validate: false, silent: true});

			var tags = this.model.get("TagList");
			tags.push(tag);
			this.model.set("TagList", tags, {validate: true});
		}
	});
});