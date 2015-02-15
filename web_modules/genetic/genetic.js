'use strict';

var PopulationProp = require('genetic/population');

var genetic = {

    population: null,

    data: null,

    init: function(data, numIndividuals, numChromosoms, weight, w, h){
        this.data = data;
        this.population = Object.create(PopulationProp).init(numIndividuals, numChromosoms, weight, w, h);
        return this;
    },

    step: function(){
        this.population.render();
        return this.population.sortIndividuals(this.data)[0];
    },

    cross: function(){

    }


};

module.exports = genetic;