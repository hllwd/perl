/**
 * Created by nmondon on 13/02/2015.
 */

module.exports = {
    shouldComponentUpdate: function(nextProps, nextState){
        return nextProps.context;
    }
};