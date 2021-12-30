/**
* DFItemView.js
* (c) 2015 All Rights Reserved.
* @author Daniel Cuccia
*/

define(["view/ViewBase", "util/Dragger"], function(ViewBase, Dragger) {
	"use strict";

	/**
	* View used to interact with an item on the editor's display-field
	*
	* @class DFItemView
	* @constructor
	* @public
	*/
	return ViewBase.extend({
		events: {

		},

		initialize: function (params) {
			this.template(this.$el, "df-item-template");
			this.editor = params.editor;
			this.dfItem = this.model.get("DFItem");
			this._updateIcon();
			this._initEvents();
			ViewBase.prototype.initialize.apply(this, arguments);
		},

		_initEvents: function () {
			var This = this;
			this.model.on("icon-change", function() { 
				This._updateIcon.apply(This, arguments); 
			});
			this.model.getGeneral().on("change:Name", function (m, n, p) {
				This.$el.find(".df-item-name").html(n);
			});
			this.dfItem.on("Position", function(m,v,p) {
				This._updatePosition(this.attributes);
			});
			this.dfItem.on("ntupdate", function(t) {
				This._updateNotifications(t);
			});

		},

		_updatePosition: function(pos) {
			this.$el.css({
				left: pos.Left,
				top: pos.Top
			});
		},

		_updateIcon: function () {
			var renderComponent = this.model.get("Components").where( function(component) {
				return component.Type === "Renderable";
			});
			var contentTarget = this.$el.find(".df-item-content");
			if( contentTarget.children().length ) {
				contentTarget.children().remove();
			}

			if( renderComponent ) {

			} else {
				contentTarget.append($("<i>", { addClass: "fa fa-picture-o fa-4x df-item-icon color-white"}));
			}
		},

		_updateNotifications: function(totals) {
			this.$el.find(".df-item-not-icon").hide();
			if( totals && totals.errors ) {
				this.$el.find(".panel-heading .color-error").show();
			}
			if( totals && totals.warnings ) {
				this.$el.find(".panel-heading .color-warning").show();
			}
		}
	});
});