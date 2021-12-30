/**
* Ajax.js
* (c) 2015 All Rights Reserved.
* @author Daniel Cuccia
*/

define(["require", "jquery"], function (require, $) {
	"use strict";

	// TEMP!!!
	function _createDevProjectList(cb) {
		require(["model/ProjectModel"], function (ProjectModel) {
			cb([new ProjectModel({
					ProjectName: "Test Proj 1"
				}),
				new ProjectModel({
					ProjectName: "Test Proj 2"
				}),
				new ProjectModel({
					ProjectName: "Test Proj 3",
					Status: ["Live"]
				})
			]);
		});
	}

	// TEMP!!!
	function _createDevProject(pid, cb, p) {
		require(["model/ProjectModel"], function (ProjectModel) {
			var count = 0;
			var handle = setInterval(function () {
				count += 0.1;
				if (count > 1) {
					clearInterval(handle);
					cb(new ProjectModel({
						ProjectID: pid,
						ProjectName: "Dev Project"
					}));
				} else {
					p(count*100);
				}
			}, 250);
		});
	}

	return {
		ProjectOverviewList: function (cb) {
			// ajax - get project overview list
			// argue list to callback

			_createDevProjectList(cb);
		},

		Project: function (pid, complete, progress) {
			// ajax - get full project data
			// argue project model to callback
			// return abort function

			_createDevProject(pid, complete, progress);
		}
	};
});