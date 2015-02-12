/**
 * Created by nicolasmondon on 12/02/15.
 */

module.exports = {
    fill: function(){
        this.props.context.fillStyle = this.props.fillStyle;
    },
    stroke: function(){

    },
    begin: function(){
        this.fill();
        this.stroke();
        this.props.context.save();
        this.props.context.translate(
            this.props.x,
            this.props.y
        );
        this.props.context.rotate(this.props.rotate);
    },
    end: function(){
        this.props.context.restore();
    }
};