/**
* ComponentBaseView.js
* (c) 2015 All Rights Reserved.
* @author Daniel Cuccia
*/

define(["view/ViewBase"], function (ViewBase) {
	"use strict"

	/**
	* Inherited API all component-views will use.
	*
	* @class ComponentBaseView
	* @public
	*/
	return ViewBase.extend({ 
		initialize: function (params) {
			this.item = params.Item;
			this.$errorEl = this.$el.find(".component-error");
			this.$warningEl = this.$el.find(".component-warning");
			var This = this;
			this.model.on("invalid", function () { This.onInvalid.apply(This, arguments); });
			this.model.on("change", function () { This.onValueChange.apply(This, arguments); });
		},

		_addModelMessages: function($el, msgList) {
			for( var i = 0; i < msgList.length; i++ ) {
				$el.append($("<li>", { text: msgList[i] }));
			}
		},

		clearErrors: function () {
			if( this.$errorEl.children().length ) {
				this.$errorEl.children().remove();
				this.$errorEl.parent().hide();
			}
		},

		clearWarnings: function () {
			if( this.$warningEl.children().length ) {
				this.$warningEl.children().remove();
				this.$warningEl.parent().hide();
			}
		},

		onValueChange: function() {
			this.clearErrors();
			this.clearWarnings();
			this.item.trigger("ntupdate");
		},

		updateErrors: function(msgList) {
			if( this.$errorEl.children().length ) {
				this.$errorEl.children().remove();
			}
			this._addModelMessages(this.$errorEl.append("<ul>").find("ul"), msgList);
			this.$errorEl.parent().show();
		},

		updateWarnings: function(msgList) {
			if( this.$warningEl.children().length ) {
				this.$warningEl.children().remove();
			}
			this._addModelMessages(this.$warningEl.append($("<ul>")).find("ul"), msgList);
			this.$warningEl.parent().show();
		},

		onInvalid: function(model, msg, params) {
			if( msg.errors && msg.errors.length ) {
				this.updateErrors(msg.errors);
			} else {
				this.clearErrors();
			}
			if( msg.warnings && msg.warnings.length ) {
				this.updateWarnings(msg.warnings);
			} else {
				this.clearWarnings();
			}
			this.item.trigger("ntupdate");
		}
	});
});