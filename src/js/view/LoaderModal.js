/**
* LoaderModal.js
* (c) 2015 All Rights Reserved.
* @author Daniel Cuccia
*/

define(["view/ViewBase", "i18n!nls/editor"], function (ViewBase, Strings) {
	"use strict";

	return ViewBase.extend({
		events: {
			"click #loader-cancel": "onCancel"
		},

		initialize: function (params) {
			this.onCancel = params.cancel;
			this.template(this.$el, "loader-template", params, Strings);

			if (typeof params.cancel !== "function") {
				this.$el.find("#loader-cancel").addClass("disabled");
			}

			var modal = this.$el.find("#loader"),
				This = this;

			modal.modal({
				keyboard: false,
				show: true,
				backdrop: "static"
			});

			$("body").css("padding-right", "0px");

			modal.on("hidden.bs.modal", function () {
				This.remove();
				params.complete && params.complete();
			});

			modal.on("shown.bs.modal", function () {
				params.execute(function (val) {
					modal.find("#loader-pbar").css("width", val+"%");
				}, function () {
					modal.modal("hide");
				});
			});
		},

		onCancel: function () {
			this.onCancel && this.onCancel();
		}
	});
});