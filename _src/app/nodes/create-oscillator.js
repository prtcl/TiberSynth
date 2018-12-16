
define(function (require) {

    var audioContext = require('instances/audio-context');

    return function (args) {
        var options = $.extend({ type: 'sine', frequency: 440 }, args),
            osc = audioContext.createOscillator();
        osc.type = options.type;
        osc.frequency.value = options.frequency;
        osc.start(0);
        return osc;
    };

});
