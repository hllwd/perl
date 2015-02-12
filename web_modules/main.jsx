'use strict';

var React = require('react');
var $ = require('jquery');
var Canvas = require('components/canvas');
var Polygon = require('components/polygon');

var Genetic = React.createClass({
    getInitialState: function(){
        return {
            step: 0
        };
    },
    componentDidMount: function(){
        this.incrementStep();
    },
    incrementStep: function(){
        window.requestAnimationFrame(function(){
            this.setState({
                step: this.state.step+1
            });
            this.incrementStep();
        }.bind(this))
    },
    render: function () {
        return (
            <Canvas identifier="canvas" step={this.state.step}>
                <Polygon x={this.state.step%50} y={30} rotate={.3} h={40}/>
                <Polygon x={10} y={this.state.step%50}/>
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