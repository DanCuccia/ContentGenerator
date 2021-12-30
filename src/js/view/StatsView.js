/**
* StatsView.js
* (c) 2015 All Rights Reserved.
* @author Daniel Cuccia
*/

define(["view/ViewBase", "i18n!nls/editor"], 
	function (ViewBase, Strings) {
	"use strict";

	function _stripVal(val) {
		return val ? parseFloat(val.replace(/[^-.0-9]+/g, "")) : 0;
	}

	return ViewBase.extend({
		events: {
			"change .stat-input-HP" : "onHP",
			"change .stat-input-MP" : "onMP",
			"change .stat-input-SP" : "onSP",
			"change .stat-input-STR" : "onStr",
			"change .stat-input-DEX" : "onDex",
			"change .stat-input-VIT" : "onVit",
			"change .stat-input-CON" : "onCon",
			"change .stat-input-EVA" : "onEva",
			"change .stat-input-WIS" : "onWis",
			"change .stat-input-INT" : "onInt",
			"change .stat-input-MND" : "onMnd",
			"change .stat-input-TRQ" : "onTrq",
			"change .stat-input-BKR" : "onBkr"
		},

		initialize: function () {
			this.template(this.$el, "stats-template", this.model.attributes, Strings);
			ViewBase.prototype.initialize.apply(this, arguments);
		},

		onHP: function () {
			var inputEl = this.$el.find(".stat-input-HP");
			var val = _stripVal(inputEl.val());
			this.model.set("HP", val);
			inputEl.val(val);
		},

		onMP: function () {
			var inputEl = this.$el.find(".stat-input-MP");
			var val = _stripVal(inputEl.val());
			this.model.set("MP", val);
			inputEl.val(val);
		},

		onSP: function () {
			var inputEl = this.$el.find(".stat-input-SP");
			var val = _stripVal(inputEl.val());
			this.model.set("SP", val);
			inputEl.val(val);
		},

		onStr: function () {
			var inputEl = this.$el.find(".stat-input-STR");
			var val = _stripVal(inputEl.val());
			this.model.set("STR", val);
			inputEl.val(val);
		}, 

		onDex: function () {
			var inputEl = this.$el.find(".stat-input-DEX");
			var val = _stripVal(inputEl.val());
			this.model.set("DEX", val);
			inputEl.val(val);
		}, 

		onVit: function () {
			var inputEl = this.$el.find(".stat-input-VIT");
			var val = _stripVal(inputEl.val());
			this.model.set("VIT", val);
			inputEl.val(val);
		}, 

		onCon: function () {
			var inputEl = this.$el.find(".stat-input-CON");
			var val = _stripVal(inputEl.val());
			this.model.set("CON", val);
			inputEl.val(val);
		}, 

		onEva: function () {
			var inputEl = this.$el.find(".stat-input-EVA");
			var val = _stripVal(inputEl.val());
			this.model.set("EVA", val);
			inputEl.val(val);
		}, 

		onWis: function () {
			var inputEl = this.$el.find(".stat-input-WIS");
			var val = _stripVal(inputEl.val());
			this.model.set("WIS", val);
			inputEl.val(val);
		},

		onInt: function () {
			var inputEl = this.$el.find(".stat-input-INT");
			var val = _stripVal(inputEl.val());
			this.model.set("INT", val);
			inputEl.val(val);
		}, 

		onMnd: function () {
			var inputEl = this.$el.find(".stat-input-MND");
			var val = _stripVal(inputEl.val());
			this.model.set("MND", val);
			inputEl.val(val);
		}, 

		onTrq: function () {
			var inputEl = this.$el.find(".stat-input-TRQ");
			var val = _stripVal(inputEl.val());
			this.model.set("TRQ", val);
			inputEl.val(val);
		}, 

		onBkr: function () {
			var inputEl = this.$el.find(".stat-input-BKR");
			var val = _stripVal(inputEl.val());
			this.model.set("BKR", val);
			inputEl.val(val);
		} 
	})
})