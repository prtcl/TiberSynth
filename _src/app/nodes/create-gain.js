
define(function (require) {

    var audioContext = require('instances/audio-context');

    return function (args) {
        var options = $.extend({ gain: 0 }, args),
            gainNode = audioContext.createGain();
        gainNode.gain.value = options.gain;
        return gainNode;
    };

});
