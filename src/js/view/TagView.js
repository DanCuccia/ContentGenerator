/**
* TagView.js
* (c) 2015 All Rights Reserved.
* @author Daniel Cuccia
*/

define(["view/ViewBase"], function(ViewBase) {
	"use strict";

	return ViewBase.extend({
		events: {
			"change .tag-key-input": "onKeyChange",
			"change .tag-val-input": "onValueChange",
			"click .tag-remove": "onDeleteTag"
		},

		initialize: function (params) {
			this.component = params.component;
			this.template(this.$el, "props-tag-template", {
				Key: this.model.attributes.Key,
				Value: this.model.attributes.Value,
				cid: this.model.cid
			});

			var This = this;
			this.model.on("invalid", function (m,e,p) { 
				This.component.model.trigger("invalid", m, e, p);
			});
			this.model.on("change", function (m,e,p) {
				This.component.model.trigger("change", m, e, p);
			});
		},

		onKeyChange: function () {
			var val = this.$el.find(".tag-key-input").val();
			this.model.set("Key", val, { validate: true });
		},

		onValueChange: function () {
			var val = this.$el.find(".tag-val-input").val();
			this.model.set("Value", val, { validate: true });
		},

		onDeleteTag: function () {
			this.component.model.removeTag(this.model);
		}
	});
});