/**
* MessageBox.js
* (c) 2015 All Rights Reserved.
* @author Daniel Cuccia
*/

define(["view/ViewBase"], 
	function (ViewBase) {
	"use strict";

	return ViewBase.extend({
		initialize: function (params) {
			this.template(this.$el, "messagebox-template", params);
			switch(params.Type) {
				case "Error": this.initError(params); break;
				case "Question": this.initQuestion(params); break;
				case "Options": this.initOptions(params); break;
				case "TextQuestion": this.initTextQuestion(params); break;
				default: break;
			}
			ViewBase.prototype.initialize.apply(this, arguments);
		},

		initQuestion: function(params) {
			var This = this;
			var btnParent = this.$el.find(".panel-content");
			for( var key in params.options ) {
				var btn = $("<button>", {
					text: key,
					addClass: "btn btn-lg btn-mbox"
				});
				btnParent.append(btn);
				btn.on("click", (function(cb) {
					return function () { 
						This.trigger("close"); 
						cb();
					};
				})(params.options[key]));
			}
			if( params.block === false ) {
				this.$el.find(".mbox-blocker").hide();
			}
		},

		initError: function (params) {
			this.initOptions(params);
			
		},

		initOptions: function(params) {

		},

		initTextQuestion: function(params) {

		}
	});
});