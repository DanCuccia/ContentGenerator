/**
* ViewBase.js
* (c) 2015 All Rights Reserved.
* @author Daniel Cuccia
*/

define(["jquery", "underscore", "backbone"],
	function ($, _, Backbone) {

	"use strict";

	var _templateCache = { };

	return Backbone.View.extend({
		_loadTemplate: function(name) {
			_templateCache[name] = $($("#" + name)[0].content.cloneNode(true)).children().html();
			return _templateCache[name];
		},

		template: function($el, name, params, strings) {
			var content;
			if( _templateCache[name] !== undefined ) {
				content = _templateCache[name];
			} else {
				content = this._loadTemplate(name);
			}

			$el.html(_.template(content || "")( params || {} ));

			strings && this.localize($el, strings);
		},

		localize: function($el, strings) {
			var parts = $el.html().match(/\|\|(.+?)\|\|/g);
			if(parts !== null) {
				for( var i = 0; i < parts.length; i++ ) {
					var id = parts[i].replace(/\||str:/g, "");
					if( strings[id] ) {
						$el.html( $el.html().replace("||str:"+id+"||", strings[id] ) );
					}
				}
			}
		},

		initialize: function(params) {
			this.$el.find("ul.dropdown-menu [data-toggle=dropdown]").on("click.bssubdropdown", function (e) {
				e.preventDefault();
				e.stopPropagation();
				var t = $(this);
				t.parent().siblings().removeClass("open");
				t.parent().toggleClass("open");
			});

			var This = this;
			this.on("dispose", function () {
				This.undelegateEvents();
				This.$el.children().remove();
			});
		},
	});
});