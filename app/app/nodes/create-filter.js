
define(function (require) {

    var audioContext = require('instances/audio-context');

    return function (args) {
        var options = $.extend({ type: 'lowpass', frequency: 1000, q: 0.0001, gain: 0 }, args),
            filter = audioContext.createBiquadFilter();
        filter.type = options.type;
        filter.frequency.value = options.frequency;
        filter.Q.value = options.q;
        filter.gain.value = options.gain;
        return filter;
    };

});
