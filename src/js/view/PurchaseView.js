/**
* PurchaseView.js
* (c) 2015 All Rights Reserved.
* @author Daniel Cuccia
*/

define(["view/ViewBase", "util/Ajax", "i18n!nls/ecom"], function (ViewBase, Ajax, Strings) {
	"use strict";

	// TODO: PRICE CONVERSION

	return ViewBase.extend({
		events: {
			"click .hosting-opt": "onHostingOption",
			"click #purchase-free": "onPurchaseFree",
			"click #purchase-file": "onPurchaseFile",
			"click #purchase-hosting": "onPurchaseHosting"
		},

		initialize: function (params) {
			this.template(this.$el, "purchase-page-template", params, Strings);
			ViewBase.prototype.initialize.apply(this, arguments);

			var This = this;
			Ajax.PurchasePrices( function (options) {
				if( options ) {
					This.$el.find("#fileio-price").html(options.fileio || "Price N/A");
					This.$el.find("#hosting-price").html(options.hosting1);
					var elOpts = This.$el.find(".hosting-opt");
					elOpts.eq(0).attr("price", options.hosting1);
					elOpts.eq(1).attr("price", options.hosting2);
					elOpts.eq(2).attr("price", options.hosting3);
					elOpts.eq(3).attr("price", options.hosting4);
					elOpts.eq(4).attr("price", options.hosting5);
				}
			});
		},

		onHostingOption: function (e) {
			var el = $(e.currentTarget);
			this.$el.find(".dd-text").html(el.html());
			this.$el.find("#hosting-price").html(el.attr("price"));
		},

		onPurchaseFree: function () {
			require("app").navigate("createacc", {trigger: true});
		},

		onPurchaseFile: function () {

		},

		onPurchaseHosting: function () {

		}
	});
});