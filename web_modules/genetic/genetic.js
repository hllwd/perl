'use strict';

var PopulationProp = require('genetic/population');

var genetic = {

    population: null,

    data: null,

    init: function(data, numUnits, numVecs, weight, w, h){
        this.data = data;
        this.population = Object.create(PopulationProp).init(numUnits, numVecs, weight, w, h);
        return this;
    },

    step: function(){
        this.population.render();
        return this.population.sortUnits(this.data)[0];
    }


};

module.exports = genetic;