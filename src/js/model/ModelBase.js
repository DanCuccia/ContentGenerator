/**
* ModelBase.js
* (c) 2015 All Rights Reserved.
* @author Daniel Cuccia
*/

define(["backbone"], function (Backbone) {
	"use strict";

	/**
	* Parent to all model types providing common functionality for all
	*
	* @abstract
	* @class ModelBase
	* @extends BackboneModel
	* @constructor
	* @public
	*/
	return Backbone.Model.extend({

		/**
		* overriden set to always validate, and not validate at the same time
		* see backbone documentation (backbonejs.org)
		*/
		set: function(attr, val, params) {
			params = params || {};
			var ov = params.validate;
			params.validate = false;
			Backbone.Model.prototype.set.apply(this, [attr, val, params]);
			params.validate = ov === false ? ov : true;
			Backbone.Model.prototype.set.apply(this, ["|"+attr+"|", val, params]);
		},

		/**
		* overriden set to retrieve the un-validated value
		*
		* @param {String} attr - key of the attribute to retrieve
		* @param {Bool} validated - true if you want the validated version of the value
		*
		* @method get
		* @public
		*/
		get: function(attr, validated) {
			if( validated ) {
				return Backbone.Model.prototype.get.call(this, "|"+attr+"|");
			} else return Backbone.Model.prototype.get.call(this, attr);
		},

		/**
		* create a new empty error which all models contain
		*
		* @return {Object} {errors:[],warnings:[]} all models will use this to append errors/warnings onto for .validate()
		*
		* @method emptyError
		* @protected
		*/
		emptyError: function () {
			return { errors: [], warnings: [] };
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
			return {};
		}
	});
});