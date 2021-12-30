/**
* UnSupported.js
* (c) 2015 All Rights Reserved.
* @author Daniel Cuccia
*/

define(["collection/BaseCollection", "view/UnSupportedView"], function (BaseCollection, UnSupportedView) {
	"use strict";

	/**
	* UnSupported Collection, governs the functionality of the "unsupported browser" screen
	*
	* @class UnSupported
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
		render: function($el) {
			BaseCollection.prototype.render.apply(this, arguments);
			this.view = new UnSupportedView({
				el: $el,
				collection: this
			});
		}
	});
});