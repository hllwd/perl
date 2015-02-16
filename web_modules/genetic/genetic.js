'use strict';

var _ = require('lodash');

var IndividualProto = require('genetic/individual');
var VectorUtil = require('genetic/vector-util');

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