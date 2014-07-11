
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
            this.points.add({ label: 'Osc A Detune' })
                .on('change:value', function (m) {
                    var value = m.get('value');
                    this.patch.set('oscA_detune', plonk.scale(value, 0, 1, -500, 500));
                }, this);
            this.points.add({ label: 'Osc B Detune' })
                .on('change:value', function (m) {
                    var value = m.get('value');
                    this.patch.set('oscB_detune', plonk.scale(value, 0, 1, -125, 125));
                }, this);
            this.points.add({ label: 'Osc C Detune' })
                .on('change:value', function (m) {
                    var value = m.get('value');
                    this.patch.set('oscC_detune', plonk.scale(value, 0, 1, -250, 250));
                }, this);
            this.points.add({ label: 'Osc D Detune' })
                .on('change:value', function (m) {
                    var value = m.get('value');
                    this.patch.set('oscD_detune', plonk.scale(value, 0, 1, -250, 250));
                }, this);
            this.points.add({ label: 'Osc E Detune' })
                .on('change:value', function (m) {
                    var value = m.get('value');
                    this.patch.set('oscE_detune', plonk.scale(value, 0, 1, -250, 250));
                }, this);
            this.points.add({ label: 'Osc F Detune' })
                .on('change:value', function (m) {
                    var value = m.get('value');
                    this.patch.set('oscF_detune', plonk.scale(value, 0, 1, -500, 500));
                }, this);
            this.points.add({ label: 'Osc A X-mod Gain' })
                .on('change:value', function (m) {
                    var value = m.get('value');
                    this.patch.set('xmodGainA_gain', value * 50000);
                }, this);
            this.points.add({ label: 'Osc B X-mod Gain' })
                .on('change:value', function (m) {
                    var value = m.get('value');
                    this.patch.set('xmodGainB_gain', value * 50000);
                }, this);
            this.points.add({ label: 'Osc C X-mod Gain' })
                .on('change:value', function (m) {
                    var value = m.get('value');
                    this.patch.set('xmodGainC_gain', value * 50000);
                }, this);
            this.points.add({ label: 'Osc D X-mod Gain' })
                .on('change:value', function (m) {
                    var value = m.get('value');
                    this.patch.set('xmodGainD_gain', value * 50000);
                }, this);
            this.points.add({ label: 'Osc E X-mod Gain' })
                .on('change:value', function (m) {
                    var value = m.get('value');
                    this.patch.set('xmodGainE_gain', value * 50000);
                }, this);
            this.points.add({ label: 'Osc F X-mod Gain' })
                .on('change:value', function (m) {
                    var value = m.get('value');
                    this.patch.set('xmodGainF_gain', value * 50000);
                }, this);
            this.points.add({ label: 'Osc A Gain' })
                .on('change:value', function (m) {
                    var value = m.get('value');
                    this.patch.set('oscGainA_gain', plonk.scale(plonk.log(value), 0, 1, 0.5, 0.8));
                }, this);
            this.points.add({ label: 'Osc B Gain' })
                .on('change:value', function (m) {
                    var value = m.get('value');
                    this.patch.set('oscGainB_gain', plonk.scale(plonk.log(value), 0, 1, 0.5, 0.8));
                }, this);
            this.points.add({ label: 'Osc C Gain' })
                .on('change:value', function (m) {
                    var value = m.get('value');
                    this.patch.set('oscGainC_gain', plonk.scale(plonk.log(value), 0, 1, 0.2, 0.6));
                }, this);
            this.points.add({ label: 'Hipass Frequency' })
                .on('change:value', function (m) {
                    var value = m.get('value');
                    this.patch.set('hipass_frequency', plonk.scale(value, 0, 1, 5, 5000));
                }, this);
            this.points.add({ label: 'Hipass Q' })
                .on('change:value', function (m) {
                    var value = m.get('value');
                    this.patch.set('hipass_Q', plonk.scale(value, 0, 1, 0.7, 1.2));
                }, this);
            this.points.add({ label: 'Lowpass Frequency' })
                .on('change:value', function (m) {
                    var value = m.get('value');
                    this.patch.set('lowpass_frequency', plonk.scale(value, 0, 1, 30, 10000));
                }, this);
            this.points.add({ label: 'Lowpass Q' })
                .on('change:value', function (m) {
                    var value = m.get('value');
                    this.patch.set('lowpass_Q', plonk.scale(value, 0, 1, 0.7, 1.2));
                }, this);
            this.points.add({ label: 'Feedback Time' })
                .on('change:value', function (m) {
                    var value = m.get('value');
                    this.patch.set('feedback_delay', plonk.scale(plonk.log(value), 0, 1, 0.001, 0.5));
                }, this);
            this.points.add({ label: 'Feedback Gain' })
                .on('change:value', function (m) {
                    var value = m.get('value');
                    this.patch.set('feedbackGain', plonk.scale(plonk.log(value), 0, 1, 0.4, 0.85));
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
