define(["model/ModelBase", "model/TagModel", "view/TagsPropertiesView", "i18n!nls/editor", "i18n!nls/msg"], 
	function(ModelBase, TagModel, TagsPropertiesView, Strings, MsgStrings) {
	"use strict";

	return ModelBase.extend({
		defaults: function () {
			return {
				ComponentName: Strings.TagsTab,
				TagList: []
			};
		},

		validate: function(attributes) {
			var output = undefined;

			for( var i = 0; i < attributes.TagList.length; i++ ) {
				if( attributes.TagList[i].isValid() === false ) {
					output = output || this.emptyError();
					output.errors = output.errors.concat( attributes.TagList[i].validationError.errors );
					output.warnings = output.warnings.concat( attributes.TagList[i].validationError.warnings );
				}
			}

			var stop = false;
			for( var k1 = 0; k1 < attributes.TagList.length; k1++ ) {
				if( stop === true ) {
					break;
				}
				for( var k2 = 0; k2 < attributes.TagList.length; k2++ ) {
					if( k1 !== k2 ) {
						if( attributes.TagList[k1].get("Key") === attributes.TagList[k2].get("Key") ) {
							output = output || this.emptyError();
							output.errors.push(MsgStrings.TagKeyDuplicate);
							stop = true;
							break;
						}
					}
				}
			}

			return output;
		},

		getSerializable: function () {
			var output = { Name: this.attributes.ComponentName, TagList: [] };

			for( var i = 0; i < this.attributes.TagList.length; i++ ) {
				output.TagList.push( this.attributes.TagList[i].getSerializable() );
			}

			return output;
		},

		removeTag: function (tagModel) {
			var tags = this.get("TagList");
			tags.remove( function (obj) {
				return obj.cid === tagModel.cid;
			});
			this.set("TagList", tags, {validate: true});

			tagModel.get("View").remove();
			tagModel.unset("View");
			tagModel.trigger("dispose");
			this.isValid();
		},

		createPropertyView: function($el, item) {
			return new TagsPropertiesView({
				el: $el,
				model: this,
				Item: item
			});
		}
	});
});