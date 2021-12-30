/**
* ProjectMenuView.js
* (c) 2015 All Rights Reserved.
* @author Daniel Cuccia
*/

define(["require", "view/ViewBase", "i18n!nls/editor"], function (require, ViewBase, Strings) {
	"use strict";

	var _mtarget = $("#content");

	return ViewBase.extend({
		events: {
			"click .to-projlist": "toProjectList",
			"click .to-restmap": "toRestMapping",
			"click .to-members": "toMembers"
		},

		_projects: [],
		_tabViews: [],
		_projModal: null,

		initialize: function (params) {
			this.template(this.$el, "project-menu-template", params, Strings);
			ViewBase.prototype.initialize.apply(this, arguments);

			require("app").on("load", this.onProjectLoad, this);
			require("app").on("unload", this.onProjectUnload, this);
		},

		dispose: function () {
			require("app").off("load", this.onProjectLoad);
			require("app").off("unload", this.onProjectUnload);
		},

		onProjectLoad: function (proj) {
			console.dir(proj);
		},

		onProjectUnload: function (proj) {

		},

		toProjectList: function () {
			var content = this.$el.find("#projmenu-content");
			content.children().remove();
			this.template(content, "project-panel-template", {}, Strings);

			var This = this;
			require(["util/Ajax"], function (Ajax) {
				Ajax.ProjectOverviewList(function (p) { 
					This.loadProjectList(p); 
				});
			});
			
			return false;
		},

		loadProjectList: function (projects) {
			if( projects !== null ) {
				var This = this;
				require(["view/ProjectTabView"], function (TabView) {
					This._projects = projects;
					var target = This.$el.find("tbody");
					for( var i = 0; i < projects.length; i++ ) {
						var el = $("<tr></tr>", { 
							addClass: "project-tr"
						}).appendTo(target);

						el.on("click.selectProj", (function (proj, $el) {
							return function () {
								This.selectProj(proj, $el);
							};
						})(projects[i], el));

						This._tabViews.push(new TabView({
							el: el,
							model: projects[i]
						}));
					}
				});
			}
		},

		selectProj: function (proj, $row) {
			var This = this;
			require(["view/ProjectModalView"], function (Modal) {
				This._projModal = new Modal({
					el: $("<div>", {addClass: "wh100"}).appendTo(_mtarget),
					model: proj
				});
				This._projModal.on("close", function () {
					This._projModal.remove();
					This._projModal = null;
				});
			});
		},

		toRestMapping: function () {

		},

		toMembers: function () {

		}
	});
});