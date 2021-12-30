/**
* Dragger.js
* (c) 2015 All Rights Reserved.
* @author Daniel Cuccia
*/

/**
* Implements a single-function call to initialize a clickable and draggable element. Since this
* should only ever be called to activate once, this module will either self-destruct or ignore all
* consectutive commands to begin a new dragger.
*
* @param {Event} event - the initial event which started your "can you drag this for me" request
* @param {Number} threshold - how many pixels away from initial mousedown to consider it dragging
* @param {Function} onClick - if mouseup occured before a drag, this is your new click callback
* @param {Function} onMove - once we've past the threshold, this will call back consecutively with relative {x,y} distance
* @param {Function} onRelease - after drag occured this callback will inform dragger has completed
* @return {Function} a method you can call to force an abort within the process
*
* @method begin
* @public
*/
define(["jquery"], function ($) {
	"use strict";
	var _active = false,
		_dragging = false,
		_start = {x:NaN,y:NaN},
		_dStart = {x:NaN,y:NaN},
		_current = {x:0,y:0},
		_total = {x:NaN,y:NaN},
		_threshold = NaN,
		_returnClick = null,
		_returnMove = null,
		_returnRelease = null,
		_rObj = {x:NaN,y:NaN},
		nullfn = (nullfn || function(){}),
		_eventTarget = $("body"),
		_overlay = $("<div>", {
			css: {
				width: "100%",
				height: "100%",
				position: "absolute",
				top: "0px",
				left: "0px",
				"z-index": "999",
				"background-color": "transparent"
			}
		});
	function _dragTest() {
		return((_current.x>=_start.x+_threshold)||(_current.x<=_start.x-_threshold))
			||((_current.y>=_start.y+_threshold)||(_current.y<=_start.y-_threshold));
	}
	function _onDrag(e) {
		_current.x = e.pageX;
		_current.y = e.pageY;
		if(_dragging || _dragTest() === true){
			if(isNaN(_dStart.x)){
				_dStart.x = _current.x;
				_dStart.y = _current.y;
				_overlay.appendTo("body").show();
				_dragging = true;
			}
			_rObj.x = _dStart.x - _current.x;
			_rObj.y = _dStart.y - _current.y;
			_total.x -= _rObj.x;
			_total.y -= _rObj.y;
			_dStart.x = _current.x;
			_dStart.y = _current.y;
			if( _rObj.x !== 0 || _rObj.y !== 0 ) {
				_returnMove(_rObj);
			}
		}
	}
	function _onMouseUp(e) {
		if(!_dragging){
			_returnClick();
			_abort();
		}else{
			_returnRelease(_total);
			_abort();
		}
	}
	function _abort() {
		_eventTarget.off("mousemove.dragger");
		_eventTarget.off("mouseup.dragger");
		_overlay.hide().remove();
		_start.x=_start.y=_rObj.x=_rObj.y=_dStart.x=_dStart.y=_total.x=_total.y=_threshold=NaN;
		_returnClick=_returnMove=_returnRelease=null;
		_current.x=_current.y=0;
		_active=_dragging=false;
	}
	return {
		begin: function (event, threshold, onClick, onMove, onRelease) {
			var abort;
			if(!_active) {
				_active = true;
				_returnClick = (onClick || nullfn);
				_returnMove = (onMove || nullfn);
				_returnRelease = (onRelease || nullfn);
				_start.x = event.pageX;
				_start.y = event.pageY;
				_total.x = _total.y = 0;
				_threshold = threshold;
				_eventTarget.on("mousemove.dragger", _onDrag);
				_eventTarget.on("mouseup.dragger", _onMouseUp);
				abort = _abort;
			}
			return abort || nullfn;
		}
	};
});