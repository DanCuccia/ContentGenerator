/**
* GeneralPropertiesModel.js
* (c) 2015 All Rights Reserved.
* @author Daniel Cuccia
*/

define(["require", "model/ModelBase", "view/GeneralPropertiesView", "util/Utility", "i18n!nls/editor", "i18n!nls/msg"], 
	function (require, ModelBase, GeneralPropertiesView, Util, Strings, MsgStrings) {
	"use strict";

	/**
	* Item Data-Set representing general information all Items have
	*
	* @class GeneralPropertiesModel
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
				ID: "",
				Name: "",
				Description: "",
				ComponentName: Strings.GeneralTab,
				Connections: []
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
			var output = {
				ID: this.attributes.ID,
				Name: this.attributes.Name,
				Description: this.attributes.Description,
				ComponentName: this.attributes.ComponentName,
				Connections: []
			};

			for( var i = 0; i < this.attributes.Connections.length; i++ ) {
				output.Connections.push( this.attributes.Connections[i].getSerializable(saveInternal) );
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

			var editor = require("app").getCollection("editor");

			if( Util.IsNullOrEmpty(attributes.ID) ) {
				msg = { errors: [], warnings: [] };
				msg.errors.push(MsgStrings.IDUndefined);
			} else if( editor.nameOrIdExists(this.cid, attributes.ID) ) {
				msg = msg || { errors: [], warnings: [] };
				msg.errors.push(MsgStrings.DuplicateID);
			}

			if( Util.IsNullOrEmpty(attributes.Name) ) {
				msg = msg || { errors: [], warnings: [] };
				msg.errors.push(MsgStrings.NameUndefined);
			} else if( editor.nameOrIdExists(this.cid, attributes.Name) ) {
				msg = msg || { errors: [], warnings: [] };
				msg.errors.push(MsgStrings.DuplicateName);
			}

			if( Util.IsNullOrEmpty(attributes.Description)) {
				msg = msg || { errors: [], warnings: [] };
				msg.warnings.push(MsgStrings.DescriptionUndefined);
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
			return new GeneralPropertiesView({
				el: $el,
				model: this,
				Item: item
			});
		}
	});
});