/**
* CompEditorView.js
* (c) 2015 All Rights Reserved.
* @author Daniel Cuccia
*/

define(["require", "view/ViewBase", "i18n!nls/editor", "i18n!nls/msg"], 
	function (require, ViewBase, Strings, MsgStrings) {
	"use strict";

	return ViewBase.extend({
		events: {
			"click #ced-file-new": "onNewComp",
			"click #ced-file-load": "onLoadComp",
			"click #ced-file-save": "onCompSave",
			"click #ced-file-save-as": "onCompSaveAs",
			"click #ced-file-quit": "onQuit",
			"click #ced-add-text": "addTextParam",
			"click #ced-add-number": "addNumberParam",
			"click #ced-add-dd": "addDropdownParam",
			"click #ced-add-list": "addListParam",

			"click #ced-add-param": "onAddParam"
		},

		_paramViews: [],

		initialize: function (params) {
			this.collection = params.collection;
			this.template(this.$el, "ced-page-template", params, Strings);
			this.template(this.$el.find("#ced-menubar"), "ced-menubar-template", params, Strings);
			ViewBase.prototype.initialize.apply(this, arguments);
		},

		// ================ Menu Bar =======================

		onNewComp: function () {
			if( this.collection.isDirty() === true ) {
				var This = this,
					options = {};

				options[MsgStrings.Yes] = function () {
					console.log("TODO");
				};
				options[MsgStrings.No] = function () {
					This.collection.reset();
				};
				options[MsgStrings.Cancel] = function () { };

				require("app").spawnMessageBox("Question", true, MsgStrings.SaveCurrent, options);
			} else {
				this.collection.reset();
			}
		},

		onLoadComp: function () {

		},

		onCompSave: function () {

		},

		onCompSaveAs: function () {

		},

		onQuit: function () {

		},

		addTextParam: function () {

		},

		addNumberParam: function () {

		},

		addDropdownParam: function () {

		},

		addListParam: function () {

		},

		// =================================================

		onAddParam: function () {
			var This = this;
			require(["model/ComponentParamModel", "view/CompParamView"], function (ParamModel, ParamView) {
				var comps = This.model.get("Components"),
					param = new ParamModel();
				comps.push(param);
				This.model.set("Components", comps, {validate: true});
				This._paramViews.push(new ParamView({
					el: $("<div>", { mcid: param.cid  }).appendTo(This.$el.find("#param-container")),
					model: param
				}));
			});
		}
	});
});