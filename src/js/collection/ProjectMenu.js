/**
* ProjectMenu.js
* (c) 2015 All Rights Reserved.
* @author Daniel Cuccia
*/

define(["collection/BaseCollection", "view/ProjectMenuView"], function (BaseCollection, ProjectMenuView) {
	"use strict";

	/**
	* Project Menu Collection governs the Project Menu functionality
	*
	* @class ProjectMenu
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
			this.view = new ProjectMenuView({
				el: $el,
				collection: this
			});
		}
	});
});