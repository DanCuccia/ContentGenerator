/**
* EquipablePropertiesModel.js
* (c) 2015 All Rights Reserved.
* @author Daniel Cuccia
*/

define(["model/ModelBase", "view/EquipablePropertiesView", "model/StatsModel", "util/Utility", "i18n!nls/editor", "i18n!nls/msg"], 
	function (ModelBase, View, Stats, Util, Strings, MsgStrings) {
	"use strict";

	/**
	* Item Data-Set representing an equipable object
	*
	* @class EquipablePropertiesModel
	* @extends ModelBase
	* @constructor
	* @public
	*/
	return ModelBase.extend({

		/**
		* retrieve a new data object set to defaults, which will be mixed into the constructor arguments
		*
		* @method defaults
		* @public
		*/
		defaults: function () {
			return {
				ComponentName: Strings.EquipableTab,
				MinLevel: 1,
				MaxLevel: 100,
				EquipSlotID: -1,
				EquipSlotName: Strings.SlotUndefined,
				Stats: new Stats()
			};
		},

		/**
		* ensure this model has valid properties
		*
		* @param {Object} attributes - a temporary set of attributes to test
		* @return {Object} {warnings: [], errors: []}
		*
		* @method validate
		* @public
		*/
		validate: function (attributes, params) {
			var msg = undefined;

			if( attributes.EquipSlotName === Strings.SlotUndefined || attributes.EquipSlotID === -1 ) {
				msg = msg || this.emptyError();
				msg.errors.push(MsgStrings.EquipSlotUndefined);
			} 

			return msg ? msg : undefined;
		},

		/**
		* generate the view used to visually represent this property
		*
		* @param {jQuery} $el - element to append into
		* @param {ItemModel} item - the item which the property belongs to
		*
		* @method createPropertyView
		* @public
		*/
		createPropertyView: function($el, item) {
			return new View({
				el: $el,
				model: this,
				Item: item
			});
		}
	});
});