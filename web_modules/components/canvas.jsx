'use strict';

var React = require('react');
var $ = require('jquery');

var Canvas = React.createClass({
    _canvas: false,
    _context: false,
    componentDidMount: function () {
        var canvas = $('#' + this.props.identifier).get(0);
        this._canvas = canvas;
        this._context = canvas.getContext('2d');
    },
    componentWillUpdate: function(){
        this._context && this._context.clearRect(0,0, this._canvas.width, this._canvas.height);
    },
    renderChildren: function(){
        return React.Children.map(this.props.children, function (child) {
            return React.addons.cloneWithProps(child, {
                context: this._context
            });
            return child;
        }.bind(this));
    },
    render: function () {
        var children = this.renderChildren();
        return (
            <canvas id={this.props.identifier}>
                {children}
            </canvas>
        );
    }
});

module.exports = Canvas;