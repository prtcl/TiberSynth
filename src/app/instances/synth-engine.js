
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

        // this.nodes.hipass.connect(this.nodes.output);
        // this.nodes.outputCompressor.connect(audioContext.destination);


        this._ready = true;
        return this;
    };

    synthEngine.bindPatchRouting = function (model) {
        model
            .on('change:oscA_frequency', function () {
                var value = model.get('oscA_frequency');
                this.nodes.oscA.frequency.value = value;
            }, this)
            .on('change:oscB_frequency', function () {
                var value = model.get('oscB_frequency');
                this.nodes.oscB.frequency.value = value;
            }, this)
            .on('change:oscC_frequency', function () {
                var value = model.get('oscC_frequency');
                this.nodes.oscC.frequency.value = value;
            }, this)
            .on('change:oscD_frequency', function () {
                var value = model.get('oscD_frequency');
                this.nodes.oscD.frequency.value = value;
            }, this)
            .on('change:oscE_frequency', function () {
                var value = model.get('oscE_frequency');
                this.nodes.oscE.frequency.value = value;
            }, this)
            .on('change:oscF_frequency', function () {
                var value = model.get('oscF_frequency');
                this.nodes.oscF.frequency.value = value;
            }, this)
            .on('change:oscA_detune', function () {
                var value = model.get('oscA_detune');
                this.nodes.oscA.detune.value = value;
            }, this)
            .on('change:oscB_detune', function () {
                var value = model.get('oscB_detune');
                this.nodes.oscB.detune.value = value;
            }, this)
            .on('change:oscC_detune', function () {
                var value = model.get('oscC_detune');
                this.nodes.oscC.detune.value = value;
            }, this)
            .on('change:oscD_detune', function () {
                var value = model.get('oscD_detune');
                this.nodes.oscD.detune.value = value;
            }, this)
            .on('change:oscE_detune', function () {
                var value = model.get('oscE_detune');
                this.nodes.oscE.detune.value = value;
            }, this)
            .on('change:oscF_detune', function () {
                var value = model.get('oscF_detune');
                this.nodes.oscF.detune.value = value;
            }, this)
            .on('change:xmodGainA_gain', function () {
                var value = model.get('xmodGainA_gain');
                this.nodes.xmodGainA.gain.value = value;
            }, this)
            .on('change:xmodGainB_gain', function () {
                var value = model.get('xmodGainB_gain');
                this.nodes.xmodGainB.gain.value = value;
            }, this)
            .on('change:xmodGainC_gain', function () {
                var value = model.get('xmodGainC_gain');
                this.nodes.xmodGainC.gain.value = value;
            }, this)
            .on('change:xmodGainD_gain', function () {
                var value = model.get('xmodGainD_gain');
                this.nodes.xmodGainD.gain.value = value;
            }, this)
            .on('change:xmodGainE_gain', function () {
                var value = model.get('xmodGainE_gain');
                this.nodes.xmodGainE.gain.value = value;
            }, this)
            .on('change:xmodGainF_gain', function () {
                var value = model.get('xmodGainF_gain');
                this.nodes.xmodGainF.gain.value = value;
            }, this)
            .on('change:oscGainA_gain', function () {
                var value = model.get('oscGainA_gain');
                this.nodes.oscGainA.gain.value = value;
            }, this)
            .on('change:oscGainB_gain', function () {
                var value = model.get('oscGainB_gain');
                this.nodes.oscGainB.gain.value = value;
            }, this)
            .on('change:oscGainC_gain', function () {
                var value = model.get('oscGainC_gain');
                this.nodes.oscGainC.gain.value = value;
            }, this)
            .on('change:hipass_frequency', function () {
                var value = model.get('hipass_frequency');
                this.nodes.hipass.frequency.value = value;
            }, this)
            .on('change:hipass_Q', function () {
                var value = model.get('hipass_Q');
                this.nodes.hipass.Q.value = value;
            }, this)
            .on('change:lowpass_frequency', function () {
                var value = model.get('lowpass_frequency');
                this.nodes.lowpass.frequency.value = value;
            }, this)
            .on('change:lowpass_Q', function () {
                var value = model.get('lowpass_Q');
                this.nodes.lowpass.Q.value = value;
            }, this)
            .on('change:feedback_delay', function () {
                var value = model.get('feedback_delay');
                this.nodes.feedback.delayTime.value = value;
            }, this)
            .on('change:feedbackGain', function () {
                var value = model.get('feedbackGain');
                this.nodes.feedbackGain.gain.value = value;
            }, this);
    };

    synthEngine.play = function () {
        var currentTime = audioContext.currentTime;
        this.nodes.output.gain.setTargetAtTime(0.9, currentTime, 0.01);
        return this;
    };

    synthEngine.stop = function () {
        var currentTime = audioContext.currentTime;
        this.nodes.output.gain.setTargetAtTime(0, currentTime, 0.01);
        return this;
    };

    return synthEngine;

});
