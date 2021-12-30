/**
* ConsumablePropertiesModel.js
* (c) 2015 All Rights Reserved.
* @author Daniel Cuccia
*/


define(["model/ModelBase", "view/ConsumablePropertiesView", "model/StatsModel", "util/Utility", "i18n!nls/editor"], 
	function (ModelBase, View, Stats, Util, Strings) {
	"use strict";

	/**
	* Data container of a Consumable Item
	*
	* @class ConsumablePropertiesModel
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
				ComponentName: Strings.ConsumableTab,
				Duration: 0,
				Stats: new Stats()
			};
		},

		/**
		* generate 'this' into a serializable JSON object
		*
		* @param {Boolean} saveInternal - when true will serialize more values for internal usage
		* @return {Object} JSON object used for serialization
		*
		* @method toJSON
		* @public
		*/
		toJSON: function (si) {
			return {
				Name: this.attributes.Name,
				Duration: this.attributes.Duration,
				Stats: this.attributes.Stats.getSerializable(si)
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
			return undefined;
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