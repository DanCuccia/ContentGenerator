/**
* ComponentsView.js
* (c) 2015 All Rights Reserved.
* @author Daniel Cuccia
*/

define(["view/ViewBase", "i18n!nls/editor"], function (ViewBase, Strings) {
	"use strict";

	return ViewBase.extend({
		events: {
			"click #comp-delete": "onDeleteCurrent",
			"click #comp-children": "onToggleChildren",
			"click #comp-parents": "onToggleParents"
		},

		_currentIndex: null,
		_currentComponent: null,

		initialize: function (params) {
			this.editor = params.editor;
			this.template(this.$el, "components-template", params, Strings);
			ViewBase.prototype.initialize.apply(this, arguments);
			this._createAddTab();
			this.updateComponentTabs();
			this.selectTab( 0 );
			this.updateNotifications();
		},

		_createTab: function($targetEl, component) {
			var This = this;
			var el = $("<li><a></a></li>")
				.find("a").attr({
					id: "comp-"+component.get("ComponentName"),
					href: "javascript:;"
				}).addClass("unlink-link").html(component.get("ComponentName")).on("click.selectComponent", function () {
					This.selectTab($(this).parent().index());
				}).end();
			if( $targetEl.children().length ) {
				el.insertBefore($targetEl.children().last());
			} else {
				el.appendTo($targetEl);
			}
		},

		_createAddTab: function() {
			var This = this;
			$("<li><a><span></span></a></li>")
				.find("a").attr({
					id: "comp-addnew",
					href: "javascript:;"
				}).addClass("inlink-link").end()
				.find("span").attr({
					id: "comp-addnew-icon"
				}).addClass("fa fa-plus-square-o fa-2x color-white").end()
				.find("a span").on("click.addComponent", function () {
					This.onAddNewComponent();
				}).end()
				.appendTo(this.$el.find("#component-tabs"));
		},

		updateComponentTabs: function () {
			var tabEl = this.$el.find("#component-tabs");
			var components = this.model.get("Components");
			for( var i = 0; i < components.length; i++ ) {
				if( tabEl.find("#comp-"+components[i].get("ComponentName")).length ) {
					continue;
				} else {
					this._createTab(tabEl, components[i]);
				}
			}
		},

		onDeleteCurrent: function () {

		},

		_displayToggle: 0,
		onToggleChildren: function () {
			if( this._displayToggle !== -1 ) {
				this._displayToggle = -1;
				this.editor.view.showRelationship(this._currentComponent.get("Item").cid, this._displayToggle);
			} else if( this._displayToggle === -1 ) {
				this._displayToggle = 0;
				this.editor.view.showRelationship(null, this._displayToggle);
			}
		},

		onToggleParents: function () {
			if( this._displayToggle !== 1 ) {
				this._displayToggle = 1;
				this.editor.view.showRelationship(this._currentComponent.get("Item").cid, this._displayToggle);
			} else if( this._displayToggle === 1 ) {
				this._displayToggle = 0;
				this.editor.view.showRelationship(null, this._displayToggle);
			}
		},

		updateNotifications: function () {
			var totals = this.model.getTotalNotifications();
			var ntTarget = this.$el.find(".comp-notifications");
			if(totals.errors > 0 && ntTarget.find(".color-error").text() != totals.errors) {
				ntTarget.find(".color-error-bkg").remove();
				$("<div>", {
					addClass: "prop-item-not-icon color-error-bkg",
					text: totals.errors
				}).appendTo(ntTarget);
			} else if( totals.errors === 0 ) {
				ntTarget.find(".color-error-bkg").remove();
			}

			if(totals.warnings > 0 && ntTarget.find(".color-warning").text() != totals.warnings) {
				ntTarget.find(".color-warning-bkg").remove();
				$("<div>", {
					addClass: "prop-item-not-icon color-warning-bkg",
					text: totals.warnings
				}).appendTo(ntTarget);
			} else if( totals.warnings === 0 ) {
				ntTarget.find(".color-warning-bkg").remove();
			}

			this.model.get("DFItem").trigger("ntupdate", totals);
		},

		selectTab: function (tabIndex) {
			if( tabIndex === this._currentIndex ) {
				return;
			}
			
			var propsEl = this.$el.find("#component-prop-container"),
				view;

			if( this._currentComponent !== null ) {
				view = this._currentComponent.get("PropertyView");
				view.remove();
				this._currentComponent.unset("PropertyView");
			}

			this._currentComponent = this.model.get("Components")[tabIndex];
			this._currentIndex = tabIndex;

			view = this._currentComponent.createPropertyView(propsEl.append($("<div>")).children(), this.model);
			this._currentComponent.set("PropertyView", view);

			var This = this;
			this.model.on("ntupdate", function () {
				This.updateNotifications();
			});
		},

		onAddNewComponent: function () {
			var This = this,
				offset = this.$el.find("#comp-addnew-icon").offset(),
				options = {};

			options[Strings.RenderableTab] = function () {
				var comp = This.model.createComponent("Renderable");
				This.updateComponentTabs();
				This.selectTab(This.model.get("Components").length -1);
			};
			options[Strings.EquipableTab] = function () {
				var comp = This.model.createComponent("Equipable");
				This.updateComponentTabs();
				This.selectTab(This.model.get("Components").length -1);
			};
			options[Strings.ConsumableTab] = function () {
				var comp = This.model.createComponent("Consumable");
				This.updateComponentTabs();
				This.selectTab(This.model.get("Components").length -1);
			};
			options[Strings.TagsTab] = function () {
				var comp = This.model.createComponent("Tags");
				This.updateComponentTabs();
				This.selectTab(This.model.get("Components").length -1);
			};
			
			require("app").spawnDropdown(offset.left, offset.top, options);
		}
	});
});