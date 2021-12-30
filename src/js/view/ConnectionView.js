/**
* ConnectionView.js
* (c) 2015 All Rights Reserved.
* @author Daniel Cuccia
*/

define(["require", "view/ViewBase", "view/DFConnectionView", "util/Utility", "i18n!nls/editor"], 
	function (require, ViewBase, DFConnectionView, Util, Strings) {
	"use strict";

	return ViewBase.extend({
		events: {
			"click .connect-condition": "onCondition",
			"change .connect-quantity": "onQuantity",
			"click .connect-target": "onTargetClick",
			"click .connect-delete": "onDelete"
		},

		initialize: function (params) {
			this.item = params.item;
			this.generalModel = params.generalModel;
			this.template(this.$el, "props-general-connection-template", this.model.attributes, Strings);

			var This = this;
			this.model.on("change:SubjectName", function (m, val, p) {
				This.$el.find(".connect-subject").val(val);
			});
			this.model.on("change:TargetName", function (m, val, p) {
				This.$el.find(".connect-target").val(val);
			});

			if( Util.IsNullOrEmpty(this.model.get("TargetName")) === false ) {
				this.$el.find(".connect-target").attr("disabled", "disabled");
			}

			ViewBase.prototype.initialize.apply(this, arguments);
		},

		onCondition: function () {
			var This = this,
				offset = this.$el.find(".connect-condition").offset();

			var options = {};

			options[Strings.ConnectRequires] = function () {
				This.model.set("Condition", "Requires", {validate: true});
				This.$el.find(".connect-condition").html(Strings.ConnectRequires);
			};

			options[Strings.ConnectConsumes] = function () {
				This.model.set("Condition", "Consumes", {validate: true});
				This.$el.find(".connect-condition").html(Strings.ConnectConsumes);
			};

			require("app").spawnDropdown(offset.left, offset.top, options);
		},

		onQuantity: function () {
			this.model.set("Quantity", parseInt(this.$el.find(".connect-quantity").val(), 10), {validate: true});
		},

		_abortDFSelection: null,
		onTargetClick: function () {
			var This = this;
			this._abortDFSelection = this.item.collection.view.startDFSelection(function(item) {
				This._abortDFSelection = null;
				var target = This.model.get("Target");
				if( target ) {
					This.model.set("Target", item, {validate: true});
					var cview = This.model.get("DFConnectionView");
					cview.$el.attr("t-cid", item.cid);
					This.model.trigger("Position");
				} else {
					This.model.set("Target", item, {validate: true});
					This._createDFConnection();
				}
			}, function() {
				This._abortDFSelection = null;
			});
		},

		_createDFConnection: function () {
			this.model.set("DFConnectionView", new DFConnectionView({
				el: $("<div>", {
					"s-cid": this.item.cid,
					"t-cid": this.model.get("Target").cid,
					addClass: "connection-line"
				}).appendTo(this.item.collection.view.$el.find(".df-connect-container")),
				model: this.model
			}), {validate: false});
		},

		onDelete: function () {
			this._abortDFSelection && this._abortDFSelection();
			var idx = this.$el.index();
			this.remove();
			var connections = this.generalModel.get("Connections");
			connections.splice(idx, 1);
			this.generalModel.set("Connections", connections, {validate: true});
			var dfView = this.model.get("DFConnectionView");
			dfView && dfView.remove();
			this.model.unset("DFConnectionView");
		}
	});
});