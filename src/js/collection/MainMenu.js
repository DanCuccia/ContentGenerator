/**
* MainMenu.js
* (c) 2015 All Rights Reserved.
* @author Daniel Cuccia
*/

define(["jquery", "underscore", "collection/BaseCollection", "view/MenuView"], function($, _, BaseCollection, MenuView){
	"use strict";

	/**
	* Editor Main Menu Collection - governs the editor's main menu functionality
	*
	* @class MainMenu
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
			this.view = new MenuView({
				el: $el,
				collection: this
			});
		}
	});
});