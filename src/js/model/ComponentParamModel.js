/**
* ComponentParamModel.js
* (c) 2015 All Rights Reserved.
* @author Daniel Cuccia
*/


define(["model/ModelBase", "util/Utility", "i18n!nls/msg"], function (ModelBase, Util, MsgStrings) {
	"use strict";

	/**
	* Data container of a Component-Parameter, which is composed by the ComponentModel
	*
	* @class ComponentParamModel
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
				Key: "",
				Label: "",
				Type: undefined,
				Required: false,
				UseRegex: false,
				RegEx: null
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
		validate: function (attributes) {
			var output = undefined;

			if( Util.IsNullOrEmpty(attributes.Key) ) {
				output = this.emptyError();
				output.errors.push(MsgStrings.KeyUndefined);
			}

			if( Util.IsNullOrEmpty(attributes.Label) ) {
				output = output || this.emptyError();
				output.errors.push(MsgStrings.LabelUndefined);
			}

			return output;
		}
	});
});