/**
 * Created by nmondon on 13/02/2015.
 */

var _ = require('lodash');

var IndividualProto = require('genetic/individual');
var VectorUtil = require('genetic/vector-util');

var Population = {

    individuals: [],

    numChromosoms: 0,

    weight: 0,

    init: function(numIndividuals, numChromosoms, weight, w, h){
        this.numChromosoms = numChromosoms;
        this.weight = weight;
        this.individuals = _.range(0, numIndividuals).map(function(){
            return Object.create(IndividualProto).init(numChromosoms, weight, w, h);
        });
        return this;
    },

    render: function(){
        this.individuals.forEach(function(u){ u.render();});
    },

    sortIndividuals: function(data){
        return _.sortBy(this.individuals, function(u){
            return VectorUtil.poorDist(u.getMatrix(), data);
        });
    }

};

module.exports =  Population;