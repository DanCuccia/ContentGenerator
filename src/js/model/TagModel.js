define(["model/ModelBase", "util/Utility", "i18n!nls/msg"], 
	function (ModelBase, Util, MsgStrings) {
	"use strict";

	return ModelBase.extend({
		defaults: function () {
			return {
				Key: "",
				Value: ""
			};
		},

		validate: function (attributes) {
			var output = undefined;

			if( Util.IsNullOrEmpty(attributes.Key) === true ) {
				output = output || this.emptyError();
				output.errors.push(MsgStrings.TagKeyUndefined);
			}

			if( Util.IsNullOrEmpty(attributes.value) === true ) {
				output = output || this.emptyError();
				output.errors.push(MsgStrings.TagValueUndefined);
			}

			return output;
		},

		getSerializable: function () {
			return {
				Key: this.attributes.Key,
				Value: this.attributes.Value
			};
		}
	});
});