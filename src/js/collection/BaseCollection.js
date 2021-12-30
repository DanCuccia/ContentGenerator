/**
* BaseCollection.js
* (c) 2015 All Rights Reserved.
* @author Daniel Cuccia
*/

define(["backbone"], function (Backbone) {
	"use strict";

	/**
	* parent controller with base functionality for all collections to inherit from
	*
	* @class BaseCollection
	* @abstract contructor
	* @public
	*/
	return Backbone.Collection.extend({
		
		/**
		* main initialize method
		*
		* @param {Object} params - input parameters to the collection
		*
		* @method initialize
		* @public
		*/
		initialize: 		function (params) { },

		/**
		* bring the collection into view
		*
		* @param {Function} cb - callback to execute when animation completes
		*
		* @method animateIn
		* @public
		*/
		animateIn: 			function (cb) { cb(); },

		/**
		* bring the collection out of view
		*
		* @param {Function} cb - callback to execute when animation completes
		*
		* @method animateOut
		* @public
		*/
		animateOut: 		function (cb) { cb(); },

		/**
		* render the collection to the screen, initializes this.$el
		*
		* @param {jQuery} $el - target element to render into
		*
		* @method render
		* @public
		*/
		render: 			function ($el) { this.$el = $el; },

		/**
		* generate 'this' into a serializable JSON object
		*
		* @param {Boolean} si - save internal - when true will serialize more values for internal usage
		* @return {Object} JSON object used for serialization
		*
		* @method toJSON
		* @public
		*/
		toJSON: 			function (si) { return {}; },

		/**
		* remove references and cleanup objects
		*
		* @method dispose
		* @public
		*/
		dispose: 			function () { }, 

		/**
		* if assigned true, the collection will dispose itself when navigated away from
		*
		* @member navDispose
		* @public
		*/
		navDispose: 		false
	});
});