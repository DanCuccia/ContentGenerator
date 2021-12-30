define(["backbone"], function(Backbone) {
	"use strict";

	/**
	* a project settings container EditorCollection will use
	*
	* @class ProjectSettingsModel
	* @public
	*/
	return Backbone.Model.extend({
		defaults: function () {
			return {
				ProjectName: "",
				ProjectVersion: 0.0
			};
		},
		
		getSerializable: function (si) {
			return {
				ProjectName: this.attributes.ProjectName,
				ProjectVersion: this.attributes.ProjectVersion
			};
		}
	});
});