/**
* ConnectionModel.js
* (c) 2015 All Rights Reserved.
* @author Daniel Cuccia
*/


define(["model/ModelBase", "util/Utility", "i18n!nls/editor", "i18n!nls/msg"], function (ModelBase, Utility, Strings, MsgStrings) {
	"use strict";

	/**
	* Data container of a ItemModel's connection to another
	*
	* @class ConnectionModel
	* @extends ModelBase
	* @constructor
	* @public
	*/
	return ModelBase.extend({
		
		/**
		* retrieve a new data object set to defaults, which will be mixed into the constructor arguments
		*
		* @method defaults
		* @public
		*/
		defaults: function () {
			return {
				Subject: null,
				Condition: Strings.ConnectUndefined,
				Quantity: 1,
				Target: null,

				SubjectName: "",
				TargetName: ""
			};
		},

		/**
		* generate 'this' into a serializable JSON object
		*
		* @param {Boolean} saveInternal - when true will serialize more values for internal usage
		* @return {Object} JSON object used for serialization
		*
		* @method toJSON
		* @public
		*/
		toJSON: function (saveInternal) {
			var output = {
				Condition: this.attributes.Condition,
				Quantity: this.attributes.Quantity,
				Target: { ID: undefined, Name: undefined }
			};

			if( this.attributes.Target ) {
				output.Target.ID = this.attributes.Target.getGeneral().get("ID");
				output.Target.Name = this.attributes.Target.getGeneral().get("Name");
			}

			return output;
		},

		/**
		* initialize this model with possible internal observers and dynamic properties
		*
		* @pmethod initialize
		* @public
		*/
		initialize: function () {
			var This = this;

			if( this.attributes.Subject ) {
				this.attributes.SubjectName = this.attributes.Subject.get("Name");
				this.attributes.Subject.on("change:Name", function(m,v,p) {
					This.set("SubjectName", v, {validate: false});
				});
			}

			if( this.attributes.Target ) {
				this.attributes.TargetName = this.attributes.Target.get("Name");
			}
			this.on("change:Target", function(m,target,p) {
				This.set("TargetName", target.getGeneral().get("Name"), {validate: false});
				target.on("change:Name", function(m,name,p) {
					This.set("TargetName", name, {validate: false});
				});
			});
		},

		/**
		* ensure this model has valid properties
		*
		* @param {Object} attributes - a temporary set of attributes to test
		* @return {Object} {warnings: [], errors: []}
		*
		* @method validate
		* @public
		*/
		validate: function (attributes, param) {
			var msg;
			
			if( attributes.Condition === Strings.ConnectUndefined || Utility.IsNullOrEmpty(attributes.Condition)) {
				msg = msg || this.emptyError();
				msg.errors.push(MsgStrings.ConnectConditionUndefined);
			}
			if( attributes.Quantity <= 0 ) {
				msg = msg || this.emptyError();
				msg.warnings.push(MsgStrings.ConnectZeroQuantity);
			}
			if( attributes.Quantity > 999 ) {
				msg = msg || this.emptyError();
				msg.errors.push(MsgStrings.ConnectMaxQuantity);
			}
			if( attributes.Target === null ) {
				msg = msg || this.emptyError();
				msg.errors.push(MsgStrings.ConnectTargetUndefined);
			}

			return msg;
		}
	});
});