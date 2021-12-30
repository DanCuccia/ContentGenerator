/**
* EditorMenubarView.js
* (c) 2015 All Rights Reserved.
* @author Daniel Cuccia
*/

define(["require", "view/ViewBase", "util/Utility", "i18n!nls/editor", "i18n!nls/msg"], 
	function(require, ViewBase, Util, Strings, MsgStrings) {
	"use strict";

	return ViewBase.extend({
		events: {
			"click #file-new": "onNew",
			"click #file-load": "onLoad",
			"click #file-quit": "onQuit",

			"click #file-save": "onSave",
			"click #file-save-cgen": "onSaveCgen",
			"click #file-save-json": "onSaveJson",
			"click #file-save-xml": "onSaveXml",

			"click #edit-proj-settings": "onEditProjectSettings",
			"click #edit-create-empty": "onCreateEmpty",
			"click #edit-create-keyitem": "onCreateKeyitem",
			"click #edit-create-consumable": "onCreateConsumable",
			"click #edit-create-armor": "onCreateArmor",
			"click #edit-create-weapon": "onCreateWeapon",

			"input #menubar-search-input": "onSearchInput",

			"click #help-about": "onAbout"
		},

		initialize: function (params) {
			this.editor = params.collection;
			this.template(this.$el, "editor-menubar-template", params, Strings);
			ViewBase.prototype.initialize.apply(this, arguments);
		},

		// ======= File Menu =====================

		onNew: function () {
			if( this.editor.isDirty() === false ) {
				this.editor.reset();
			} else {
				var This = this,
					options = {};

				options[MsgStrings.Yes] = function () {

				};

				options[MsgStrings.No] = function () {
					This.editor.reset();
				};

				options[MsgStrings.Cancel] = function () {

				};

				require("app").spawnMessageBox("Question", true, MsgStrings.SaveCurrent, options);
			}
		},

		onLoad: function () {
			if( this.editor.isDirty() === false ) {

			} else {
				var This = this,
					options = {};

				options[MsgStrings.Yes] = function () {

				};

				options[MsgStrings.No] = function () {
					This.editor.reset();
				};

				options[MsgStrings.Cancel] = function () {

				};

				require("app").spawnMessageBox("Question", true, MsgStrings.SaveCurrent, options);
			}
		},

		onQuit: function () {
			var app = require("app");
			if( this.editor.isDirty() === false ) {
				app.navigate("menu", { trigger: true, replace: false });
			} else {
				var This = this,
					options = {};

				options[MsgStrings.Yes] = function () {

				};

				options[MsgStrings.No] = function () {
					This.editor.reset();
					app.navigate("menu", {trigger: true, replace: true});
				};

				options[MsgStrings.Cancel] = function () {

				};

				app.spawnMessageBox("Question", true, MsgStrings.SaveCurrent, options);
			}
		},

		onSave: function () {
			var toSave = null;
			try {
				toSave = this.editor.getSerializable(true);
				this.editor.projectModel.save(toSave, function () {

				}, function () {
					
				});
			} catch(e) {
				toSave = null;
				var options = {};

				options[MsgStrings.OK] = function () {

				};

				require("app").spawnMessageBox("Error", true, MsgStrings.SaveError, options);
			}
		},

		onSaveCgen: function () {
			this.editor.projectModel.saveToCgenFile( function () {

			}, function () {
				
			});
		},

		onSaveJson: function () {
			this.editor.projectModel.saveToJsonFile( function () {

			}, function () {
				
			});
		},

		onSaveXml: function () {
			this.editor.projectModel.saveToXmlFile( function () {

			}, function () {
				
			});
		},

		// ======== Edit Menu ======================

		onEditProjectSettings: function () {
			// open project settings popup
		},

		onCreateEmpty: function () {
			this.editor.selectItem(this.editor.createItem());
		},

		onCreateKeyitem: function () {
			var item = this.editor.createItem();
			this.editor.selectItem(item);
		},

		onCreateConsumable: function () {
			var item = this.editor.createItem();
			item.createComponent("Consumable");
			item.createComponent("Renderable");
			this.editor.selectItem(item);
		},

		onCreateArmor: function () {
			var item = this.editor.createItem();
			item.createComponent("Renderable");
			item.createComponent("Equipable");
			this.editor.selectItem(item);
		},

		onCreateWeapon: function () {
			var item = this.editor.createItem();
			item.createComponent("Renderable");
			item.createComponent("Equipable");
			this.editor.selectItem(item);
		},

		// ================ Help Menu ======================================

		onAbout: function () {
			var options = {};
			options[MsgStrings.OK] = function () {};
			require("app").spawnMessageBox("Question", true, MsgStrings.About, options);
		},

		// ================ SEARCH ==========================================

		onSearchInput: function () {
			var input = this.$el.find("#menubar-search-input"),
				val = input.val(),
				offset = input.offset();
			if( val.length ) {
				var results = this.editor.search(val);
				if( results ) {
					require("app").spawnDropdown(offset.left +12, offset.top +12, results);
				}
			}
		}
	});
});