/**
 * Created by nmondon on 13/02/2015.
 */

var _ = require('lodash');

var UnitProto = require('genetic/unit');

var Population = {

    units: [],

    numVecs: 0,

    weight: 0,

    init: function(numUnits, numVecs, weight, w, h){
        this.numVecs = numVecs;
        this.weight = weight;
        this.units = _.range(0, numUnits).map(function(){
            return Object.create(UnitProto).init(numVecs, weight, w, h);
        });
        return this;
    }

};

module.exports =  Population;