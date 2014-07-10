
var tibersynth = window.tibersynth = {};
tibersynth.inits = [];
tibersynth.context = (function(){
    var context;
    if (typeof AudioContext != 'undefined'){
        context = new AudioContext();
    } else if (typeof webkitAudioContext != 'undefined'){
        context = new webkitAudioContext();
    }
    return context;
})();

tibersynth.run = function () {
    this.inits.forEach(function(fn){ fn.apply(tibersynth); });
    return this;
};