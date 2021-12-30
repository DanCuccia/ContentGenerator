/**
* Grid.js
* (c) 2015 All Rights Reserved.
* @author Daniel Cuccia
*/

define(["jquery"], function ($) {
	"use strict";

	var Grid = function ($target, size, color) {
		this.$el = $target;
		this._size = size;
		this._color = color;
		this._xLines = [];
		this._yLines = [];
		this._count;
		this._xThres = { min: 0, max: 0, jump: 0 };
		this._yThres = { min: 0, max: 0, jump: 0 };
	};

	Grid.prototype.init = function () {
		this.clear();
		var w = this.$el.width(),
			h = this.$el.height(),
			count = (w > h) ? (w / this._size) : (h / this._size),
			sLeft = (w * 0.5) - (count * 0.5 * this._size),
			sTop = (h * 0.5) - (count * 0.5 * this._size);

		this._xThres.min = sTop;
		this._xThres.max = sTop + (count * this._size);
		this._xThres.jump = (count * this._size) + (this._size * 0.5);
		this._yThres.min = sLeft;
		this._yThres.max = sLeft + (count * this._size);
		this._yThres.jump = (count * this._size) + (this._size * 0.5);

		for(var i = 0; i < count; i++) {
			var xlp = (sTop + (this._size * i)),
				ylp = (sLeft + (this._size * i));
			this._xLines.push({
				el: $("<div>", {
					addClass: "grid-line grid-line-x",
					css: {
						left: "0px",
						top: xlp+"px"
					}
				}).appendTo(this.$el),
				pos: xlp });

			this._yLines.push({
				el: $("<div>", {
					addClass: "grid-line grid-line-y",
					css: {
						top: "0px",
						left: ylp+"px"
					}
				}).appendTo(this.$el),
				pos: ylp});
		}
	};

	Grid.prototype.clear = function () {
		if( this._xLines.length ) {
			this._xLines.each( function (i) {
				i.el.remove();
			})
			this._xLines.length = 0;
		}
		if( this._yLines.length ) {
			this._yLines.each( function (i) {
				i.el.remove();
			});
			this._yLines.length = 0;
		}
	};

	Grid.prototype.reInit = function (size, color) {
		this.clear();
		this._color = color;
		this._size = size;
		this.init();
	};

	Grid.prototype.resize = function () {
		this.clear();
		this.init();
	};

	Grid.prototype.setZoom = function (zoom) {
		var This = this;
		if( zoom < 1 ) {
			this.$el.hide();
		} else {
			this.$el.show().css("-webkit-transform", "scale("+zoom+")");
		}
	};

	Grid.prototype.drag = function(mvt) {
		var This = this;

		if(mvt.y !== 0) {
			this._xLines.each(function(i){
				i.pos-=mvt.y;
				if(i.pos<This._xThres.min) {
					i.pos+=This._xThres.jump;
				} else if(i.pos>This._xThres.max) {
					i.pos-=This._xThres.jump;
				}
				i.el[0].style.top=i.pos+"px";
			});
		}

		if(mvt.x !== 0) {
			this._yLines.each(function(i){
				i.pos -= mvt.x;
				if(i.pos<This._yThres.min) {
					i.pos+=This._yThres.jump;
				} else if(i.pos>This._yThres.max) {
					i.pos-=This._yThres.jump;
				}
				i.el[0].style.left=i.pos+"px";
			});
		}
	};

	return {
		create: function ($target, size, color) {
			return new Grid($target, size, color);
		}
	};
})