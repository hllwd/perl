'use strict';

var _ = require('lodash');

var PopulationProp = require('genetic/population');
var IndividualProp = require('genetic/individual');

var genetic = {

    population: null,

    data: null,

    numIndividuals: 0,

    selectionRate: 0,

    w: 0,

    h: 0,

    init: function(data, numIndividuals, selectionRate, numChromosoms, weight, w, h){
        this.data = data;
        this.numIndividuals = numIndividuals;
        this.selectionRate = selectionRate;
        this.population = Object.create(PopulationProp).init(numIndividuals, numChromosoms, weight, w, h);
        this.w = w;
        this.h = h;
        return this;
    },

    step: function(){
        console.log('step');
        this.population.render();
        var selectedPopulation = this.selection();
        var bi = selectedPopulation[0];
        this.crossover(selectedPopulation);
        return bi;
    },

    selection: function(){
        return this.population.sortIndividuals(this.data).slice(0, parseInt(this.selectionRate * this.numIndividuals));
    },

    crossover: function(selectedPopulation){
        var children = [];
        _.range(0, this.numIndividuals).map(function(){
            var shuffleParents = _.shuffle(selectedPopulation);
            var parent1 = shuffleParents[0];
            var parent2 = shuffleParents[1];
            children.push(Object.create(IndividualProp).init2(parent1, parent2, this.w, this.h));
        }.bind(this))
        this.population.setIndividuals(children);
    },

    mutation: function(){

    }


};

module.exports = genetic;