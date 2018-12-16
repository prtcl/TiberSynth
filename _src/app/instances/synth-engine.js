
define(function (require) {

    var audioContext = require('instances/audio-context'),
        isCompatibleBrowser = require('utils/is-compatible-browser');

    var createGain = require('nodes/create-gain'),
        createPanner = require('nodes/create-panner'),
        createOscillator = require('nodes/create-oscillator'),
        createFilter = require('nodes/create-filter'),
        createDelay = require('nodes/create-delay'),
        createCompressor = require('nodes/create-compressor');

    var synthEngine = { _ready: false, nodes: {} };

    if (!isCompatibleBrowser()) return synthEngine;

    synthEngine.nodes.oscA = createOscillator({ type: 'square', frequency: 0 });
    synthEngine.nodes.oscB = createOscillator({ type: 'sine', frequency: 0 });
    synthEngine.nodes.oscC = createOscillator({ type: 'sawtooth', frequency: 0 });
    synthEngine.nodes.oscD = createOscillator({ type: 'sawtooth', frequency: 0 });
    synthEngine.nodes.oscE = createOscillator({ type: 'sine', frequency: 0 });
    synthEngine.nodes.oscF = createOscillator({ type: 'square', frequency: 0 });
    synthEngine.nodes.xmodGainA = createGain({ gain: 0 });
    synthEngine.nodes.xmodGainB = createGain({ gain: 0 });
    synthEngine.nodes.xmodGainC = createGain({ gain: 0 });
    synthEngine.nodes.xmodGainD = createGain({ gain: 0 });
    synthEngine.nodes.xmodGainE = createGain({ gain: 0 });
    synthEngine.nodes.xmodGainF = createGain({ gain: 0 });
    synthEngine.nodes.oscGainA = createGain({ gain: 0 });
    synthEngine.nodes.oscGainB = createGain({ gain: 0 });
    synthEngine.nodes.oscGainC = createGain({ gain: 0 });
    synthEngine.nodes.oscPanA = createPanner({ x: -0.5, y: 0.1, z: 0 });
    synthEngine.nodes.oscPanB = createPanner({ x: 0.5, y: 0.1, z: 0 });
    synthEngine.nodes.oscPanC = createPanner({ x: -0.005, y: -0.1, z: 0});
    synthEngine.nodes.oscPanD = createPanner({ x: 0.005, y: -0.1, z: 0 });
    synthEngine.nodes.oscPanE = createPanner({ x: -0.05, y: -0.5, z: 0 });
    synthEngine.nodes.oscPanF = createPanner({ x: 0.05, y: -0.5, z: 0 });
    synthEngine.nodes.preFilterCompressor = createCompressor({ ratio: 1.5, threshold: -2, attack: 0.1, release: 0.25 });
    synthEngine.nodes.hipass = createFilter({ type: 'highpass', frequency: 20, q: 1 });
    synthEngine.nodes.lowpass = createFilter({ type: 'lowpass', frequency: 10000, q: 0.05 });
    synthEngine.nodes.feedback = createDelay({ time: 0 });
    synthEngine.nodes.feedbackGain = createGain({ gain: 0 });
    synthEngine.nodes.feedbackCompressor = createCompressor({ ratio: 20, threshold: -2, attack: 0.001, release: 0.001 });
    synthEngine.nodes.output = createGain({ gain: 0 });
    synthEngine.nodes.eqLow = createFilter({ type: 'lowshelf', frequency: 80, q: 1, gain: -2 });
    synthEngine.nodes.eqLowMid = createFilter({ type: 'peaking', frequency: 350, q: 2.5, gain: -5 });
    synthEngine.nodes.eqHighMid = createFilter({ type: 'peaking', frequency: 4500, q: 0.5, gain: 1 });
    synthEngine.nodes.eqHigh = createFilter({ type: 'highshelf', frequency: 8000, q: 1, gain: 15 });
    synthEngine.nodes.outputCompressor = createCompressor({ ratio: 20, threshold: -10, attack: 0.1, release: 0.25 });

    synthEngine.connectNodes = function () {
        if (this._ready) return this;
        this.nodes.oscB.connect(this.nodes.xmodGainA);
        this.nodes.xmodGainA.connect(this.nodes.oscA.frequency);
        this.nodes.oscA.connect(this.nodes.xmodGainB);
        this.nodes.xmodGainB.connect(this.nodes.oscB.frequency);
        this.nodes.oscD.connect(this.nodes.xmodGainC);
        this.nodes.xmodGainC.connect(this.nodes.oscC.frequency);
        this.nodes.oscC.connect(this.nodes.xmodGainD);
        this.nodes.xmodGainD.connect(this.nodes.oscD.frequency);
        this.nodes.oscF.connect(this.nodes.xmodGainE);
        this.nodes.xmodGainE.connect(this.nodes.oscE.frequency);
        this.nodes.oscE.connect(this.nodes.xmodGainF);
        this.nodes.xmodGainF.connect(this.nodes.oscF.frequency);
        this.nodes.oscA.connect(this.nodes.oscPanA);
        this.nodes.oscB.connect(this.nodes.oscPanB);
        this.nodes.oscC.connect(this.nodes.oscPanC);
        this.nodes.oscD.connect(this.nodes.oscPanD);
        this.nodes.oscE.connect(this.nodes.oscPanE);
        this.nodes.oscF.connect(this.nodes.oscPanF);
        this.nodes.oscPanA.connect(this.nodes.oscGainA);
        this.nodes.oscPanB.connect(this.nodes.oscGainA);
        this.nodes.oscPanC.connect(this.nodes.oscGainB);
        this.nodes.oscPanD.connect(this.nodes.oscGainB);
        this.nodes.oscPanE.connect(this.nodes.oscGainC);
        this.nodes.oscPanF.connect(this.nodes.oscGainC);
        this.nodes.oscGainA.connect(this.nodes.preFilterCompressor);
        this.nodes.oscGainB.connect(this.nodes.preFilterCompressor);
        this.nodes.oscGainC.connect(this.nodes.preFilterCompressor);
        this.nodes.preFilterCompressor.connect(this.nodes.hipass);
        this.nodes.hipass.connect(this.nodes.lowpass);
        this.nodes.lowpass.connect(this.nodes.output);
        this.nodes.lowpass.connect(this.nodes.feedback);
        this.nodes.feedback.connect(this.nodes.feedbackGain);
        this.nodes.feedbackGain.connect(this.nodes.feedbackCompressor);
        this.nodes.feedbackCompressor.connect(this.nodes.hipass);
        this.nodes.output.connect(this.nodes.eqLow);
        this.nodes.eqLow.connect(this.nodes.eqLowMid);
        this.nodes.eqLowMid.connect(this.nodes.eqHighMid);
        this.nodes.eqHighMid.connect(this.nodes.eqHigh);
        this.nodes.eqHigh.connect(this.nodes.outputCompressor);
        this.nodes.outputCompressor.connect(audioContext.destination);
        this._ready = true;
        return this;
    };

    synthEngine.update = function (data) {
        data || (data = {});
        this.nodes.oscA.frequency.value = data.oscA_frequency;
        this.nodes.oscB.frequency.value = data.oscB_frequency;
        this.nodes.oscC.frequency.value = data.oscC_frequency;
        this.nodes.oscD.frequency.value = data.oscD_frequency;
        this.nodes.oscE.frequency.value = data.oscE_frequency;
        this.nodes.oscF.frequency.value = data.oscF_frequency;
        this.nodes.oscA.detune.value = data.oscA_detune;
        this.nodes.oscB.detune.value = data.oscB_detune;
        this.nodes.oscC.detune.value = data.oscC_detune;
        this.nodes.oscD.detune.value = data.oscD_detune;
        this.nodes.oscE.detune.value = data.oscE_detune;
        this.nodes.oscF.detune.value = data.oscF_detune;
        this.nodes.xmodGainA.gain.value = data.xmodGainA_gain;
        this.nodes.xmodGainB.gain.value = data.xmodGainB_gain;
        this.nodes.xmodGainC.gain.value = data.xmodGainC_gain;
        this.nodes.xmodGainD.gain.value = data.xmodGainD_gain;
        this.nodes.xmodGainE.gain.value = data.xmodGainE_gain;
        this.nodes.xmodGainF.gain.value = data.xmodGainF_gain;
        this.nodes.oscGainA.gain.value = data.oscGainA_gain;
        this.nodes.oscGainB.gain.value = data.oscGainB_gain;
        this.nodes.oscGainC.gain.value = data.oscGainC_gain;
        this.nodes.hipass.frequency.value = data.hipass_frequency;
        this.nodes.hipass.Q.value = data.hipass_Q;
        this.nodes.lowpass.frequency.value = data.lowpass_frequency;
        this.nodes.lowpass.Q.value = data.lowpass_Q;
        this.nodes.feedback.delayTime.value = data.feedback_delay;
        this.nodes.feedbackGain.gain.value = data.feedbackGain;
        return this;
    };

    synthEngine.play = function () {
        var currentTime = audioContext.currentTime;
        this.nodes.output.gain.setTargetAtTime(0.9, currentTime, 0.025);
        return this;
    };

    synthEngine.stop = function () {
        var currentTime = audioContext.currentTime;
        this.nodes.output.gain.setTargetAtTime(0, currentTime, 0.1);
        return this;
    };

    return synthEngine;

});
