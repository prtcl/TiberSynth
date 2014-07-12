
define(function (require) {
    var audioContext;
    if (typeof AudioContext !== 'undefined') {
        audioContext = new AudioContext();
    } else if (typeof webkitAudioContext !== 'undefined') {
        audioContext = new webkitAudioContext();
    }
    return audioContext;
});
