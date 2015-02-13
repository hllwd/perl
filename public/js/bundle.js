/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(9);
	
	var React = __webpack_require__(1);
	var $ = __webpack_require__(2);
	var Canvas = __webpack_require__(3);
	var Rect = __webpack_require__(4);
	var Polygon = __webpack_require__(5);
	var ImageComp = __webpack_require__(8);
	
	var imageSrc = __webpack_require__(6);
	var image = new Image();
	image.src = imageSrc;
	
	var Genetic = React.createClass({displayName: "Genetic",
	    getInitialState: function(){
	        return {
	            step: 0
	        };
	    },
	    componentDidMount: function(){
	        this.incrementStep();
	    },
	    incrementStep: function(){
	        window.requestAnimationFrame(function(){
	            this.setState({
	                step: this.state.step+1
	            });
	            this.incrementStep();
	        }.bind(this))
	    },
	    render: function () {
	        return (
	            React.createElement(Canvas, {identifier: "canvas-gen", step: this.state.step, width: 648, height: 801}, 
	                React.createElement(Polygon, {points: [[10,10], [40, 40], [30, 80]], fillStyle: '#00F'}), 
	                React.createElement(Rect, {x: this.state.step%50, y: 30, rotate: .3, h: 40, fillStyle: '#0F0'}), 
	                React.createElement(Rect, {x: 10, y: this.state.step%50})
	            )
	        )
	    }
	});
	
	var Original = React.createClass({displayName: "Original",
	    getInitialState: function(){
	        return {step: 0};
	    },
	    componentDidMount: function(){
	        this.setState({step: 1});
	    },
	    render: function () {
	        return (
	            React.createElement(Canvas, {identifier: "canvas-img", step: this.state.step, width: 648, height: 801}, 
	                React.createElement(ImageComp, {image: image})
	            )
	        )
	    }
	});
	
	$(function () {
	    React.render(
	        React.createElement(Genetic, null),
	        $('#gen-container').get(0)
	    );
	
	    React.render(
	        React.createElement(Original, null),
	        $('#img-container').get(0)
	    )
	})

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = React;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = jQuery;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(1);
	var $ = __webpack_require__(2);
	
	var Canvas = React.createClass({displayName: "Canvas",
	    _canvas: false,
	    _context: false,
	    componentDidMount: function () {
	        var canvas = $('#' + this.props.identifier).get(0);
	        this._canvas = canvas;
	        this._context = canvas.getContext('2d');
	    },
	    componentWillUpdate: function(){
	        this._context && this._context.clearRect(0,0, this._canvas.width, this._canvas.height);
	    },
	    renderChildren: function(){
	        return React.Children.map(this.props.children, function (child) {
	            return React.addons.cloneWithProps(child, {
	                context: this._context
	            });
	            return child;
	        }.bind(this));
	    },
	    render: function () {
	        var children = this.renderChildren();
	        return (
	            React.createElement("canvas", {id: this.props.identifier, width: this.props.width, height: this.props.height}, 
	                children
	            )
	        );
	    }
	});
	
	module.exports = Canvas;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(1);
	var mixinComponent = __webpack_require__(7);
	
	var Rect = React.createClass({displayName: "Rect",
	    mixins: [ mixinComponent],
	    getDefaultProps: function(){
	        return {
	            x: 0,
	            y: 0,
	            w: 10,
	            h: 10,
	            fillStyle: 'rgb(200,0,0)',
	            rotate: 0
	        }
	    },
	
	    render: function(){
	        if(!this.props.context) return false;
	        var ctx = this.props.context;
	
	        ctx.fillStyle = this.props.fillStyle;
	
	        ctx.save();
	
	        ctx.translate(
	            this.props.x,
	            this.props.y
	        );
	        ctx.rotate(this.props.rotate);
	
	        ctx.fillRect (
	            -this.props.w/2,
	            -this.props.h/2,
	            this.props.w/2,
	            this.props.h/2);
	        
	        ctx.restore();
	
	        return false;
	    }
	});
	
	module.exports = Rect;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(1);
	var mixinComponent = __webpack_require__(7);
	
	var Polygon = React.createClass({displayName: "Polygon",
	    mixins: [mixinComponent],
	    getDefaultProps: function(){
	        return {
	            points: [],
	            fillStyle: 'rgb(200,0,0)'
	        }
	    },
	    render: function(){
	        if(!this.props.context) return false;
	        var ctx = this.props.context;
	
	        ctx.fillStyle = this.props.fillStyle;
	        ctx.beginPath();
	        this.props.points.forEach(function(p, i){
	            if(i === 0){
	                ctx.moveTo(p[0], p[1]);
	            }else {
	                ctx.lineTo(p[0], p[1]);
	            }
	        }, this);
	        ctx.closePath();
	        ctx.fill();
	
	        return false;
	    }
	});
	
	module.exports = Polygon;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "data:image/png;base64,/9j/4AAQSkZJRgABAQIAHAAcAAD/4hrESUNDX1BST0ZJTEUAAQEAABq0YXBwbAIQAABtbnRyUkdCIFhZWiAH3gABAAEACwAFADthY3NwQVBQTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9tYAAQAAAADTLWFwcGwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABFkZXNjAAABUAAAAGJkc2NtAAABtAAAA7hjcHJ0AAAFbAAAACR3dHB0AAAFkAAAABRyWFlaAAAFpAAAABRnWFlaAAAFuAAAABRiWFlaAAAFzAAAABRyVFJDAAAF4AAACAxhYXJnAAAN7AAAACB2Y2d0AAAODAAABhJuZGluAAAUIAAABj5jaGFkAAAaYAAAACxtbW9kAAAajAAAAChiVFJDAAAF4AAACAxnVFJDAAAF4AAACAxhYWJnAAAN7AAAACBhYWdnAAAN7AAAACBkZXNjAAAAAAAAAAhEaXNwbGF5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbWx1YwAAAAAAAAAeAAAADHNrU0sAAAAWAAABeGNhRVMAAAAYAAABjmhlSUwAAAAWAAABpnB0QlIAAAAYAAABvGl0SVQAAAAUAAAB1Gh1SFUAAAAUAAAB6HVrVUEAAAAcAAAB/GtvS1IAAAAMAAACGG5iTk8AAAASAAACJGNzQ1oAAAAWAAACNnpoVFcAAAAMAAACTGRlREUAAAAQAAACWHJvUk8AAAASAAACaHN2U0UAAAAQAAACenpoQ04AAAAMAAACTGphSlAAAAAOAAACimFyAAAAAAAUAAACmGVsR1IAAAAiAAACrHB0UFQAAAAWAAACzm5sTkwAAAAWAAAC5GZyRlIAAAAWAAAC+mVzRVMAAAASAAACaHRoVEgAAAAMAAADEHRyVFIAAAAUAAADHGZpRkkAAAAQAAADMGhySFIAAAAUAAADQHBsUEwAAAASAAADVHJ1UlUAAAAkAAADZmVuVVMAAAASAAADimRhREsAAAAcAAADnABGAGEAcgBlAGIAbgD9ACAATABDAEQATABDAEQAIABlAG4AIABjAG8AbABvAHIgDwBMAEMARAAgBeYF0QXiBdUF4AXZAEwAQwBEACAAQwBvAGwAbwByAGkAZABvAEwAQwBEACAAYwBvAGwAbwByAGkAUwB6AO0AbgBlAHMAIABMAEMARAQaBD4EOwRMBD4EQAQ+BDIEOAQ5ACAATABDAETO7LfsACAATABDAEQARgBhAHIAZwBlAC0ATABDAEQAQgBhAHIAZQB2AG4A/QAgAEwAQwBEX2mCcgAgAEwAQwBEAEYAYQByAGIALQBMAEMARABMAEMARAAgAGMAbwBsAG8AcgBGAOQAcgBnAC0ATABDAEQwqzDpMPwAIABMAEMARCAPAEwAQwBEACAGRQZEBkgGRgYpA4gDswPHA8EDyQO8A7cAIAO/A7gDzAO9A7cAIABMAEMARABMAEMARAAgAGEAIABDAG8AcgBlAHMASwBsAGUAdQByAGUAbgAtAEwAQwBEAEwAQwBEACAAYwBvAHUAbABlAHUAcgBMAEMARAAgDioONQBSAGUAbgBrAGwAaQAgAEwAQwBEAFYA5AByAGkALQBMAEMARABMAEMARAAgAHUAIABiAG8AagBpAEsAbwBsAG8AcgAgAEwAQwBEBCYEMgQ1BEIEPQQ+BDkAIAQWBBoALQQ0BDgEQQQ/BDsENQQ5AEMAbwBsAG8AcgAgAEwAQwBEAEwAQwBEAC0AZgBhAHIAdgBlAHMAawDmAHIAbXRleHQAAAAAQ29weXJpZ2h0IEFwcGxlLCBJbmMuLCAyMDE0AFhZWiAAAAAAAADzUgABAAAAARbPWFlaIAAAAAAAAGXoAAA8EAAACdBYWVogAAAAAAAAapMAAKrFAAAXilhZWiAAAAAAAAAmWwAAGSwAALHSY3VydgAAAAAAAAQAAAAABQAKAA8AFAAZAB4AIwAoAC0AMgA2ADsAQABFAEoATwBUAFkAXgBjAGgAbQByAHcAfACBAIYAiwCQAJUAmgCfAKMAqACtALIAtwC8AMEAxgDLANAA1QDbAOAA5QDrAPAA9gD7AQEBBwENARMBGQEfASUBKwEyATgBPgFFAUwBUgFZAWABZwFuAXUBfAGDAYsBkgGaAaEBqQGxAbkBwQHJAdEB2QHhAekB8gH6AgMCDAIUAh0CJgIvAjgCQQJLAlQCXQJnAnECegKEAo4CmAKiAqwCtgLBAssC1QLgAusC9QMAAwsDFgMhAy0DOANDA08DWgNm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"

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by nmondon on 13/02/2015.
	 */
	
	module.exports = {
	    shouldComponentUpdate: function(nextProps, nextState){
	        return nextProps.context;
	    }
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(1);
	
	var mixinComponent = __webpack_require__(7);
	
	var ImageComp = React.createClass({displayName: "ImageComp",
	    getDefaultProps: function(){
	        return {
	            image: null,
	            x: 0,
	            y: 0,
	            w: 0,
	            h: 0
	        }
	    },
	    mixins: [mixinComponent],
	    render: function () {
	        if(!this.props.context) return false;
	        var ctx = this.props.context;
	
	        ctx.drawImage(this.props.image, this.props.x, this.props.y);
	
	        return false;
	    }
	});
	
	module.exports = ImageComp;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(10);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(11)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/Users/nmondon/PhpstormProjects/madeleineio/perl/node_modules/css-loader/index.js!/Users/nmondon/PhpstormProjects/madeleineio/perl/node_modules/sass-loader/index.js!/Users/nmondon/PhpstormProjects/madeleineio/perl/sass/style.scss", function() {
			var newContent = require("!!/Users/nmondon/PhpstormProjects/madeleineio/perl/node_modules/css-loader/index.js!/Users/nmondon/PhpstormProjects/madeleineio/perl/node_modules/sass-loader/index.js!/Users/nmondon/PhpstormProjects/madeleineio/perl/sass/style.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(12)();
	exports.push([module.id, "html,body{width:100%;height:100%;margin:0}#img-container,#gen-container{display:inline-block;width:648px}", ""]);

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isIE9 = memoize(function() {
			return /msie 9\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isIE9();
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function () {
				styleElement.parentNode.removeChild(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	function replaceText(source, id, replacement) {
		var boundaries = ["/** >>" + id + " **/", "/** " + id + "<< **/"];
		var start = source.lastIndexOf(boundaries[0]);
		var wrappedReplacement = replacement
			? (boundaries[0] + replacement + boundaries[1])
			: "";
		if (source.lastIndexOf(boundaries[0]) >= 0) {
			var end = source.lastIndexOf(boundaries[1]) + boundaries[1].length;
			return source.slice(0, start) + wrappedReplacement + source.slice(end);
		} else {
			return source + wrappedReplacement;
		}
	}
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(styleElement.styleSheet.cssText, index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap && typeof btoa === "function") {
			try {
				css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(JSON.stringify(sourceMap)) + " */";
				css = "@import url(\"data:text/css;base64," + btoa(css) + "\")";
			} catch(e) {}
		}
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function() {
		var list = [];
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
		return list;
	}

/***/ }
/******/ ])
//# sourceMappingURL=bundle.js.map