'use strict';

var PopulationProp = require('genetic/population');

var genetic = {

    population: null,

    data: null,

    /**
     *
     * @param data
     * @param numUnits : 20
     * @param numVecs : 50
     * @param weight :
     */
    init: function(data, numUnits, numVecs, weight, w, h){
        this.data = data;
        this.population = Object.create(PopulationProp).init(numUnits, numVecs, weight, w, h);
        return this;
    }


};

module.exports = genetic;