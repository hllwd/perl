/**
 * Created by nmondon on 13/02/2015.
 */


'use strict';

var _ = require('lodash');
var d3 = require('d3');

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