/**
* CompEditor.js
* (c) 2015 All Rights Reserved.
* @author Daniel Cuccia
*/

define(["collection/BaseCollection", "view/CompEditorView", "model/ComponentModel"], 
	function (BaseCollection, CompEditorView, CompModel) {
	"use strict";

	/**
	* Component Editor Collection, governs the functionality of the component editor screen
	*
	* @class CompEditor
	* @extends BaseCollection
	* @constructor
	* @public
	*/
	return BaseCollection.extend({

		/**
		* when internal models change dirty is set to true
		*
		* @member _dirty
		* @private
		*/
		_dirty: false,

		/*
		* the component this editor is currently modifying
		*
		* @member _component
		* @private
		*/
		_component: new CompModel(),

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
			this.view = new CompEditorView({
				el: $el,
				collection: this
			});
		},

		/**
		* determine if the current model has changed
		*
		* @method isDirty
		* @public
		*/
		isDirty: function () {
			return this._dirty;
		}
	});
});