'use strict';

require('style.scss');

var React = require('react');
var $ = require('jquery');
var P = require('bluebird');

var Canvas = require('components/canvas');
var Rect = require('components/rect');
var Polygon = require('components/polygon');
var ImageComp = require('components/image');

var genetic = require('genetic/genetic');

var imageSrc = require('perl.png');
var image = new Image();
image.src = imageSrc;

var dim = [334, 413];

var Genetic = React.createClass({
    getInitialState: function () {
        return {
            step: 0,
            bi: {
                chromosoms: []
            }
        };
    },
    componentDidMount: function () {
        this.incrementStep();
    },
    incrementStep: function () {
        window.requestAnimationFrame(function () {
            var bi = this.props.genetic.step();
            this.setState({
                step: this.state.step + 1,
                bi: bi
            });
            this.incrementStep();
        }.bind(this))
    },
    render: function () {
        return (
            <Canvas identifier="canvas-gen" step={this.state.step} width={dim[0]} height={dim[1]}>
            {this.state.bi.chromosoms.map(function (c, k) {
                return <Polygon
                    key={k}
                    points={this.state.bi.getPoints(c)}
                    fillStyle={this.state.bi.getFillString(c)}/>
                }.bind(this))}
            </Canvas>
        )
    }
});

var Original = React.createClass({
    getInitialState: function () {
        return {step: 0};
    },
    componentDidMount: function () {
        this.setState({step: 1});
    },
    componentDidUpdate: function () {
        this.props.resolve(
            this.refs.canvas.getMatrix()
        );
    },
    render: function () {
        return (
            <Canvas identifier="canvas-img" step={this.state.step} width={dim[0]} height={dim[1]} ref="canvas">
                <ImageComp image={image}/>
            </Canvas>
        )
    }
});

$(function () {

    new P(function (res) {
        React.render(
            <Original resolve={res}/>,
            $('#img-container').get(0)
        )
    }).then(function (data) {
            genetic.init(data, 50, 10, dim[0], dim[1]);
            React.render(
                <Genetic genetic={genetic}/>,
                $('#gen-container').get(0)
            );
        });


})