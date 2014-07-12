
define(function (require) {

    var createAnalyser = require('nodes/create-analyser');

    var analyser = { node: createAnalyser({ size: 512 }) };
    analyser.waveData = new Uint8Array(analyser.node.fftSize);
    analyser.update = function () {
        this.node.getByteTimeDomainData(this.waveData);
        return this;
    };
    return analyser;

});
