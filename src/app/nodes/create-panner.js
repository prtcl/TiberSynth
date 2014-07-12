
define(function (require) {

    var audioContext = require('instances/audio-context');

    return function (args) {
        var options = $.extend({ x: 0, y: 0, z: 0 }, args),
            pan = audioContext.createPanner();
        pan.panningModel = 'equalpower';
        pan.distanceModel = 'exponential';
        pan.setPosition(options.x, options.y, options.z);
        return pan;
    }

});
