
define(function (require) {

    var audioContext = require('instances/audio-context');

    return function (args) {
        var options = $.extend({ time: 0 }, args),
            delay = audioContext.createDelay();
        delay.delayTime.value = options.time;
        return delay;
    };

});
