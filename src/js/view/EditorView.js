/**
* EditorView.js
* (c) 2015 All Rights Reserved.
* @author Daniel Cuccia
*/

define(["require", "view/ViewBase", "view/DFItemView", "util/Dragger", "util/Grid", "util/Utility", "i18n!nls/editor"], 
	function(require, ViewBase, DFItemView, Dragger, Grid, Utility, Strings) {
		"use strict";

		return ViewBase.extend({
			events: { 
				"mousedown #df-drag-interface": "_onDisplayfieldDown",
				"mousedown .df-item-panel": "_onItemDown"
			},

			initialize: function (params) {
				this.editor = params.collection;
				this._abortDrag = null;

				this.template(this.$el, "editor-page-template", params, Strings);
				this.grid = Grid.create(this.$el.find("#editor-grid"), 50, "black");

				var This = this;
				this.editor.on("resize", function () { This.onResize(); });
				this.$el.on("mousewheel", function (e) { This.onZoom(e); });
				
				ViewBase.prototype.initialize.apply(this, arguments);
			},

			reset: function () {
				if( this.$el.find(".df-item-container").children().length ) {
					this.$el.find(".df-item-container").children().remove();
				}
				if( this.$el.find(".df-connect-container").children().length ) {
					this.$el.find(".df-connect-container").children().remove();
				}

				this._abortDrag && this._abortDrag();
				this._abortDrag = null;

				this._selectCallback && this._selectCallback();
				this._selectCallback = null;

				this._current = null;

				this.grid.init();
				this.grid.setZoom(1);
				this.model.set("Zoom", 1, {validate: false, silent: true});
				this.$el.find(".df-zoom-container").css("-webkit-transform", "scale(1)");
			},

			_positionZoomContainers: function(width, height) {
				this.$el.find(".df-zoom-shift").css({
					left: (width * 0.5)+"px", top: (height * 0.5)+"px"
				});
				this.$el.find(".df-zoom-container").css({
					left: (-width * 0.5)+"px", top: (-height * 0.5)+"px"
				});
			},

			// ---------- MOVEMENT -----------------------

			_onDisplayfieldDown: function (e) {
				var This = this;
				this._abortDrag = Dragger.begin(e, 10, 
					function() {
						if( This._selectCallback === null ) {
							This.editor.unSelectCurrent(); 
							This._abortDrag = null; 
						}
					},
					function(m) { This._onMoveDisplayField(m); },
					function(m) { This._onMovementComplete(m); This._abortDrag = null; });
				return false;
			},

			_onMoveDisplayField: function(mvt) {
				mvt = this.model.getZoomMod(mvt);
				var x = "-="+mvt.x+"px",
					y = "-="+mvt.y+"px";
				this.$el.find(".df-move").css({ left: x, top: y });
				this.grid.drag(mvt);
			},

			_onMovementComplete: function(mvtTotal) {
				this.model.set({
					Left: this.model.get("Left") + mvtTotal.x,
					Top: this.model.get("Top") + mvtTotal.y
				}, {validate: false});
			},

			onResize: function() {
				var width = this.$el.find("#df-front").width();
				var height = this.$el.find("#df-front").height();

				this.model.set({
					Left: -width * 0.5,
					Top: -height * 0.5,
					Width: width,
					Height: height
				}, {validate: false});

				this._positionZoomContainers(width, height);
				this.grid.init();
			},

			onZoom: function (e) {
				var step = e.originalEvent.deltaY < 0 ? this.model.get("ZoomStep") : -this.model.get("ZoomStep");
				this.model.set("Zoom", Math.clamp(this.model.get("Zoom") + step, this.model.get("MinZoom"), this.model.get("MaxZoom")), {validate: false, silent: true});
				var z = this.model.get("Zoom")
				this.$el.find(".df-zoom-container").css("-webkit-transform", "scale("+z+")");
				this.grid.setZoom(z);
			},

			moveTo: function(x,y) {
				var This = this,
					gridLast = {left: null, top: null},
					gridMove = {left: 0, top: 0};

				this.$el.find(".df-move").animate({ left: x, top: y }, {
					duration: 667,
					easing: "swing",
					complete: function () {
						This.model.set({ Left: x, Top: y }, {validate: false, silent: true});
					},
					step: function(now, tween) {
						gridLast[tween.prop] = gridLast[tween.prop] || now;
						gridMove[tween.prop] = gridLast[tween.prop] - now;
						if( gridMove.left && gridMove.top ) {
							This.grid.drag({x: gridMove.left, y: gridMove.top });
						}
						gridLast[tween.prop] = now;
					}
				});
			},

			// ------------- ADDING/REMOVING --------------------

			addDisplayfieldItem: function (item) {
				item.set("DFView", new DFItemView({
					el: $("<div>", {
						cid: item.cid,
						addClass: "df-item-top"
					}).appendTo(this.$el.find(".df-item-container")),
					model: item,
					editor: this.editor
				}));
				item.get("DFItem").setPosition(-this.model.get("Left") - 64, -this.model.get("Top") - 64);
			},

			removeDisplayfieldItem: function (item) {

			},

			// ------------------ PICKING ----------------------

			createOutline: function(color) {
				color = color || "#AAFAC0";
				this.$el.find("#editor-displayfield").prepend($("<div>", {
					id: "df-outline",
					css: { 
						"border-color": color,
						left: this.model.get("Width") * 0.02 * 0.5,
						top: this.model.get("Height") * 0.02 * 0.5
					}
				}));
			},

			removeOutline: function () {
				this.$el.find("#df-outline").remove();
			},

			_selectCallback: null,
			_onItemDown: function (e) {
				var This = this,
					target = this.editor.getByCID($(e.currentTarget).parent().attr("cid"));
				this._abortDrag = Dragger.begin(e, 10,
					function () {
						if( This._selectCallback ) {
							$("body").off("keydown.quitDFSelect");
							This._selectCallback(target);
							This._selectCallback = null;
							This.removeOutline();
						} else {
							This.editor.selectItem(target);
						}
						This._abortDrag = null;
					},
					function (m) {
						target.get("DFItem").addPosition(m, This.model.get("Zoom"));
					},
					function () {
						This._abortDrag = null;
					});
				return false;
			},

			startDFSelection: function( onSelect, onQuit, outlineColor ) {
				if( this._selectCallback === null ) {
					this.createOutline(outlineColor);
					this._selectCallback = onSelect || nullfn;
					var This = this;
					$("body").on("keydown.quitDFSelect", function (e) {
						if( e.keyCode === 27 ) { // escape
							$(this).off("keydown.quitDFSelect");
							onQuit && onQuit();
							This._selectCallback = null;
							This.removeOutline();
						}
					});
					return function abort() {
						$("body").off("keydown.quitDFSelect");
						This._selectCallback = null;
						This.removeOutline();
					};
				}
			},

			_current: null,
			selectDFItem: function(item) {
				if( this._current !== null ) {
					this._current.get("DFView").$el.find(".panel").removeClass("selected");
				}
				this._current = item;
				if( this._current !== null ) {
					this._current.get("DFView").$el.find(".panel").addClass("selected");
				}
			},

			showRelationship: function (cid, toggle) {
				if( toggle === 0 ) {
					this.$el.find(".df-rel-hidden").removeClass("df-rel-hidden");
				} if( toggle === 1 ) {
					this.$el.find(".df-item-top").addClass("df-rel-hidden");
					this._relParents(cid);
				} else if( toggle === -1 ) {
					this.$el.find(".df-item-top").addClass("df-rel-hidden");
					this._relChildren(cid);
				}
			},

			_relChildren: function (cid) {
				var next = [this.editor.getByCID(cid)];
				next[0].get("DFView").$el.removeClass("df-rel-hidden");

				do {
					var tNext = next.slice(0);
					next.length = 0;
					for (var ni = 0; ni < tNext.length; ni ++) {
						var conns = tNext[ni].getGeneral().get("Connections");
						for(var ci = 0; ci < conns.length; ci++ ) {
							conns[ci].get("Target").get("DFView").$el.removeClass("df-rel-hidden");
							next.push(conns[ci].get("Target"));
						}
					}
				} while (next.length > 0)
			},

			_relParents: function (cid) {
				var all = this.editor.getAllConnections(),
					next = [cid];

				this.editor.getByCID(cid).get("DFView").$el.removeClass("df-rel-hidden");

				do {
					var tNext = next.slice(0);
					next.length = 0;
					for( var ni = 0; ni < tNext.length; ni++ ) {
						for( var ci = 0; ci < all.length; ci++ ) {
							if( all[ci].get("Target").cid === tNext[ni]) {
								all[ci].get("Subject").get("Item").get("DFView").$el.removeClass("df-rel-hidden");
								next.push(all[ci].get("Subject").get("Item").cid);
							}
						}
					}
				} while (next.length > 0)
			}
		});
});