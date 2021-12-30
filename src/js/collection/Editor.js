/**
* Editor.js
* (c) 2015 All Rights Reserved.
* @author Daniel Cuccia
*/

define(["jquery", "underscore", 
	"collection/BaseCollection", 
	"view/EditorView", 
	"view/EditorMenubarView", 
	"model/ItemModel",
	"view/ComponentsView",
	"model/ProjectModel",
	"model/ProjectSettingsModel",
	"model/EditorModel"], 
	function($, _, 
		BaseCollection,
		EditorView, 
		MenubarView, 
		ItemModel,
		ComponentsView,
		ProjectModel,
		ProjectSettingsModel,
		EditorModel) {
		"use strict";

	/**
	* Editor Collection - governs all functionality of the main editor page
	*
	* @class Editor
	* @extends BaseCollection
	* @constructor
	* @public
	*/
	return BaseCollection.extend({

		/**
		* the current project which is being edited
		*
		* @member {ProjectModel} projectModel
		* @private
		*/
		projectModel: new ProjectModel(),

		/**
		* TODO: FIX THIS - SHOULD BE APART OF MODEL
		*/
		projectSettings: new ProjectSettingsModel(),

		/**
		* this editor's settings and configurations
		*
		* @member {EditorModel} editorModel
		* @private
		*/
		editorModel: new EditorModel(),

		/**
		* main initialize method
		*
		* @param {Object} params - input parameters to the collection
		*
		* @method initialize
		* @public
		*/
		initialize: function( params ) {
			BaseCollection.prototype.initialize.apply(this, arguments);
			this._isDirty = true;
			this._currentItem = null;
			this._initListeners();
		},

		/** 
		* Get a model by unique cid
		* 
		* @param {String} cid - unique backbone ID
		* @return {Model} backbone model or undefined
		*
		* @method getByCID
		* @public
		*/
		getByCID: function(cid) {
			var m=undefined,ml=this.models,l=ml.length;
			for(var i=0;i<l;i++){
				if(ml[i].cid === cid) {
					m=ml[i]; break;
				}
			}
			return m;
		},

		/**
		* determine if the unique ID exists
		*
		* @param {String} cid - backbone unique ID
		* @param {String} val - General Property attribute to match to
		* @return {Boolean} true if the model CID with general attribute val exists
		*
		* @method nameOrIdExists
		* @public
		*/
		nameOrIdExists: function(cid, val) {
			var c = this.models.length;
			for( var i = 0; i < c; i++ ) {
				var comp = this.models[i].getGeneral();
				if( comp.cid !== cid ) {
					if(comp.get("Name").toUpperCase() === val.toUpperCase() || comp.get("ID").toUpperCase() === val.toUpperCase() ) {
						return true;
					}
				}
			}
			return false;
		},

		/**
		* initialize internal observers
		*
		* @method _initListeners
		* @private
		*/
		_initListeners: function () {
			this.on("dirty", function () {
				this._isDirty = true;
			}, this);
			this.on("add", function (item) {
				this.trigger("dirty");
			}, this);
		},

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
			this.view = new EditorView({
				el: $el,
				collection: this,
				model: this.editorModel
			});
			this.menubar = new MenubarView({
				el: this.$el.find("#editor-menubar"),
				collection: this
			});
			this.$propertyEl = this.$el.find("#editor-propertyfield");
		},

		/**
		* reset this collection to a new/empty Project
		*
		* @method reset
		* @public
		*/ 
		reset: function () {
			BaseCollection.prototype.reset.call(this);
			if( this._currentItem !== null ) {
				this._currentItem.get("PropertyView").trigger("dispose");
				this._currentItem.unset("PropertyView");
				this._currentItem = null;
			}
			this.view.reset();
		},

		/**
		* determine if the current project has changed
		*
		* @method isDirty
		* @public
		*/
		isDirty: function () {
			return this.models.length === 0 ? false : this._isDirty;
		},

		/**
		* create a new item in the project
		*
		* @param {Object} params - ItemModel create parameters
		* @return {ItemModel} the newly created ItemModel
		*
		* @method createItem
		* @public
		*/
		createItem: function (params) {
			var item = new ItemModel(params);
			this.view.addDisplayfieldItem(item);
			this.add(item);
			return item;
		},

		/**
		* deselect the current display field item
		*
		* @method unSelectCurrent
		* @public
		*/
		unSelectCurrent: function () {
			this._setPropertyField(null);
			this.view.selectDFItem(null);
		},

		/**
		* select the argued item to the property field and display field
		*
		* @param {ItemModel} item - ItemModel to select on the screen
		*
		* @method selectItem
		* @public
		*/
		selectItem: function(item) {
			this._setPropertyField(item);
			this.view.selectDFItem(item);
		},

		/**
		* update the item property field on the screen
		*
		* @param {ItemModel} item - the model to update on the property field, or null to unselect
		*
		* @method _setPropertyField
		* @private
		*/
		_setPropertyField: function (item) {
			if( this._currentItem !== null ) {
				this._currentItem.get("PropertyView").trigger("dispose");
				this._currentItem.unset("PropertyView");
				this._currentItem = null;
			}
			if( item !== null ) {
				this._currentItem = item;
				this._currentItem.set("PropertyView", new ComponentsView({
					model: this._currentItem,
					el: this.$propertyEl,
					editor: this
				}));
			}
		},

		/**
		* search for an item by ID or Name
		*
		* @param {String} txt - search query, name or ID
		*
		* @method search
		* @public
		*/
		search: function(txt) {
			var output = {},
				count = this.models.length,
				This = this,
				total = 0,
				width = this.editorModel.get("Width") * 0.5,
				height = this.editorModel.get("Height") * 0.5;

			for( var i = 0, total; i < count && total < 5; i++ ) {
				var comp = this.models[i].getGeneral();
				if( comp.get("ID").indexOf(txt) === 0 || comp.get("Name").indexOf(txt) === 0 ) {
					output[comp.get("Name")] = (function (cid, w, h) {
						return function () {
							var item = This.getByCID(cid),
								center = item.get("DFItem").get("Center");
							This.selectItem( item );
							This.view.moveTo(-center.x + w, -center.y + h);
						};
					})(this.models[i].cid, width, height);
					total++;
				}
			}

			return total ? output : undefined;
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
		toJSON: function (saveInternal) {
			var output = {};

			if( saveInternal === true ) {
				output.Editor = {};
				output.Editor.Settings = this.editorModel.getSerializable(saveInternal);
			}

			output.Project = {};
			output.Project.Items = [];

			var itemCount = this.models.length;
			for( var i = 0; i < itemCount; i++ ) {
				output.Project.Items.push( this.models[i].getSerializable(saveInternal) );
			}

			return output;
		},

		/**
		* get an array of all model connections
		*
		* @return {Array} all connections from all Items
		*
		* @method getAllConnections
		* @public
		*/
		getAllConnections: function () {
			var output = [];
			var count = this.models.length;
			for( var i = 0; i < count; i++ ) {
				output = output.concat(this.models[i].getGeneral().get("Connections"));
			}
			return output;
		}
	});
});