'use strict';

var React = require('react');
var mixinComponent = require('components/mixin-component');

var Rect = React.createClass({
    mixins: [ mixinComponent],
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

    render: function(){
        if(!this.props.context) return false;
        var ctx = this.props.context;

        ctx.fillStyle = this.props.fillStyle;

        ctx.save();

        ctx.translate(
            this.props.x,
            this.props.y
        );
        ctx.rotate(this.props.rotate);

        ctx.fillRect (
            -this.props.w/2,
            -this.props.h/2,
            this.props.w/2,
            this.props.h/2);
        
        ctx.restore();

        return false;
    }
});

module.exports = Rect;