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
	            React.createElement(Canvas, {identifier: "canvas", step: this.state.step}, 
	                React.createElement(Polygon, {x: this.state.step%50, y: 10}), 
	                React.createElement(Polygon, {x: 10, y: this.state.step%50})
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
	var mixinElements = __webpack_require__(5);
	
	var Polygon = React.createClass({displayName: "Polygon",
	    mixins: [mixinElements],
	    getDefaultProps: function(){
	        return {
	            x: 0,
	            y: 0,
	            w: 10,
	            h: 10,
	            fillStyle: 'rgb(200,0,0)'
	        }
	    },
	    shouldComponentUpdate: function(nextProps, nextState){
	        return nextProps.context;
	    },
	    render: function(){
	        if(!this.props.context) return false;
	        var ctx = this.props.context;
	
	        this.fill();
	
	        ctx.fillRect (
	            this.props.x,
	            this.props.y,
	            this.props.w,
	            this.props.h);
	
	        return false;
	    }
	});
	
	module.exports = Polygon;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by nicolasmondon on 12/02/15.
	 */
	
	module.exports = {
	    fill: function(){
	        this.props.context.fillStyle = this.props.fillStyle;
	    }
	};

/***/ }
/******/ ])
//# sourceMappingURL=bundle.js.map