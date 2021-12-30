/**
* MenuView.js
* (c) 2015 All Rights Reserved.
* @author Daniel Cuccia
*/

define(["require", "view/ViewBase", "i18n!nls/editor", "i18n!nls/msg"], function(require, ViewBase, Strings, MsgStrings) {
		"use strict";

		return ViewBase.extend({
			events: {
				"click #mm-goto-projmenu": "toProjMenu",
				"click #mm-goto-editor": "toEditor",
				"click #mm-goto-compeditor": "toCompEditor",
				"click #mm-goto-viewer": "toViewer",
				"click #mm-goto-simulator": "toSimulator"
			},

			initialize: function (params) {
				var app = require("app"),
					proj = app.getProject(),
					attrs = proj ? proj.attributes : { ProjectName: Strings.ProjectUndefined };

				this.template(this.$el, "mainmenu-page-template", attrs, Strings);

				if( proj === null ) {
					this._projDisable();
				}
				ViewBase.prototype.initialize.apply(this, arguments);

				app.on("load", this._projEnable, this);
				app.on("unload", this._projDisable, this);
			},

			_projDisable: function () {
				this.$el.find("#mm-goto-editor, #mm-goto-compeditor, #mm-goto-viewer, #mm-goto-simulator").addClass("disabled");
				this.$el.find(".mm-proj-name").html(Strings.ProjectUndefined);
			},

			_projEnable: function () {
				this.$el.find("#mm-goto-editor, #mm-goto-compeditor, #mm-goto-viewer, #mm-goto-simulator").removeClass("disabled");
				this.$el.find(".mm-proj-name").html(require("app").getProject().get("ProjectName"));
			},

			_sharedGoTo: function (e, $el, nav) {
				var app = require("app");
				if( $el.hasClass("disabled") === false ) {
					app.navigate(nav, {trigger: true});
					return undefined;
				} else {
					var offset = $el.offset(),
						l = offset.left + e.offsetX,
						t = offset.top + e.offsetY;
					app.spawnPopover(l, t, "top", MsgStrings.MMLoadProject, MsgStrings.MMLoadProjectTitle);
					return false;
				}
			},

			toProjMenu: function (e) {
				this._sharedGoTo(e, this.$el.find("#mm-goto-projmenu"), "projectmenu");
			},

			toEditor: function (e) {
				this._sharedGoTo(e, this.$el.find("#mm-goto-editor"), "editor");
			},

			toCompEditor: function (e) {
				this._sharedGoTo(e, this.$el.find("#mm-goto-compeditor"), "compeditor");
			},

			toViewer: function (e) {
				this._sharedGoTo(e, this.$el.find("#mm-goto-viewer"), "viewer");
			},

			toSimulator: function (e) {
				this._sharedGoTo(e, this.$el.find("#mm-goto-simulator"), "simulator");
			}

		});
});