/**
* Router.js
* (c) 2015 All Rights Reserved.
* @author Daniel Cuccia
*/

define(["require", "jquery", "backbone", "util/Utility"], function(require, $, Backbone, Util) {
	"use strict";

	var _collections = {},
		$menubar = $("#menubar").hide(),
		$content = $("#innerBody"),
		_current = null,
		$mboxTarget = $("#content");

	function _removeCollection (c) {
		if( typeof c === "string" ) {
			delete _collections[c];
		} else if( typeof c === "[object Object]" ) {
			for( var k in _collections ) {
				if( _collections[k] === c ) {
					delete _collections[k];
					break;
				}
			}
		}
	}

	/**
	* Main router containing page switching logic, and page creation
	*
	* @class Router
	* @public
	* @static
	*/
	var Router = Backbone.Router.extend({

		// ==============================================================
		//					Routing
		// ==============================================================

		routes: {
			menu: "navToMenu",
			editor: "navToEditor",
			simulator: "navToSimulator",
			viewer: "navToViewer",
			unsupported: "navToUnSupported",
			compeditor: "navToCompEditor",
			projectmenu: "navToProjectMenu"
		},

		// ==============================================================
		//					Project
		// ==============================================================

		_project: null,
		loadProject: function (pid, cb, cancel) {
			var This = this;
			require(["util/Ajax", "view/LoaderModal", "i18n!nls/editor"], function (Ajax, Loader, Strings) {
				var options = {},
					loader = null;

				loader = new Loader({
					el: $("<div>", {addClass: "wh100"}).appendTo($("#content")),
					complete: function () {
						cb.apply(this, arguments);
					},
					cancel: function () {
						cancel && cancel();
					},
					execute: function (progress, complete) {
						Ajax.Project(pid, function (proj) {
							if( proj !== null ) {
								var st = proj.get("Status");
								st.push("Loaded");
								proj.set("Status", st);
								This._project = proj;
								This.trigger("load", proj);
							}
							complete.apply(This, arguments);
						}, progress);
					},
					Title: Strings.LoadingTitleGeneric,
					Text: Strings.LoadingTextGeneric
				});
			});
			return this;
		},

		unloadProject: function () {
			_project = null;
			this.trigger("unload");
			return this;
		},

		getProject: function () {
			return this._project;
		},

		// ==============================================================
		//					Global Common Methods
		// ==============================================================

		getCollection: function (name) {
			return _collections[name];
		},

		spawnMessageBox: function (type, block, msg, options) {
			require(["view/MessageBox"], function (MessageBox) {
				var mBox = $("<div>", { id: "mbox" });
				$mboxTarget.append(mBox);
				var message = new MessageBox({
					el: mBox,
					Message: msg,
					Type: type,
					options: options,
					block: block
				});
				message.on("close", function () {
					mBox.remove();
				});
			});
		},

		spawnDropdown: function (x, y, options) {
			var el = $("#fltDropDown");
			if( el.length ) {
				el.remove();
			}

			el = $("<div><div><button></button><ul></ul></div></div>").attr("id", "fltDropDown").addClass("flt-dd-top").css({left: x+"px", top: y+"px"})
				.find("div").addClass("dropdown").end()
				.find("button").addClass("btn btn-default dropdown-toggle dropdown-flt-btn").attr({ type: "button", "data-toggle": "dropdown" }).end()
				.find("ul").addClass("dropdown-menu").end()
				.appendTo("body");

			var target = el.find("ul");
			for(var key in options) {
				$("<li><a></a></li>").find("a").attr("href", "javascript:;").html(key).on("click", (function (cb) { 
					return function () { el.remove(); cb(); };
				})(options[key])).end().appendTo(target);
			}

			setTimeout( function () {
				el.find("button").trigger("click");
				el.find(".dropdown-backdrop").one("click.ddflt", function () { el.remove(); });
			}, 10);
		},

		spawnPopover: function (x, y, dir, msg, title) {
			var el = $("<div>", {
				id: "appPopover",
				addClass: "app-popover",
				css: {
					left: x+"px",
					top: y+"px"
				}
			});

			setTimeout( function () {
				el.appendTo("body").popover({
					container: "body",
					delay: 10,
					content: msg,
					title: title,
					animation: true,
					placement: "auto "+dir
				}).popover("show");

				$('body').one("click.popover", function () {
					el.popover("destroy");
				});
			}, 1);
		},

		resize: function () {
			_current && _current.trigger("resize");
		},

		// ==============================================================
		//					Switching Logic
		// ==============================================================

		createCollection: function (route, collection, args) {
			if( _collections[ route ] !== undefined ) {
				return _collections[ route ];
			}

			var element = $("<div>", { 
				id: route + "-collection",
				addClass: "collection"
			}).appendTo($content);
			element.hide();

			var initArgs = undefined;
			if( arguments.length > 2 ) {
				initArgs = Array.prototype.slice.call(arguments);
				initArgs.splice(0,2);
				initArgs = Util.arrToObjList(initArgs);
			}

			_collections[ route ] = new collection(initArgs);
			_collections[ route ].render(element);

			return _collections[ route ];
		},

		switchPage: function (collection) {
			var This = this;

			var onAnimIn = function () {
				// ...
			};

			var onAnimOut = function () {
				_current && _current.$el.hide();
				_current && _current.navDispose && This.disposeCollection(collection);
				_current = collection;
				_current.$el.show();
				_current.trigger("resize");
				_current.animateIn( onAnimIn );
			};

			_current ? _current.animateOut( onAnimOut ) : onAnimOut();
		},

		disposeCollection: function (collection) {
			var obj = typeof collection === "[object Object]" ? collection : _collections[ collection ];
			if ( obj ) {
				obj.trigger("dispose");
				obj.dispose();
				_removeCollection(collection);
			}
		},

		// ==============================================================
		//					Navigation
		// ==============================================================

		navTo: function(req, key) {
			var This = this,
				args = arguments;
			require([req], function (Collection) {
				var switchArgs = [key, Collection];
				if( args.length > 2 ) {
					var adds = Array.prototype.slice.call(args);
					adds.splice(0, 2);
					switchArgs = switchArgs.concat(adds);
				}
				This.switchPage(This.createCollection.apply(This, switchArgs));
			});
		},

		navToUnSupported: function () {
			this.navTo("collection/UnSupported", "unsupported");
		},

		navToMenu: function () {
			this.navTo("collection/MainMenu", "menu");
		},

		navToEditor: function () {
			this.navTo("collection/Editor", "editor");
		},

		navToSimulator: function () {
			this.navTo("collection/Simulator", "simulator");
		},

		navToViewer: function () {
			this.navTo("collection/Viewer", "viewer");
		},

		navToCompEditor: function () {
			this.navTo("collection/CompEditor", "compeditor");
		},

		navToProjectMenu: function () {
			this.navTo("collection/ProjectMenu", "projectmenu");
		}
	});

	return new Router();
})