'use strict';

var _ = require('lodash');
var vectorUtil = require('genetic/vector-util');

var Unit = {

    vecs: [],

    context: null,

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
    retrieveMatrix: function () {
        return this.context.getImageData(0, 0, this.context.canvas.width, this.context.canvas.height);
    }

};

module.exports = Unit;