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
            fillStyle: 'rgb(200,0,0)'
        }
    },
    shouldComponentUpdate: function(nextProps, nextState){
        return nextProps.context;
    },
    render: function(){
        if(!this.props.context) return false;
        var ctx = this.props.context;

        this.fill();

        ctx.fillRect (
            this.props.x,
            this.props.y,
            this.props.w,
            this.props.h);

        return false;
    }
});

module.exports = Polygon;