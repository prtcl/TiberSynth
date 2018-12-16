
define(function (require) {

    var context = require('instances/audio-context'),
        canPlay = require('utils/can-play');

    return function () {
        if (typeof context === 'undefined') return false;
        if (canPlay.ogg === false && canPlay.mp3 === false) return false;
        if (!('createGain' in context)) return false;
        return true;
    };

});
