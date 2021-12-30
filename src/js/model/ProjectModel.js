/**
* ProjectModel.js
* (c) 2015 All Rights Reserved.
* @author Daniel Cuccia
*/


define(["model/ModelBase", "i18n!nls/editor"], function (ModelBase, Strings) {
	"use strict";

	/**
	* A model which EditorCollection will use as a value container for file-IO
	*
	* @class ProjectModel
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
				ProjectID: (Math.random() * 99999).toFixed(0),
				ProjectName: Strings.NewProjName,
				LastSaveTime: null,
				CreateTime: Date.now(),
				Status: [Strings.ProjStatusInactive],
				Size: 0,
				Errors: 0,
				Warnings: 0,
				TotalObjects: 0,
				Components: [],
				Models: []
			};
		},

		/**
		* initialize memeber variables and references
		*
		* @method initialize
		* @public
		*/
		initialize: function () {
			this.$inputEl = $("#fproxy");
			this.$inputEl.attr("accept", ".cgen,.json,.xml");
			this.attributes.CreateDate = (new Date( this.attributes.CreateTime*1000 )).getDateString();
			this.attributes.LastSaveDate = this.attributes.LastSaveTime ? this.attributes.LastSaveTime : Strings.DateTimeUndefined;
		},

		save: function (data, onComplete) {
			if( this.get("Filepath") ) {
				require("lib/filesave"); // ....
			} else {
				this.saveAs(data, onComplete);
			}
		},

		saveAs: function (data, onComplete) {
			this.$inputEl.trigger("click");
			this.$inputEl.one("change", function() {
				if(this.length) {
					// ...
				}
				console.dir(arguments);
				console.dir(this);
			});
		},

		saveToCgenFile: function(data, onComplete) {

		},

		saveToJsonFile: function(data, onComplete) {

		},

		saveToXmlFile: function(data, onComplete) {

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
		toJSON: function(si) {
			
		}
	});
});