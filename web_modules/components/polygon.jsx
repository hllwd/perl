'use strict';

var React = require('react');
var mixinElements = require('components/mixin-elements');

var Polygon = React.createClass({
    mixins: [mixinElements],
    getDefaultProps: function(){
        return {
            x: 0,
            y: 0,
            w: 10,
            h: 10,
            fillStyle: 'rgb(200,0,0)',
            rotate: 0
        }
    },
    shouldComponentUpdate: function(nextProps, nextState){
        return nextProps.context;
    },
    render: function(){
        if(!this.props.context) return false;
        var ctx = this.props.context;

        this.begin();
        ctx.fillRect (
            -this.props.w/2,
            -this.props.h/2,
            this.props.w/2,
            this.props.h/2);
        this.end();

        return false;
    }
});

module.exports = Polygon;