'use strict';

var _ = require('lodash');
var vectorUtil = require('genetic/vector-util');

var Unit = {

    vecs: [],

    init: function(numVecs, weight){
        this.vecs = _.range(0, numVecs).map(function(){
            return vectorUtil.generate(weight);
        });
        return this;
    }

};

module.exports = Unit;