'use strict';

require('style.scss');

var React = require('react');
var $ = require('jquery');
var Canvas = require('components/canvas');
var Rect = require('components/rect');
var Polygon = require('components/polygon');
var ImageComp = require('components/image');

var imageSrc = require('perl.png');
var image = new Image();
image.src = imageSrc;

var dim = [334, 413];

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
            <Canvas identifier="canvas-gen" step={this.state.step} width={dim[0]} height={dim[1]}>
                <Polygon points={[[10,10], [40, 40], [30, 80]]} fillStyle={'#00F'}/>
                <Rect x={this.state.step%50} y={30} rotate={.3} h={40} fillStyle={'#0F0'}/>
                <Rect x={10} y={this.state.step%50}/>
            </Canvas>
        )
    }
});

var Original = React.createClass({
    getInitialState: function(){
        return {step: 0};
    },
    componentDidMount: function(){
        this.setState({step: 1});
    },
    render: function () {
        return (
            <Canvas identifier="canvas-img" step={this.state.step} width={dim[0]} height={dim[1]}>
                <ImageComp image={image}/>
            </Canvas>
        )
    }
});

$(function () {
    React.render(
        <Genetic/>,
        $('#gen-container').get(0)
    );

    React.render(
        <Original />,
        $('#img-container').get(0)
    )
})