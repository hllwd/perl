'use strict';

var React = require('react');
var $ = require('jquery');
var Canvas = require('components/canvas');
var Polygon = require('components/polygon');

var Genetic = React.createClass({
    render: function () {
        return (
            <Canvas identifier="canvas">
                <Polygon/>
            </Canvas>
        )
    }
});

$(function () {
    React.render(
        <Genetic/>,
        $('body').get(0)
    );
})