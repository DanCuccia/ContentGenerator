/**
* GeneralPropertiesView.js
* (c) 2015 All Rights Reserved.
* @author Daniel Cuccia
*/

define(["require", "view/ComponentBaseView", "model/ConnectionModel", "view/ConnectionView", "util/Utility", "i18n!nls/editor"], 
	function (require, ComponentBaseView, ConnectionModel, ConnectionView, Util, Strings) {
	"use strict";

	return ComponentBaseView.extend({
		events: {
			"change #prop-general-name-input": "onNameInput",
			"change #prop-general-id-input": "onIdInput",
			"change #prop-general-desc-input": "onDescriptionInput",

			"click .click-collapse": "onCollapse",
			"click .click-add-connect": "onAddConnection"
		},

		onCollapse: function (e) {
			Util.IconAccordion(this.$el, e);
		},

		initialize: function (params) {
			this.item = params.Item;
			this.template(this.$el, "props-general-template", this.model.attributes, Strings);
			this._initConnectList();
			ComponentBaseView.prototype.initialize.apply(this, arguments);
		},

		remove: function () {
			var connects = this.model.get("Connections");
			for(var i=0; i<connects.length; i++) {
				connects[i].get("PropertyView").remove();
				connects[i].unset("PropertyView");
			}
			ComponentBaseView.prototype.remove.apply(this, arguments);
		},

		// ==================================== Identity ===========================

		onNameInput: function () {
			this.model.set("Name", this.$el.find("#prop-general-name-input").val(), {validate: true, silent: false});
		},

		onIdInput: function () {
			this.model.set("ID", this.$el.find("#prop-general-id-input").val(), {validate: true, silent: false});
		},

		onDescriptionInput: function () {
			this.model.set("Description", this.$el.find("#prop-general-desc-input").val(), {validate: true, silent: false});
		},

		// ==================================== CONNECTIONS ===========================

		_initConnectList: function () {
			var connects = this.model.get("Connections");
			for(var i=0; i<connects.length; i++) {
				this._createConnection( connects[i] );
			}
		},

		_getConnectionAtIndex: function (idx) {
			var cons = this.model.get("Connections");
			return cons[idx] || null;
		},

		_createConnection: function (connect) {
			var This = this,
				connect = (connect || new ConnectionModel({Subject: this.model })),
				el = $("<div>", {
				addClass: "connection-top",
				cid: connect.cid
			}).appendTo(this.$el.find(".connect-list"));

			connect.set("PropertyView", new ConnectionView({
				el: el,
				model: connect,
				item: this.item,
				generalModel: this.model
			}), {validate: false});

			return connect;
		},

		onAddConnection: function () {
			var connects = this.model.get("Connections");
			var toAdd = this._createConnection();
			connects.push( toAdd );
			this.model.set("Connections", connects, {validate: true})
		}
	});
});