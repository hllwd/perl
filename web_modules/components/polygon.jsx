'use strict';

var React = require('react');

var Polygon = React.createClass({
    shouldComponentUpdate: function(nextProps, nextState){
        return nextProps.context;
    },
    render: function(){
        if(!this.props.context) return false;
        var ctx = this.props.context;

        ctx.fillStyle = "rgb(200,0,0)";
        ctx.fillRect (this.props.x, this.props.y, 55, 50);

        return false;
    }
});

module.exports = Polygon;