
define(function (require) {
    var a = new Audio(),
        canPlay = { ogg: false, mp3: false };
    if (!a.canPlayType) return canPlay;
    canPlay.ogg = !!(a.canPlayType('audio/ogg; codecs="vorbis"') === 'probably');
    canPlay.mp3 = !!(a.canPlayType('audio/mpeg;') === 'probably' || a.canPlayType('audio/mpeg;') === 'maybe');
    return canPlay;
});
