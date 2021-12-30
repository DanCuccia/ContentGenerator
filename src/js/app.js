/**
* App.js
* (c) 2015 All Rights Reserved.
* @author Daniel Cuccia
*/

define(["jquery", "underscore", "backbone", "router", "bootstrap"], 
	function  ($, _, Backbone, Router, Bootstrap) {
		
		_.templateSettings = {
		  interpolate: /\{\{(.+?)\}\}/g
		};

		Backbone.history.start({silent: true});

		$(window).resize(function () {
			Router.resize();
		});

		return Router;
});