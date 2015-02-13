'use strict';

var React = require('react');

var mixinComponent = require('components/mixin-component');

var ImageComp = React.createClass({
    getDefaultProps: function(){
        return {
            image: null,
            x: 0,
            y: 0,
            w: 0,
            h: 0
        }
    },
    mixins: [mixinComponent],
    render: function () {
        if(!this.props.context) return false;
        var ctx = this.props.context;

        ctx.drawImage(this.props.image, this.props.x, this.props.y);

        return false;
    }
});

module.exports = ImageComp;