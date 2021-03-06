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
	var P = __webpack_require__(3);
	
	var Canvas = __webpack_require__(4);
	var Rect = __webpack_require__(5);
	var Polygon = __webpack_require__(6);
	var ImageComp = __webpack_require__(7);
	
	var genetic = __webpack_require__(8);
	
	var imageSrc = __webpack_require__(12);
	var image = new Image();
	image.src = imageSrc;
	
	var dim = [334, 413];
	
	var Genetic = React.createClass({displayName: "Genetic",
	    getInitialState: function () {
	        return {
	            step: 0,
	            bi: {
	                chromosoms: []
	            }
	        };
	    },
	    componentDidMount: function () {
	        this.incrementStep();
	    },
	    incrementStep: function () {
	        window.requestAnimationFrame(function () {
	            var bi = this.props.genetic.step();
	            this.setState({
	                step: this.state.step + 1,
	                bi: bi
	            });
	            this.incrementStep();
	        }.bind(this))
	    },
	    render: function () {
	        return (
	            React.createElement(Canvas, {identifier: "canvas-gen", step: this.state.step, width: dim[0], height: dim[1]}, 
	            this.state.bi.chromosoms.map(function (c, k) {
	                return React.createElement(Polygon, {
	                    key: k, 
	                    points: this.state.bi.getPoints(c), 
	                    fillStyle: this.state.bi.getFillString(c)})
	                }.bind(this))
	            )
	        )
	    }
	});
	
	var Original = React.createClass({displayName: "Original",
	    getInitialState: function () {
	        return {step: 0};
	    },
	    componentDidMount: function () {
	        this.setState({step: 1});
	    },
	    componentDidUpdate: function () {
	        this.props.resolve(
	            this.refs.canvas.getMatrix()
	        );
	    },
	    render: function () {
	        return (
	            React.createElement(Canvas, {identifier: "canvas-img", step: this.state.step, width: dim[0], height: dim[1], ref: "canvas"}, 
	                React.createElement(ImageComp, {image: image})
	            )
	        )
	    }
	});
	
	$(function () {
	
	    new P(function (res) {
	        React.render(
	            React.createElement(Original, {resolve: res}),
	            $('#img-container').get(0)
	        )
	    }).then(function (data) {
	            genetic.init(data, 50, 10, dim[0], dim[1]);
	            React.render(
	                React.createElement(Genetic, {genetic: genetic}),
	                $('#gen-container').get(0)
	            );
	        });
	
	
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

	module.exports = P;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(1);
	var $ = __webpack_require__(2);
	var _ = __webpack_require__(11);
	
	var Canvas = React.createClass({displayName: "Canvas",
	    _canvas: false,
	    _context: false,
	    componentDidMount: function () {
	        var canvas = $('#' + this.props.identifier).get(0);
	        this._context = canvas.getContext('2d');
	    },
	    componentWillUpdate: function () {
	        this._context && this._context.clearRect(0, 0, this._context.canvas.width, this._context.canvas.height);
	    },
	    getMatrix: function () {
	        return _.toArray(this._context.getImageData(0, 0, this._context.canvas.width, this._context.canvas.height).data);
	    },
	    renderChildren: function () {
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(1);
	var mixinComponent = __webpack_require__(14);
	
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(1);
	var mixinComponent = __webpack_require__(14);
	
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(1);
	
	var mixinComponent = __webpack_require__(14);
	
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _ = __webpack_require__(11);
	
	var IndividualProto = __webpack_require__(16);
	var VectorUtil = __webpack_require__(18);
	
	var genetic = {
	
	    data: null,
	
	    numChromosoms: 0,
	
	    weight: 0,
	
	    w: 0,
	
	    h: 0,
	
	    individual: null,
	
	    diff: 0,
	
	    init: function(data, numChromosoms, weight, w, h){
	        this.data = data;
	        this.individual = Object.create(IndividualProto).init(numChromosoms, weight, w, h).render();
	        this.diff = VectorUtil.dist(this.individual.getMatrix(), this.data);
	        this.numChromosoms = numChromosoms;
	        this.weight = weight;
	        this.w = w;
	        this.h = h;
	        return this;
	    },
	
	    step: function(){
	        // create new individual
	        var newIndividual = this.mutation();
	        var newDiff = VectorUtil.dist(newIndividual.getMatrix(), this.data);
	
	        if(newDiff < this.diff){
	            console.log('mutation réussie', this.diff, newDiff)
	            this.individual = newIndividual;
	            this.diff = newDiff;
	        }else {
	            console.log('mutation non réussie', this.diff, newDiff)
	        }
	
	        return this.individual;
	    },
	
	    mutation: function(){
	        return Object.create(IndividualProto)
	            .init(this.numChromosoms, this.weight, this.w, this.h)
	            .mutateFrom(this.individual)
	            .render();
	    }
	
	
	};
	
	module.exports = genetic;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(10);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(13)(content, {});
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

	exports = module.exports = __webpack_require__(19)();
	exports.push([module.id, "html,body{width:100%;height:100%;margin:0}#img-container,#gen-container{display:inline-block;width:400px}", ""]);

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = _;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "data:image/png;base64,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"

/***/ },
/* 13 */
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
/* 14 */
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
/* 15 */,
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _ = __webpack_require__(11);
	var d3 = __webpack_require__(17);
	
	var vectorUtil = __webpack_require__(18);
	
	var rgbaTemplate = _.template('rgba(<%=r%>, <%=g%>, <%=b%>, <%=a%>)');
	var scaleRgb = d3.scale.linear()
	    .domain([0, 1])
	    .rangeRound([0, 255]);
	
	var Individual = {
	
	    chromosoms: [],
	
	    context: null,
	
	    scaleWidth: null,
	
	    scaleHeight: null,
	
	    w: 0,
	
	    h: 0,
	
	    init: function (numChromosoms, weight, w, h) {
	        // http://stackoverflow.com/questions/3892010/create-2d-context-without-canvas
	        this.context = window.document.createElement('canvas').getContext('2d');
	        this.context.canvas.width = w;
	        this.context.canvas.height = h;
	        this.w = w;
	        this.h = h;
	        this.chromosoms = _.range(0, numChromosoms).map(function () {
	            return vectorUtil.generate(weight);
	        });
	        this.scaleWidth = d3.scale.linear()
	            .domain([0, 1])
	            .rangeRound([0, w]);
	        this.scaleHeight = d3.scale.linear()
	            .domain([0, 1])
	            .rangeRound([0, h]);
	        return this;
	    },
	    mutateFrom: function(parent){
	        this.chromosoms = _.cloneDeep(parent.chromosoms);
	        // mutation
	        var numChromosomToMutate = Math.floor(Math.random() * this.chromosoms.length);
	        var numWeightToMutate = Math.floor(Math.random() * this.chromosoms[0].length);
	        this.chromosoms[numChromosomToMutate][numWeightToMutate] = Math.random();
	
	        return this;
	    },
	    render: function () {
	        // weight === 10 here ; 2*3 points and 4 for rgba
	        this.chromosoms.forEach(function (v) {
	            this.drawPolygon(
	                this.context,
	                this.getPoints(v),
	                this.getFillString(v)
	            );
	        }, this);
	        return this;
	    },
	    getPoints: function (v) {
	        return [
	            this.getPointScale(v.slice(0, 2)),
	            this.getPointScale(v.slice(2, 4)),
	            this.getPointScale(v.slice(4, 6))
	        ]
	    },
	    getPointScale: function (v) {
	        return [
	            this.scaleWidth(v[0]),
	            this.scaleHeight(v[1])
	        ]
	    },
	    drawPolygon: function (ctx, points, fill) {
	        ctx.fillStyle = fill;
	        ctx.beginPath();
	        points.forEach(function (p, i) {
	            if (i === 0) {
	                ctx.moveTo(p[0], p[1]);
	            } else {
	                ctx.lineTo(p[0], p[1]);
	            }
	        }, this);
	        ctx.closePath();
	        ctx.fill();
	
	    },
	    getFillString: function (v) {
	        var vc = v.slice(6, 10);
	        var s =  rgbaTemplate({
	            r: scaleRgb(vc[0]),
	            g: scaleRgb(vc[1]),
	            b: scaleRgb(vc[2]),
	            a: d3.round(vc[3], 2)
	        });
	        return s;
	    },
	    getMatrix: function () {
	        return _.toArray(this.context.getImageData(0, 0, this.context.canvas.width, this.context.canvas.height).data);
	    }
	
	};
	
	module.exports = Individual;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = d3;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by nmondon on 13/02/2015.
	 */
	
	
	'use strict';
	
	var _ = __webpack_require__(11);
	var d3 = __webpack_require__(17);
	
	module.exports = {
	    mult: function(v, coef){
	        return v.map(function(val){
	            return val * coef;
	        });
	    },
	    add: function(v1, v2){
	        return v1.map(function(val, i){
	            return val + v2[i];
	        });
	    },
	    diff: function(v1, v2){
	        return v1.map(function(val, i){
	            return v2[i] - val;
	        });
	    },
	    dist: function(v1, v2){
	        return Math.sqrt(_.reduce(v1.map(function(val, i){
	            return Math.pow(v2[i] - val, 2);
	        }), function(sum, val){
	            return sum + val;
	        }));
	    },
	    poorDist: function(v1, v2){
	        return _.reduce(v1.map(function(val, i){
	            return Math.abs(val - v2[i]);
	        }), function(sum, val){
	            return sum + val;
	        })
	    },
	    castToArray: function(v){
	        return Array.prototype.map.call(v, function(d){return d;});
	    },
	    generate: function(dim){
	        return _.range(0, dim).map(function(){
	            return d3.round(Math.random(),2);
	        });
	    }
	};

/***/ },
/* 19 */
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