/**
* ComponentModel.js
* (c) 2015 All Rights Reserved.
* @author Daniel Cuccia
*/


define(["model/ModelBase", "util/Utility", "i18n!nls/msg"], function (ModelBase, Util, MsgStrings) {
	"use strict";

	/**
	* Data container of a Component, which containers parameters used to describe
	* the data of the component
	*
	* @class ComponentModel
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
				Name: "",
				Parameters: []
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
		validate: function(attributes) {
			var output = undefined,
				pError = undefined,
				count = attributes.Parameters.length;

			if( Util.IsNullOrEmpty(attributes.Name) ) {
				output = output || this.emptyError();
				output.errors.push(MsgStrings.NameUndefined);
			}

			for( var i = 0; i < count; i++ ) {
				if( attributes.Parameters[i].isValid() === false ) {
					output = output || this.emptyError();
					pError = attributes.Parameters[i].validationError;
					output.errors = output.errors.concat( pError.errors );
					output.warnings = output.warnings.concat( pError.warnings );
				}
			}

			return output;
		}
	});
});