'use strict';

var _ = require('lodash');
var d3 = require('d3');

var vectorUtil = require('genetic/vector-util');

var rgbaTemplate = _.template('rgba(<%=r%>, <%=g%>, <%=b%>, <%=a%>)');
var scaleRgb = d3.scale.linear()
    .domain([0, 1])
    .rangeRound([0, 255]);

var Individual = {

    chromosoms: [],

    context: null,

    scaleWidth: null,

    scaleHeight: null,

    init: function (numChromosoms, weight, w, h) {
        // http://stackoverflow.com/questions/3892010/create-2d-context-without-canvas
        this.context = window.document.createElement('canvas').getContext('2d');
        this.context.canvas.width = w;
        this.context.canvas.height = h;
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
    init2: function(parent1, parent2, w, h){
        this.context = window.document.createElement('canvas').getContext('2d');
        this.context.canvas.width = w;
        this.context.canvas.height = h;

        var numChromosoms = parent1.chromosoms.length;

        var cut = parseInt(Math.random() * numChromosoms);

        this.chromosoms = parent1.chromosoms.slice(0, cut).concat(parent2.chromosoms.slice(cut, numChromosoms));

        this.scaleWidth = d3.scale.linear()
            .domain([0, 1])
            .rangeRound([0, w]);
        this.scaleHeight = d3.scale.linear()
            .domain([0, 1])
            .rangeRound([0, h]);
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