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
	
	var React = __webpack_require__(1);
	var $ = __webpack_require__(2);
	var Canvas = __webpack_require__(3);
	var Polygon = __webpack_require__(4);
	
	var Genetic = React.createClass({displayName: "Genetic",
	    render: function () {
	        return (
	            React.createElement(Canvas, {identifier: "canvas"}, 
	                React.createElement(Polygon, null)
	            )
	        )
	    }
	});
	
	$(function () {
	    React.render(
	        React.createElement(Genetic, null),
	        $('body').get(0)
	    );
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
	    getInitialState: function () {
	        return {
	            canvas: false,
	            context: false
	        };
	    },
	    componentDidMount: function () {
	        var canvas = $('#' + this.props.identifier).get(0);
	        this.setState({
	            canvas: canvas,
	            context: canvas.getContext('2d')
	        });
	    },
	    render: function () {
	        var children = React.Children.map(this.props.children, function (child) {
	            return React.addons.cloneWithProps(child, {
	                context: this.state.context
	            });
	            return child;
	        }.bind(this));
	        return (
	            React.createElement("canvas", {id: this.props.identifier}, 
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
	
	var Polygon = React.createClass({displayName: "Polygon",
	    shouldComponentUpdate: function(nextProps, nextState){
	        return nextProps.context;
	    },
	    render: function(){
	        if(!this.props.context) return false;
	        var ctx = this.props.context;
	
	        ctx.fillStyle = "rgb(200,0,0)";
	        ctx.fillRect (10, 10, 55, 50);
	        
	        return false;
	    }
	});
	
	module.exports = Polygon;

/***/ }
/******/ ])
//# sourceMappingURL=bundle.js.map