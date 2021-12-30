/**
* ItemModel.js
* (c) 2015 All Rights Reserved.
* @author Daniel Cuccia
*/

define(["model/ModelBase", 
	"model/GeneralPropertiesModel",
	"model/RenderablePropertiesModel",
	"model/EquipablePropertiesModel",
	"model/ConsumablePropertiesModel",
	"model/TagsPropertiesModel",
	"model/DFItemModel"],
	function (ModelBase, 
		GeneralPropertiesModel,
		RenderablePropertiesModel,
		EquipablePropertiesModel,
		ConsumablePropertiesModel,
		TagsPropertiesModel,
		DFItemModel) {
	"use strict";

	/**
	* This is the meca of a single item, but because most of the logic is broken into
	* their own respective component, this guy really just manages the all
	*
	* @class ItemModel
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
				Components: [ new GeneralPropertiesModel({Item: this}) ],
				DFItem: new DFItemModel()
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
		toJSON: function (saveInternal) {
			var output = {};

			if( saveInternal === true ) {
				output.DFItem = this.attributes.DFItem.getSerializable(saveInternal);
			}

			output.Components = [];
			for( var i = 0; i < this.attributes.Components.length; i++ ) {
				output.Components.push( this.attributes.Components[i].getSerializable(saveInternal) );
			}

			return output;
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
			for( var i = 0; i < attributes.Components.length; i++ ) {
				if( attributes.Components[i].isValid() === false ) {
					msg = msg || this.emptyError();
					var temp = attributes.Components[i].validationError.errors;
					if( temp && temp.length ) {
						msg.errors.concat(temp);
					}
					temp = attributes.Components[i].validationError.warnings;
					if(temp && temp.length ) {
						msg.warnings.concat(temp);
					}
				}
			}
			return msg && (msg.errors.length || msg.warnings.length) ? msg : undefined;
		},

		/**
		* internally called to get a component by instance type checks
		*
		* @param {Constructor} instance - Model constructor to compare against
		* @return {ComponentModel} the current component of the argued constructor type, or null if not found
		*
		* @method _getComponent
		* @private
		*/
		_getComponent: function (instance) {
			var comps = this.get("Components");
			for( var i = 0; i < comps.length; i++ ) {
				if( comps[i] instanceof instance ) {
					return comps[i];
				}
			}
			return null;
		},

		/**
		* method called to create, add, or retrieve a component of the argued type
		*
		* @param {String} name of the component to retrieve
		* @return {ComponentModel} newly created model, or undefined if the argued component name has no match
		*
		* @method createComponent
		* @public
		*/
		createComponent: function (type) {
			var comp;
			switch(type) {
				case "Renderable": comp = (this._getComponent(RenderablePropertiesModel) || new RenderablePropertiesModel({Item: this})); break;
				case "Equipable": comp = (this._getComponent(EquipablePropertiesModel) || new EquipablePropertiesModel({Item: this})); break;
				case "Consumable": comp = (this._getComponent(ConsumablePropertiesModel) || new ConsumablePropertiesModel({Item: this})); break;
				case "Tags": comp = (this._getComponent(TagsPropertiesModel) || new TagsPropertiesModel({Item: this})); break;
				default: comp = null; break;
			}
			if( comp !== null ) {
				var comps = this.get("Components");
				comps.push(comp);
				this.set("Components", comps);
				return comp;
			}
		},

		/**
		* count the total amount of warnings and errors
		*
		* @return {Object} object containing total errors and warnings {errors:n,warnings:n}
		*
		* @method getTotalNotifications
		* @public
		*/
		getTotalNotifications: function () {
			var o = {errors:0,warnings:0};
			for( var i = 0; i < this.attributes.Components.length; i++ ) {
				if( this.attributes.Components[i].validationError ) {
					o.errors += this.attributes.Components[i].validationError.errors.length;
					o.warnings += this.attributes.Components[i].validationError.warnings.length;
				}
			}
			return o;
		},

		/**
		* sort of a helper method to get the often used "General" component
		*
		* @return {GeneralPropertiesModel} the general property model which all Items define
		*
		* @method getGeneral
		* @public
		*/
		getGeneral: function () {
			return this.attributes.Components[0];
		}
	});
});