
define(function (require) {

    var audioContext = require('instances/audio-context');

    return function (args) {
        var options = $.extend({ size: 1024, max: 0, min: -100 }, args),
            analyser = audioContext.createAnalyser();
        analyser.fftSize = options.size;
        analyser.maxDecibels = options.max;
        analyser.minDecidels = options.min;
        return analyser;
    };

});
