'use strict';

var React = require('react');
var mixinComponent = require('components/mixin-component');

var Polygon = React.createClass({
    mixins: [mixinComponent],
    getDefaultProps: function(){
        return {
            points: [],
            fillStyle: 'rgb(200,0,0)'
        }
    },
    render: function(){
        if(!this.props.context) return false;
        var ctx = this.props.context;

        ctx.fillStyle = this.props.fillStyle;
        ctx.beginPath();
        this.props.points.forEach(function(p, i){
            if(i === 0){
                ctx.moveTo(p[0], p[1]);
            }else {
                ctx.lineTo(p[0], p[1]);
            }
        }, this);
        ctx.closePath();
        ctx.fill();

        return false;
    }
});

module.exports = Polygon;