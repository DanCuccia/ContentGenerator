/**
* Main.js
* (c) 2015 All Rights Reserved.
* @author Daniel Cuccia
*/

require.config({
	paths: {
		app: "app",
		jquery: "lib/jquery-2.1.3.min",
		underscore: "lib/underscore",
		backbone: "lib/backbone.min",
		bootstrap: "lib/bootstrap"
	}/*,

	config: {
		i18n: {
			locale: "zh"
		}
	}*/
});

var _DEBUG_ = true,
	nullfn = function(){};

require(["require", "jquery"], function(require, $) {
	require(["app"], function(App) {
		var frag = document.location.hash;
		var refreshHash = frag && frag.substr(1, frag.length);
		if (refreshHash) {
			App[App.routes[refreshHash]]();
		} else {
			App.navigate("menu", {trigger: true});
		}
	});
});