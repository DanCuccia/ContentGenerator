define(["backbone", "underscore"], function (Backbone, _) {
	"use strict";

	return Backbone.Model.extend({
		defaults: function () {
			return {
				HP: 1,
				MP: 0,
				SP: 0,
				STR: 0,
				DEX: 0,
				VIT: 0,
				CON: 0,
				EVA: 0,
				WIS: 0,
				INT: 0,
				MND: 0,
				TRQ: 0,
				BKR: 0
			};
		},

		getSerializable: function () {
			return _.clone(this.attributes);
		}
	});
});