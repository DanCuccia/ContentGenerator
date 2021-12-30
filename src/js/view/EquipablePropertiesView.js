/**
* EquipablePropertiesView.js
* (c) 2015 All Rights Reserved.
* @author Daniel Cuccia
*/

define(["view/ComponentBaseView", "util/Utility", "i18n!nls/editor"], 
	function (ComponentBaseView, Util, Strings) {
	"use strict";

	return ComponentBaseView.extend({
		events: { 
			"click .click-collapse": "onCollapse",
			"click .equip-dd-option": "onSlotChange"
		},

		initialize: function (params) {
			this.template(this.$el, "props-equipable-template", this.model.attributes, Strings);
			this.template(this.$el.find("#prop-equip-slot-insert"), "equip-slots-dd-template", this.model.attributes, Strings);
			this.template(this.$el.find("#prop-stat-data"), "stats-template", this.model.get("Stats").attributes, Strings);
			ComponentBaseView.prototype.initialize.apply(this, arguments);
		},

		onCollapse: function (e) {
			Util.IconAccordion(this.$el, e);
		},

		onSlotChange: function (e) {
			var selected = $(e.currentTarget);
			var equipName = this.$el.find("#prop-equip-slot-insert .change-txt-target").html(selected.html()).html();
			var equipID = parseInt( selected.attr("class").split(" ")[0].match(/\d+/g) );
			this.model.set("EquipSlotName", equipName, {validate: true});
			this.model.set("EquipSlotID", equipID, {validate: true});
		}
	});
});