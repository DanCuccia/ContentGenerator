define(["underscore", "model/ModelBase", "view/RenderablePropertiesView", "util/Utility", "i18n!nls/editor", "i18n!nls/msg"], 
	function (_, ModelBase, View, Util, Strings, MsgStrings) {
	"use strict";

	return ModelBase.extend({
		defaults: function () {
			return {
				Name: "",
				ComponentName: Strings.RenderableTab,
				IconSmall: null,
				IconMedium: null,
				IconLarge: null
			};
		},

		getSerializable: function () {
			return _.clone(this.attributes);
		},

		validate: function (attributes, params) {
			var msg = undefined;

			if( Util.IsNullOrEmpty(attributes.IconSmall) ) {
				msg = this.emptyError();
				msg.warnings.push(MsgStrings.SmallIconUndefined);
			}

			if( Util.IsNullOrEmpty(attributes.IconMedium) ) {
				msg = msg || this.emptyError();
				msg.warnings.push(MsgStrings.MediumIconUndefined);
			}

			if( Util.IsNullOrEmpty(attributes.IconLarge)) {
				msg = msg || this.emptyError();
				msg.warnings.push(MsgStrings.LargeIconUndefined);
			}
			
			return msg;
		},

		createPropertyView: function($el, item) {
			return new View({
				el: $el,
				model: this,
				Item: item
			});
		}
	});
});