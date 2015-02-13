'use strict';

var React = require('react');
var mixinPrimitive = require('components/mixin-primitive');
var mixinComponent = require('components/mixin-component');

var Rect = React.createClass({
    mixins: [mixinPrimitive, mixinComponent],
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

module.exports = Rect;