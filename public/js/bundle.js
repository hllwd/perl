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
	var Rect = __webpack_require__(6);
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
	            React.createElement(Canvas, {identifier: "canvas", step: this.state.step, width: 800, height: 600}, 
	                React.createElement(Polygon, {points: [[10,10], [40, 40], [30, 80]], fillStyle: '#00F'}), 
	                React.createElement(Rect, {x: this.state.step%50, y: 30, rotate: .3, h: 40, fillStyle: '#0F0'}), 
	                React.createElement(Rect, {x: 10, y: this.state.step%50})
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
	var mixinComponent = __webpack_require__(8);
	
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
/* 5 */,
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(1);
	var mixinPrimitive = __webpack_require__(7);
	var mixinComponent = __webpack_require__(8);
	
	var Rect = React.createClass({displayName: "Rect",
	    mixins: [mixinPrimitive, mixinComponent],
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
	
	        this.begin();
	        ctx.fillRect (
	            -this.props.w/2,
	            -this.props.h/2,
	            this.props.w/2,
	            this.props.h/2);
	        this.end();
	
	        return false;
	    }
	});
	
	module.exports = Rect;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by nicolasmondon on 12/02/15.
	 */
	
	module.exports = {
	
	    begin: function(){
	        this.props.context.fillStyle = this.props.fillStyle;
	        this.props.context.save();
	        this.props.context.translate(
	            this.props.x,
	            this.props.y
	        );
	        this.props.context.rotate(this.props.rotate);
	    },
	    end: function(){
	        this.props.context.restore();
	    }
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by nmondon on 13/02/2015.
	 */
	
	module.exports = {
	    shouldComponentUpdate: function(nextProps, nextState){
	        return nextProps.context;
	    }
	};

/***/ }
/******/ ])
//# sourceMappingURL=bundle.js.map