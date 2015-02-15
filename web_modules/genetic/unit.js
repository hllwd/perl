'use strict';

var _ = require('lodash');
var d3 = require('d3');

var vectorUtil = require('genetic/vector-util');

var rgbaTemplate = _.template('rgba(<%=r%>, <%=g%>, <%=b%>, <%=a%>)');
var scaleRgb = d3.scale.linear()
    .domain([0, 1])
    .range([0, 255]);

var Unit = {

    vecs: [],

    context: null,

    matrix: null,

    init: function (numVecs, weight, w, h) {
        // http://stackoverflow.com/questions/3892010/create-2d-context-without-canvas
        this.context = window.document.createElement('canvas').getContext('2d');
        this.context.canvas.width = w;
        this.context.canvas.height = h;
        this.vecs = _.range(0, numVecs).map(function () {
            return vectorUtil.generate(weight);
        });
        return this;
    },
    render: function () {
        // weight === 10 here ; 2*3 points and 4 for rgba
        this.vecs.forEach(function (v) {
            this.drawPolygon(
                this.context,
                v.slice(0, 6),
                this.getFillString(v.slice(6, 10))
            );
        }, this);
        this.drawPolygon();
        this.retrieveMatrix();
    },
    drawPolygon: function (ctx, points, fill) {
        ctx.fillStyle = fill;
        ctx.beginPath();
        this.props.points.forEach(function (p, i) {
            if (i === 0) {
                ctx.moveTo(p[0], p[1]);
            } else {
                ctx.lineTo(p[0], p[1]);
            }
        }, this);
        ctx.closePath();
        ctx.fill();

    },
    getFillString(v) {
        return rgbaTemplate({
            r: scaleRgb(v[0]),
            g: scaleRgb(v[1]),
            b: scaleRgb(v[2]),
            a: v[4]
        })
    },
    retrieveMatrix: function () {
        this.matrix = this.context.getImageData(0, 0, this.context.canvas.width, this.context.canvas.height).data;
    }

};

module.exports = Unit;