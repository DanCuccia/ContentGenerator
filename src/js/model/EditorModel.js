/**
* EditorModel.js
* (c) 2015 All Rights Reserved.
* @author Daniel Cuccia
*/

define(["underscore", "model/ModelBase"], function(_, ModelBase){
	"use strict";

	/**
	* Contains the data internally used to track the editor's display field settings
	*
	* @class EditorModel
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
				Zoom: 1.0,
				ZoomStep: 0.5,
				MinZoom: 0.5,
				MaxZoom: 1.5,
				Left: 0,
				Top: 0,
				Width: 0,
				Height: 0
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
		toJSON: function () {
			return _.clone( this.attributes );
		},

		/**
		* modify the argued relative movement according to the currently set zoom level
		*
		* @param {Object} mvt - relative X,Y movement
		* @return {Object} modified relative movement factoring zoom
		*
		* @method getZoomMod
		* @public
		*/
		getZoomMod: function (mvt) {
			if( this.attributes.Zoom > 1 ) {
				mvt.x *= 0.5;
				mvt.y *= 0.5;
			} else if( this.attributes.Zoom < 1 ) {
				mvt.x *= 1.5;
				mvt.y *= 1.5;
			}
			return mvt;
		}
	});
});