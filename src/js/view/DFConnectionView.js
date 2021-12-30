/**
* DFConnectionView.js
* (c) 2015 All Rights Reserved.
* @author Daniel Cuccia
*/

define(["view/ViewBase", "util/Utility"], function(ViewBase, Util) {
	"use strict";

	return ViewBase.extend({

		initialize: function (params) {
			this.subject = params.subject;
			this.target = params.target;

			$("<div>").appendTo(this.$el);

			var This = this;
			this.model.get("Subject").get("Item").get("DFItem").on("Position", function () { 
				This._onPosition(); 
			});
			this.model.get("Target").get("DFItem").on("Position", function () { 
				This._onPosition(); 
			});
			this.model.on("change:Condition", function () {
				This._onColor();
			});

			this._onPosition();
			this._onColor();
		},

		_onPosition: function () {
			var cs = this.model.get("Subject").get("Item").get("DFItem").get("Center"),
				ct = this.model.get("Target").get("DFItem").get("Center"),
				width = Math.distance(cs, ct),
				angle = Math.toDeg(Math.atan2(ct.y - cs.y, ct.x - cs.x));
			this.$el.css({
				"-webkit-transform": "rotateZ("+angle+"deg)",
				width: width+"px",
				left: cs.x+"px",
				top: cs.y+"px"
			});
		},

		_onColor: function () {
			var cond = this.model.get("Condition");
			if(cond === "Consumes"){
				this.$el.removeClass("c-line-green").addClass("c-line-red");
			} else {
				this.$el.removeClass("c-line-red").addClass("c-line-green");
			}
		}
	});
});