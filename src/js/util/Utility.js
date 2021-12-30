/**
* Utility.js
* (c) 2015 All Rights Reserved.
* @author Daniel Cuccia
*/

define([], function()
{
	"use strict";

	if( typeof Math.clamp !== "function" ) {
		Math.clamp = function (val, min, max) {
			return val < min ? min : val > max ? max : val;
		};
	}

	if( typeof Math.distance !== "function" ) {
		Math.distance = function (a, b) {
			return Math.sqrt(((b.x-a.x)*(b.x-a.x))+((b.y-a.y)*(b.y-a.y)));
		};
	}

	if( typeof Math.toRad !== "function" ) {
		Math.toRad = function (d) {
			return (Math.PI / 180) * d;
		};
	}
	
	if( typeof Math.toDeg !== "function" ) {
		Math.toDeg = function (r) {
			return (180 / Math.PI) * r;
		};
	}

	if( typeof Math.randomAlpha !== "function" ) {
		Math.randomAlpha = function () {
			var s = "";
			while(s.length<16&&16>0){
				var r = Math.random();
				s+= (r<0.1?Math.floor(r*100):String.fromCharCode(Math.floor(r*26) + (r>0.5?97:65)));
			}
			return s;
		};
	}

	Object.defineProperty( Date.prototype, "getDateString", {
		configurable: false, enumerable: false,
		value: function () {
			return [
				this.getMonth() +1, "/",
				this.getDate(), "/",
				this.getFullYear(), " ",
				this.getHours(), ":",
				this.getMinutes()
			].join("");
		}
	})
	
	/** Determine if the argued value is within the array */
	Object.defineProperty( Array.prototype, "contains", {
		configurable: false, writable: false, enumerable: false,
		value: function (val) {
			var l = this.length;
			for( var i = 0; i < l; i++ ) {
				if( this[i] === val ) {
					return true;
				}
			}
			return false;
		}
	});
	
	/** cool remove functionality. */
	Object.defineProperty( Array.prototype, "remove", {
		configurable: false, writable: false, enumerable: false,
		value: function (validator, callMethod) {
			var proc = function( obj ) {
				if( typeof callMethod === "string" && typeof obj[callMethod] === "function" )
					obj[ callMethod ]( );
				else if( typeof callMethod === "function" )
					callMethod( obj );
			};

			var count = this.length;
			for( var i = 0; i < count; i++ ) {
				if( typeof validator === "function" ) {
					if( validator( this[i] ) === true ) {
						proc( this[ i ] );
						this.splice(i, 1);
						count = this.length;
						i--;
					}
				} else {
					if( this[i] === validator ) {
						proc( this[ i ] );
						this.splice(i, 1);
						return;
					}
				}
			}
		}
	});

	Object.defineProperty( Array.prototype, "where", {
		enumerable: false, configurable: false,
		value: function( cb, single ) {
			var output = [];
			var count = this.length;
			for(var i=0; i<count; i++){
				if(cb(this[i])===true){
					if(single===true)return this[i];
					else output.push(this[i]);
				}
			}
			return output.length ? output : null;
		}
	});

	Object.defineProperty( Array.prototype, "each", {
		enumerable: false, configurable: false,
		value: function( cb ) {
			var c = this.length;
			for(var i=0; i<c; i++){
				cb(this[i]);
			}
		}
	});
	
	return {
		
		IsBrowserSupported: function () {
			if( !!$("html").is(".ie6, .ie7, .ie8") ) return false;
			if( !!!new Blob ) return false;
			if( navigator.userAgent.indexOf("Safari") !== -1 && navigator.userAgent.indexOf("Chrome") === -1 ) return false;
			return true;
		},

		IsNullOrEmpty: function (obj) {
			var output = (obj === null || obj === undefined);
			if( typeof obj === "string" ) {
				output = obj === "" || !obj;
			} else if ( Object.prototype.toString.call(obj) === "[object Object]" ) {
				output = obj === undefined || obj === null;
				if(!output) {
					for( var k in obj ) {
						output = false;
						break;
					}
				}
			} else if ( Object.prototype.toString.call(obj) === "[object Array]" ) {
				output = obj.length === 0;
			}
			return output;
		},

		parseQuery: function (query) {
			var output = {};
			if ( typeof query === "string" ) {
				var parts = query.split("&");
				if( parts ) {
					for( var i = 0; i < parts.length; i++ ) {
						var pieces = parts[i].split("=");
						output[decodeURIComponent(pieces[0])] = decodeURIComponent(pieces[1]);
					}
				}
			}
			return output;
		},

		argsToArray: function () {
			var temp = [];
			for(var i = 0; i < arguments.length; i++) {
				temp.push(arguments[i]);
			}
			return temp;
		},

		arrToObjList: function (ar) {
			var output = [];
			for( var i = 0; i < ar.length; i++ ) {
				output.push({Value: ar[i]});
			}
			return output;
		},

		IconAccordion: function ($el, event) {
			var el = $(event.currentTarget),
				target = el.attr("collapse");
			if( target ) {
				$el.find(target).slideToggle(334);
				var icon = el.parent().find("i");
				icon.toggleClass("fa-chevron-circle-up");
				icon.toggleClass("fa-chevron-circle-down");
			}
		}
	}
});