/**
* UnSupportedView.js
* (c) 2015 All Rights Reserved.
* @author Daniel Cuccia
*/

define(["jquery", "view/ViewBase"], function ($, ViewBase) {
	"use strict";

	return ViewBase.extend({
		events: {
			"#goto-chrome": "onGotoChrome",
			"#goto-firefox": "onGotoFirefox"
		},

		initialize: function () {

		},

		onGotoChrome: function () {
			window.open("http://www.google.com/chrome/").focus();
		},

		onGotoFirefox: function () {
			window.open("https://www.mozilla.org/").focus();
		}
	});
});