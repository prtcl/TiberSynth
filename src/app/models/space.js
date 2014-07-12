
define(function (require) {

    var GravityPoints = require('collections/gravity-points'),
        Patch = require('models/patch');

    return Backbone.Model.extend({
        defaults: { created: 0, x: 0, y: 0, playing: false },
        constructor: function () {
            this.points = new GravityPoints();
            this.patch = new Patch();
            this.history = new Backbone.Collection();
            return Backbone.Model.apply(this, arguments);
        },
        initialize: function (args) {
            this._historyIndex = 0;
            this.set('created', Date.now());
            this.mapPointsToPatch();
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
                var data = this.points.serializeParams();
                this.patch.set({
                    oscA_detune: plonk.scale(data.oscA_detune, 0, 1, -500, 500),
                    oscB_detune: plonk.scale(data.oscB_detune, 0, 1, -125, 125),
                    oscC_detune: plonk.scale(data.oscC_detune, 0, 1, -250, 250),
                    oscD_detune: plonk.scale(data.oscD_detune, 0, 1, -250, 250),
                    oscE_detune: plonk.scale(data.oscE_detune, 0, 1, -250, 250),
                    oscF_detune: plonk.scale(data.oscF_detune, 0, 1, -500, 500),
                    xmodGainA_gain: (data.xmodGainA_gain * 50000),
                    xmodGainB_gain: (data.xmodGainB_gain * 50000),
                    xmodGainC_gain: (data.xmodGainC_gain * 50000),
                    xmodGainD_gain: (data.xmodGainD_gain * 50000),
                    xmodGainE_gain: (data.xmodGainE_gain * 50000),
                    xmodGainF_gain: (data.xmodGainF_gain * 50000),
                    oscGainA_gain: plonk.scale(plonk.log(data.oscGainA_gain), 0, 1, 0.5, 0.8),
                    oscGainB_gain: plonk.scale(plonk.log(data.oscGainB_gain), 0, 1, 0.5, 0.8),
                    oscGainC_gain: plonk.scale(plonk.log(data.oscGainC_gain), 0, 1, 0.2, 0.6),
                    hipass_frequency: plonk.scale(data.hipass_frequency, 0, 1, 5, 5000),
                    hipass_Q: plonk.scale(data.hipass_Q, 0, 1, 0.7, 1.2),
                    lowpass_frequency: plonk.scale(data.lowpass_frequency, 0, 1, 30, 10000),
                    lowpass_Q: plonk.scale(data.lowpass_Q, 0, 1, 0.7, 1.2),
                    feedback_delay: plonk.scale(plonk.log(data.feedback_delay), 0, 1, 0.001, 0.5),
                    feedbackGain: plonk.scale(plonk.log(data.feedbackGain), 0, 1, 0.4, 0.85)
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
