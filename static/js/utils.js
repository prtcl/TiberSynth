
(function(){

    var tibersynth = this,
        context = tibersynth.context;

    var nodeHelpers = {
        oscillator: function (args) {
            var options = $.extend({ type: 'sine', frequency: 440 }, args),
                osc = context.createOscillator(),
                types = { sine: osc.SINE, square: osc.SQUARE, saw: osc.SAWTOOTH };
            osc.type = types[options.type]
            osc.frequency.value = options.frequency;
            osc.noteOn && osc.noteOn(0);
            return osc;
        },
        gain: function (args) {
            var options = $.extend({ gain: 0 }, args),
                gainNode = context.createGainNode();
            gainNode.gain.value = options.gain;
            return gainNode;
        },
        panner: function (args) {
            var options = $.extend({ x: 0, y: 0, z: 0 }, args),
                pan = context.createPanner();
            pan.setPosition(options.x, options.y, options.z);
            return pan;
        },
        filter: function (args) {
            var options = $.extend({ type: 'lowpass', frequency: 1000, q: 0 }, args),
                filter = context.createBiquadFilter(),
                types = { hipass: 1, lowpass: 0 };
            filter.type = types[options.type];
            filter.frequency.value = options.frequency;
            filter.Q.value = options.q;
            filter.gain.value = 0;
            return filter;        
        },
        delay: function (args) {
            var options = $.extend({ time: 0 }, args),
                delay = context.createDelayNode();
            delay.delayTime.value = options.time;
            return delay;
        },
        compressor: function (args) {
            var options = $.extend({ ratio: 1.5, threshold: -1, attack: 0.1, release: 0.25 }, args),
                comp = context.createDynamicsCompressor();
            comp.threshold.value = options.threshold;
            comp.ratio.value = options.ratio;
            comp.attack.value = options.attack;
            comp.release.value = options.release;
            return comp;
        },
        analyser: function (args) {
            var options = $.extend({ size: 1024, max: -10, min: -100 }, args),
                analyser = context.createAnalyser();
            analyser.fftSize = options.size;
            analyser.maxDecibels = options.max;
            analyser.minDecidels = options.min;
            return analyser
        }
    };

    tibersynth.utils = {
        rand: function (min, max) {
            return Math.random() * (max - min) + min;
        },
        scale: function (x, a1, a2, b1, b2) {
            return b1 + (x - a1) * (b2 - b1) / (a2 - a1);
        },
        constrain: function (val, min, max) {
            var retval = val;
            min || (min = 0);
            max || (max = 1);
            if (val < min) retval = min;
            if (val > max) retval = max;
            return retval;
        },
        createNode: function (type, args) {
            if (!(type in nodeHelpers)) return null;
            return nodeHelpers[type](args || {});
        }
    };

}).apply(tibersynth);
