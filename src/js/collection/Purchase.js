/**
* Purchase.js
* (c) 2015 All Rights Reserved.
* @author Daniel Cuccia
*/

define(["collection/BaseCollection", "view/PurchaseView"], function (BaseCollection, PurchaseView) {
	"use strict";

	/**
	* Purchase Collection - main functionality controller for the purchase scree
	*
	* @class Purchase
	* @extends BaseCollection
	* @constructor
	* @public
	*/
	return BaseCollection.extend({

		/**
		* render the collection to the screen
		*
		* @param {jQuery} $el - target element to render into
		*
		* @method render
		* @public
		*/
		render: function ($el) {
			BaseCollection.prototype.render.apply(this, arguments);
			this.view = new PurchaseView({
				el: $el,
				collection: this
			});
		}
	});
});