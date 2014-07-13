
define(function (require) {

    var GravityPoints = require('collections/gravity-points'),
        Patch = require('models/patch'),
        Controls = require('models/controls'),
        Ranges = require('models/ranges');

    return Backbone.Model.extend({
        defaults: { created: 0, x: 0, y: 0, playing: false },
        constructor: function () {
            this.points = new GravityPoints();
            this.patch = new Patch();
            this.controls = new Controls();
            this.ranges = new Ranges();
            this.history = new Backbone.Collection();
            return Backbone.Model.apply(this, arguments);
        },
        initialize: function (args) {
            this._historyIndex = 0;
            this.set('created', Date.now());
            this.mapControlsToRanges();
            this.mapPointsToPatch();
        },
        mapControlsToRanges: function () {
            var hipassRanges = {
                    '0': [0, 40],
                    '20': [0, 50],
                    '40': [10, 1000],
                    '60': [5, 4000],
                    '80': [5, 5000],
                    '100': [0, 8000]
                },
                lowpassRanges = {
                    '0': [40, 2700],
                    '20': [60, 3800],
                    '40': [80, 5000],
                    '60': [50, 7500],
                    '80': [30, 10000],
                    '100': [30, 18000]
                },
                feedbackDelayRanges = {
                    '0': [0.15, 1],
                    '20': [0.1, 0.9],
                    '40': [0.05, 0.7],
                    '60': [0.01, 0.6],
                    '80': [0.001, 0.5],
                    '100': [0.001, 0.25]
                },
                feedbackGainRanges = {
                    '0': [0.2, 0.42],
                    '20': [0.3, 0.48],
                    '40': [0.4, 0.50],
                    '60': [0.41, 0.65],
                    '80': [0.42, 0.9],
                    '100': [0.5, 1]
                },
                xmodAmounts = {
                    '0': 1000,
                    '20': 5000,
                    '40': 10000,
                    '60': 20000,
                    '80': 50000,
                    '100': 60000
                },
                oscGainARanges = {
                    '0': [0.2, 0.5],
                    '20': [0.3, 0.6],
                    '40': [0.4, 0.7],
                    '60': [0.4, 0.8],
                    '80': [0.5, 0.8],
                    '100': [0.5, 0.9]
                },
                oscGainBRanges = {
                    '0': [0.3, 0.9],
                    '20': [0.2, 0.7],
                    '40': [0.2, 0.7],
                    '60': [0.5, 0.8],
                    '80': [0.5, 0.8],
                    '100': [0.4, 0.7]
                },
                oscGainCRanges = {
                    '0': [0, 0.2],
                    '20': [0.1, 0.5],
                    '40': [0.1, 0.7],
                    '60': [0.1, 0.5],
                    '80': [0.2, 0.6],
                    '100': [0.2, 0.9]
                };;
            this.controls.on('change', function () {
                var data = this.controls.toJSON();
                this.ranges.set({
                    'hipass_frequency': hipassRanges[data.filterRange],
                    'lowpass_frequency': lowpassRanges[data.filterRange],
                    'feedback_delay': feedbackDelayRanges[data.feedbackEmphasis],
                    'feedbackGain': feedbackGainRanges[data.feedbackEmphasis],
                    'xmodAmount': xmodAmounts[data.noiseBalance],
                    'oscGainA': oscGainARanges[data.noiseBalance],
                    'oscGainB': oscGainBRanges[data.noiseBalance],
                    'oscGainC': oscGainCRanges[data.noiseBalance]
                });
            }, this);
            return this;
        },
        mapPointsToPatch: function () {
            this.points.add([
                { id: 'oscA_detune', label: 'Osc A Detune' },
                { id: 'oscB_detune', label: 'Osc B Detune' },
                { id: 'oscC_detune', label: 'Osc C Detune' },
                { id: 'oscD_detune', label: 'Osc D Detune' },
                { id: 'oscE_detune', label: 'Osc E Detune' },
                { id: 'oscF_detune', label: 'Osc F Detune' },
                { id: 'xmodGainA_gain', label: 'Osc A X-mod Gain' },
                { id: 'xmodGainB_gain', label: 'Osc B X-mod Gain' },
                { id: 'xmodGainC_gain', label: 'Osc C X-mod Gain' },
                { id: 'xmodGainD_gain', label: 'Osc D X-mod Gain' },
                { id: 'xmodGainE_gain', label: 'Osc E X-mod Gain' },
                { id: 'xmodGainF_gain', label: 'Osc F X-mod Gain' },
                { id: 'oscGainA_gain', label: 'Osc A Gain' },
                { id: 'oscGainB_gain', label: 'Osc B Gain' },
                { id: 'oscGainC_gain', label: 'Osc C Gain' },
                { id: 'hipass_frequency', label: 'Hipass Frequency' },
                { id: 'hipass_Q', label: 'Hipass Q' },
                { id: 'lowpass_frequency', label: 'Lowpass Frequency' },
                { id: 'lowpass_Q', label: 'Lowpass Q' },
                { id: 'feedback_delay', label: 'Feedback Time' },
                { id: 'feedbackGain', label: 'Feedback Gain' }
            ]);
            this.on('change', function () {
                var data = this.points.serializeParams(),
                    ranges = this.ranges.toJSON();
                this.patch.set({
                    oscA_detune: plonk.scale(data.oscA_detune, 0, 1, -500, 500),
                    oscB_detune: plonk.scale(data.oscB_detune, 0, 1, -125, 125),
                    oscC_detune: plonk.scale(data.oscC_detune, 0, 1, -250, 250),
                    oscD_detune: plonk.scale(data.oscD_detune, 0, 1, -250, 250),
                    oscE_detune: plonk.scale(data.oscE_detune, 0, 1, -250, 250),
                    oscF_detune: plonk.scale(data.oscF_detune, 0, 1, -500, 500),
                    xmodGainA_gain: (data.xmodGainA_gain * ranges.xmodAmount),
                    xmodGainB_gain: (data.xmodGainB_gain * ranges.xmodAmount),
                    xmodGainC_gain: (data.xmodGainC_gain * ranges.xmodAmount),
                    xmodGainD_gain: (data.xmodGainD_gain * ranges.xmodAmount),
                    xmodGainE_gain: (data.xmodGainE_gain * ranges.xmodAmount),
                    xmodGainF_gain: (data.xmodGainF_gain * ranges.xmodAmount),
                    oscGainA_gain: plonk.scale(plonk.log(data.oscGainA_gain), 0, 1, ranges.oscGainA[0], ranges.oscGainA[1]),
                    oscGainB_gain: plonk.scale(plonk.log(data.oscGainB_gain), 0, 1, ranges.oscGainB[0], ranges.oscGainB[1]),
                    oscGainC_gain: plonk.scale(plonk.log(data.oscGainC_gain), 0, 1, ranges.oscGainC[0], ranges.oscGainC[1]),
                    hipass_frequency: plonk.scale(data.hipass_frequency, 0, 1, ranges.hipass_frequency[0], ranges.hipass_frequency[1]),
                    hipass_Q: plonk.scale(data.hipass_Q, 0, 1, 0.7, 1.2),
                    lowpass_frequency: plonk.scale(data.lowpass_frequency, 0, 1, ranges.lowpass_frequency[0], ranges.lowpass_frequency[1]),
                    lowpass_Q: plonk.scale(data.lowpass_Q, 0, 1, 0.7, 1.2),
                    feedback_delay: plonk.scale(plonk.log(data.feedback_delay), 0, 1, ranges.feedback_delay[0], ranges.feedback_delay[1]),
                    feedbackGain: plonk.scale(plonk.log(data.feedbackGain), 0, 1, ranges.feedbackGain[0], ranges.feedbackGain[1])
                });
            }, this);
        },
        toJSON: function () {
            var attrs = _.clone(this.attributes);
            attrs.points = this.points.toJSON();
            attrs.patch = this.patch.toJSON();
            return attrs;
        },
        parse: function (data) {
            this.points.set(data.points);
            this.patch.set(data.patch);
            delete data.points;
            delete data.patch;
            return data;
        },
        move: function (posX, posY) {
            this.points.each(function (point) {
                point.calculateDistance(posX, posY);
            });
            this.set({ x: posX, y: posY });
            return this;
        },
        regenerate: function () {
            this.patch.set({
                'oscA_frequency': plonk.rand(0, 150),
                'oscB_frequency': plonk.rand(0, 1500),
                'oscC_frequency': plonk.rand(0, 150),
                'oscD_frequency': plonk.rand(0, 1500),
                'oscE_frequency': plonk.rand(0, 150),
                'oscF_frequency': plonk.rand(0, 15000)
            });
            this.points.each(function (point) {
                point.randomize();
            });
            this.set('_updated', Date.now());
            this.history.add(this.toJSON());
            this._historyIndex = (this.history.length - 1);
            return this;
        },
        undo: function () {
            var previous = this.history.at(this._historyIndex - 1),
                data;
            if (!previous) return this;
            this._historyIndex = plonk.constrain(this._historyIndex - 1, 0, this.history.length);
            data = previous.toJSON();
            this.set(this.parse(data));
            return this;
        },
        redo: function () {
            var next = this.history.at(this._historyIndex + 1),
                data;
            if (!next) return this;
            this._historyIndex = plonk.constrain(this._historyIndex + 1, 0, this.history.length);
            data = next.toJSON();
            this.set(this.parse(data));
            return this;
        }
    });

});
