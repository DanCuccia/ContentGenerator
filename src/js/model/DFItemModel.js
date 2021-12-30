/**
* DFItemModel.js
* (c) 2015 All Rights Reserved.
* @author Daniel Cuccia
*/

define(["model/ModelBase"], function (ModelBase) {
	"use strict";

	/**
	* Contains the data internally used to track and save items within the Editor's display-field
	*
	* @class DFItemModel
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
				Left: 0,
				Top: 0,
				Locked: false,
				Center: { x: 0, y: 0 }
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
				Left: this.attributes.Left,
				Top: this.attributes.Top,
				Locked: this.attributes.Locked,
				Center: {
					x: this.attributes.Center.x,
					y: this.attributes.Center.y
				}
			};
		},

		/**
		* set the position of the display-field item
		*
		* @param {Number} x - X axis location
		* @param {Number} y = Y axis location
		*
		* @method setPosition
		* @public
		*/
		setPosition: function(x,y) {
			this.set({
				Left: x, Top: y, Center: {x:x+64,y:y+64}
			}, {validate: false, silent: true});
			this.trigger("Position");
		},

		/**
		* relatively effect the position of this item
		*
		* @param {Object} rel - object containing relative X,Y movement
		*
		* @method addPosition
		* @public
		*/
		addPosition: function(rel) {
			this.set({
				Left: this.attributes.Left-rel.x, Top: this.attributes.Top-rel.y, 
				Center: {x: this.attributes.Left-rel.x+64, y: this.attributes.Top-rel.y+64}
			}, {validate: false, silent: true});
			this.trigger("Position");
		}
	});
});