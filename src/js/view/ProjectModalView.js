/**
* ProjectModalView.js
* (c) 2015 All Rights Reserved.
* @author Daniel Cuccia
*/

define(["require", "underscore", "view/ViewBase", "i18n!nls/editor"], function (require, _, ViewBase, Strings) {
	"use strict";

	return ViewBase.extend({
		events: {
			"click #proj-load": "loadProj",
			"click #proj-apply": "applyChanges",
			"click #proj-ok": "applyAndClose",
			"change #projmodal-name-input": "onNameChange"
		},

		initialize: function () {
			this._values = _.clone(this.model.attributes);
			this.template(this.$el, "project-modal-template", this._values, Strings);

			var proj = require("app").getProject();
			if( proj && proj.get("ProjectID") === this.model.get("ProjectID") ) {
				this.$el.find("#proj-load").html(Strings.ProjModalUnload);
			}

			var modal = this.$el.find("#proj-modal"),
				This = this;

			modal.modal({
				keyboard: false,
				show: true,
				backdrop: "static"
			});

			if( $(document).height() > $(window).height() ) {
				$("body").css("padding-right", "0px");
			}

			modal.on("hidden.bs.modal", function () {
				This.trigger("close");
			});

			ViewBase.prototype.initialize.apply(this, arguments);
		},

		loadProj: function () {
			var app = require("app"),
				proj = app.getProject(),
				This = this;

			if( proj && proj.get("ProjectID") === this.model.get("ProjectID")) {
				app.unloadProject();
			} else {
				this.$el.find("#proj-modal").on("hidden.bs.modal", function () {
					app.loadProject(This.model.get("ProjectID"), function (proj) {
						//This.trigger("load", proj);
					});
				}).modal("hide");
			}
		},

		applyChanges: function () {
			this.toggleDirty(false);
		},

		applyAndClose: function () {
			this.applyChanges();
		},

		// ==============================================================

		toggleDirty: function (v) {
			this.$el.find("#proj-apply").toggleClass("disabled", v ? 1 : 0);
		},

		onNameChange: function () {
			var val = this.$el.find("#projmodal-name-input").val();
			this.$el.find("#projmodal-name-title").text(val);
			this._values["ProjectName"] = val;
			this.toggleDirty();
		}
	});
});