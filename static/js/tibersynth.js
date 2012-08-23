/*
    TiberSynth v0.1
    Real-time audio synthesis and many-to-many vector mapping in the web browser
    https://github.com/prtcl/tibersynth
    © 2012 Cory O'Brien http://prtcl.cc
*/

(function ($, Raphael) {

    var context = null;

    if (typeof AudioContext != 'undefined'){
        context = new AudioContext();
    } else if (typeof webkitAudioContext != 'undefined'){
        context = new webkitAudioContext();
    }

    function rand (min, max) {
        return Math.random() * (max - min) + min;
    }

    function scale (x, a1, a2, b1, b2) {
        return b1 + (x - a1) * (b2 - b1) / (a2 - a1);
    }

    function createOscillator (type, freq) {
        var osc = context.createOscillator(),
            types = { sine: osc.SINE, square: osc.SQUARE, saw: osc.SAWTOOTH };
        osc.type = type && types[type] || types['sine'];
        osc.frequency.value = freq || 440;
        osc.noteOn && osc.noteOn(0);
        return osc;
    }

    function createGainNode (gain) {
        var gainNode = context.createGainNode();
        gainNode.gain.value = gain || 0;
        return gainNode;
    }

    function createPanner (x, y, z) {
        var pan = context.createPanner();
        pan.setPosition(x || 0, y || 0, z || 0);
        return pan;
    }

    function createFilter (type, freq, q) {
        var filter = context.createBiquadFilter(),
            types = { hipass: 1, lowpass: 0 };
        filter.type = type && types[type] || type['lowpass'];
        filter.frequency.value = freq || 1000;
        filter.Q.value = q || 0;
        filter.gain.value = 0;
        return filter;        
    }

    function createDelayNode (time) {
        var delay = context.createDelayNode();
        delay.delayTime.value = time || 0;
        return delay;
    }

    function createCompressor (ratio, threshold, attack, release) {
        var comp = context.createDynamicsCompressor();
        comp.threshold.value = threshold; // -24
        comp.ratio.value = ratio; // 12
        comp.attack.value = attack; // 0.003000000026077032
        comp.release.value = release; // 0.25
        return comp;
    }

    function Events () {
        var self = this,
            _callbacks = {};

        self.on = function (name, callback) {
            if (typeof name == 'string' && typeof callback == 'function'){
                _callbacks[name] = _callbacks[name] || [];
                _callbacks[name].push(callback);
            }
            return self;
        };

        self.trigger = function (name) {
            _callbacks[name] = _callbacks[name] || [];
            _callbacks[name].forEach(function(callback){
                callback.apply(self);
            });
            return self;
        };
    }

    function Point (space) {
        if (!space) throw new Error('Where am I?');

        this._value = rand(0, 1);
        this.position = {
            x: rand(-1, 1),
            y: rand(-1, 1)
        };

        this.distance = function(){
            var x = (this.position.x - space.position.x),
                y = (this.position.y - space.position.y);
            return Math.sqrt((x * x) + (y * y)) / 2.01;
        };

        this.value = function(){
            return this._value * scale(this.distance(), 0, 1, 1, 0);
        };
    }

    function Space (args) {
        if (!args) args = {};

        var n_points = args.points || 20;

        this.position = { x: 0, y: 0 };

        this.generate = function(){
            this.points = [];
            for (var i = 0; i < n_points; i++) {
                this.points.push(new Point(this));   
            }
        };

        this.move = function(mouse){
            this.position.x = mouse.x * 2 - 1;
            this.position.y = mouse.y * 2 - 1;
        };

        this.generate();
    }

    function InputTracking () {
        var self = $.extend(this, new Events()),
            state = { spacebar: false },
            _window = $(window);

        self.spaceContainer = $('#tibersynth #space');
        self.controlsContainer = $('#tibersynth #controls');
        self.mouse = { x: 0, y: 0 };
        self.viewport = {};

        _window
            .on('resize', function(){
                self.viewport.x = self.spaceContainer.width();
                self.viewport.y = self.spaceContainer.height();
            })
            .on('keydown', function(e){
                if (e.which === 32){
                    if (!state.spacebar){
                        self.trigger('play');
                        state.spacebar = true;
                    } else {
                        self.trigger('stop');
                        state.spacebar = false;
                    }
                } else if (e.which === 82){
                    self.trigger('regen');
                }
            })
            .trigger('resize');

        self.spaceContainer
            .on('mousedown', function(e){
                self.trigger('play');
            })
            .on('mouseup', function(e){
                self.trigger('stop');
            })
            .on('mousemove', function(e){
                self.mouse.x = (e.pageX - self.spaceContainer.offset().left) / self.viewport.x;
                self.mouse.y = ((e.pageY - self.viewport.y) * -1) / self.viewport.y;
                self.trigger('move');
            });
    }

    function Interface (args) {
        if (!args) throw new Error("Need data!");

        var self = this,
            fps = args.fps || 30,
            _window = $(window);

        self.space = args.space;
        self.container = $('#tibersynth');
        self.controlsContainer = $('#controls', self.container);
        self.spaceContainer = $('#space', self.container);
        self.spacePaper = Raphael(self.spaceContainer[0], self.spaceContainer.width(), self.spaceContainer.height());

        self.spacePoints = [];

        var resize = (function(){
            var timer;
            return function () {
                timer && clearTimeout(timer);
                timer = setTimeout(function(){
                    self.spacePaper.setSize(self.spaceContainer.width(), self.spaceContainer.height());
                    self.generate();
                }, 100);
            };
        })();

        _window.on('resize', resize);

        self.generate = function () {
            self.spacePoints = [];
            self.spacePaper.clear();
            self.space.points.forEach(function(point, i){
                var x = scale(point.position.x, -1, 1, 0, self.spaceContainer.width()),
                    y = scale(point.position.y, 1, -1, 0, self.spaceContainer.height()),
                    circle = self.spacePaper.circle(x, y, 1);
                circle.attr({
                    'fill': 'rgba(0, 0, 0, 0.15)',
                    'stroke': 'rgba(0, 0, 0, 0.25)',
                    'stroke-width': 1,
                });
                self.spacePoints.push(circle);
            });
        };

        var drawInterface = function () {
            self.space.points.forEach(function(point, i){
                var circle = self.spacePoints[i],
                    v = scale(point.value(), 0, 1, 0, 22),
                    r = (v >= 0 ? v : 0),
                    fillOpacity = scale(point.distance(), 1.5, 0, 0, 1),
                    strokeOpacity = scale(point.distance(), 1.5, 0, 1, 0);

                circle.attr({
                    'r': r,
                    'fill-opacity': fillOpacity,
                    'stroke-opacity': strokeOpacity
                });
            });
        };

        setInterval(drawInterface, parseInt(1000 / fps));

        self.generate();
    }

    function Synth () {

        // create nodes
        this.oscA = createOscillator('sqaure', rand(0, 150));
        this.oscB = createOscillator('sine', rand(0, 1500));
        this.oscC = createOscillator('saw', rand(0, 150));
        this.oscD = createOscillator('saw', rand(0, 1500));
        this.oscE = createOscillator('sine', rand(0, 150));
        this.oscF = createOscillator('sqaure', rand(0, 15000));

        this.xmodGainA = createGainNode(0);
        this.xmodGainB = createGainNode(0);
        this.xmodGainC = createGainNode(0);
        this.xmodGainD = createGainNode(0);
        this.xmodGainE = createGainNode(0);
        this.xmodGainF = createGainNode(0);
        
        this.oscGainA = createGainNode(0);
        this.oscGainB = createGainNode(0);
        this.oscGainC = createGainNode(0);
        
        this.oscPanA = createPanner(-0.5, 0.1, 0);
        this.oscPanB = createPanner(0.5, 0.1, 0);
        this.oscPanC = createPanner(-0.005, -0.1, 0);
        this.oscPanD = createPanner(0.005, -0.1, 0);
        this.oscPanE = createPanner(-0.05, -0.5, 0);
        this.oscPanF = createPanner(0.05, -0.5, 0);
        
        this.hipass = createFilter('hipass', 5);
        this.lowpass = createFilter('lowpass', 10000);
        
        this.feedback = createDelayNode(rand(0, 1));
        this.feedbackGain = createGainNode(0);
        this.feedbackCompressor = createCompressor(10, 0, 0.0005, 0.0005);
        
        this.output = createGainNode(0);
        this.outputCompressor = createCompressor(1.5, -1, 0.1, 0.25);

        // route nodes
        this.oscB.connect(this.xmodGainA);
        this.xmodGainA.connect(this.oscA.frequency);
        this.oscA.connect(this.xmodGainB); 
        this.xmodGainB.connect(this.oscB.frequency); 

        this.oscD.connect(this.xmodGainC);
        this.xmodGainC.connect(this.oscC.frequency);
        this.oscC.connect(this.xmodGainD); 
        this.xmodGainD.connect(this.oscD.frequency);

        this.oscF.connect(this.xmodGainE);
        this.xmodGainE.connect(this.oscE.frequency);
        this.oscE.connect(this.xmodGainF); 
        this.xmodGainF.connect(this.oscF.frequency); 
        
        this.oscA.connect(this.oscPanA);
        this.oscB.connect(this.oscPanB);
        this.oscC.connect(this.oscPanC);
        this.oscD.connect(this.oscPanD);
        this.oscE.connect(this.oscPanE);
        this.oscF.connect(this.oscPanF);

        this.oscPanA.connect(this.oscGainA);
        this.oscPanB.connect(this.oscGainA);
        this.oscPanC.connect(this.oscGainB);
        this.oscPanD.connect(this.oscGainB);
        this.oscPanE.connect(this.oscGainC);
        this.oscPanF.connect(this.oscGainC);

        this.oscGainA.connect(this.hipass);
        this.oscGainB.connect(this.hipass);
        this.oscGainC.connect(this.hipass);

        this.hipass.connect(this.lowpass);
        this.lowpass.connect(this.output);

        this.lowpass.connect(this.feedback);
        this.feedback.connect(this.feedbackGain);
        this.feedbackGain.connect(this.feedbackCompressor);
        this.feedbackCompressor.connect(this.hipass);
        this.feedbackGain.connect(this.output);

        this.output.connect(this.outputCompressor);
        this.outputCompressor.connect(context.destination);

        this.update = function(points){
            this.oscA.detune.value = scale(points[0].value(), 0, 1, -500, 500);
            this.oscB.detune.value = scale(points[1].value(), 0, 1, -125, 125);
            this.oscC.detune.value = scale(points[2].value(), 0, 1, -250, 250);
            this.oscD.detune.value = scale(points[3].value(), 0, 1, -250, 250);
            this.oscE.detune.value = scale(points[4].value(), 0, 1, -250, 250);
            this.oscF.detune.value = scale(points[5].value(), 0, 1, -500, 500);

            this.xmodGainA.gain.value = points[6].value() * 100000;
            this.xmodGainB.gain.value = points[7].value() * 100000;
            this.xmodGainC.gain.value = points[8].value() * 100000;
            this.xmodGainD.gain.value = points[9].value() * 100000;
            this.xmodGainE.gain.value = points[10].value() * 100000;
            this.xmodGainF.gain.value = points[11].value() * 100000;
            
            this.oscGainA.gain.value = scale(points[12].value(), 0, 1, 0.5, 1);
            this.oscGainB.gain.value = scale(points[13].value(), 0, 1, 0.5, 1);
            this.oscGainC.gain.value = scale(points[14].value(), 0, 1, 0, 0.75);
            
            this.hipass.frequency.value = scale(points[15].value(), 0, 1, 5, 10000);
            this.lowpass.frequency.value = scale(points[16].value(), 0, 1, 30, 5000);
            
            this.feedback.delayTime.value = scale(points[17].value(), 0, 1, 0, 0.5);
            this.feedbackGain.gain.value = scale(points[18].value(), 0, 1, 0.5, 1);
        };

        this.newTones = function(){
            this.oscA.frequency.value = rand(0, 150);
            this.oscB.frequency.value = rand(0, 1500);
            this.oscC.frequency.value = rand(0, 150);
            this.oscD.frequency.value = rand(0, 1500);
            this.oscE.frequency.value = rand(0, 150);
            this.oscF.frequency.value = rand(0, 15000);
        };

        this.play = function(){
            this.output.gain.setTargetValueAtTime(1, context.currentTime, 0.01);
        };

        this.stop = function(){
            this.output.gain.setTargetValueAtTime(0, context.currentTime, 0.1);
        };

    }

    function TiberSynth () {
        var self = this;

        self.synth = new Synth();
        self.space = new Space({ points: 20 });
        self.tracking = new InputTracking();
        self.gui = new Interface({ space: self.space });

        self.tracking
            .on('move', function(){
                self.space.move(self.tracking.mouse);
                self.synth.update(self.space.points);
            })
            .on('play', function(){
                self.synth.play();
            })
            .on('stop', function(){
                self.synth.stop();
            })
            .on('regen', function(){
                self.space.generate();
                self.synth.newTones();
                self.synth.update(self.space.points);
                self.gui.generate();
            })
            .trigger('move');
    }

    $(function(){
        if (!context) setTimeout(function(){ $('#not-supported').fadeIn('slow'); }, 500);
        $('#tibersynth').length && new TiberSynth();
    });

})(jQuery, Raphael);
