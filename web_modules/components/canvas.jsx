'use strict';

var React = require('react');
var $ = require('jquery');

var Canvas = React.createClass({
    getInitialState: function () {
        return {
            canvas: false,
            context: false
        };
    },
    componentDidMount: function () {
        var canvas = $('#' + this.props.identifier).get(0);
        this.setState({
            canvas: canvas,
            context: canvas.getContext('2d')
        });
    },
    render: function () {
        var children = React.Children.map(this.props.children, function (child) {
            return React.addons.cloneWithProps(child, {
                context: this.state.context
            });
            return child;
        }.bind(this));
        return (
            <canvas id={this.props.identifier}>
                {children}
            </canvas>
        );
    }
});

module.exports = Canvas;