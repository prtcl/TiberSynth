/*
    TiberSynth v0.1
    Real-time audio synthesis and many-to-many vector mapping in the web browser
    https://github.com/prtcl/tibersynth
    © 2012 Cory O'Brien http://prtcl.cc
*/

(function ($, Raphael) {

    var _window = $(window);

    var Nodes = {
        context: (function(){
            var context;
            if (typeof AudioContext != 'undefined'){
                context = new AudioContext();
            } else if (typeof webkitAudioContext != 'undefined'){
                context = new webkitAudioContext();
            }
            return context;
        })(),
        createOscillator: function (type, freq) {
            var osc = this.context.createOscillator(),
                types = { sine: osc.SINE, square: osc.SQUARE, saw: osc.SAWTOOTH };
            osc.type = type && types[type] || types['sine'];
            osc.frequency.value = freq || 440;
            osc.noteOn && osc.noteOn(0);
            return osc;
        },
        createGainNode: function (gain) {
            var gainNode = this.context.createGainNode();
            gainNode.gain.value = gain || 0;
            return gainNode;
        },
        createPanner: function (x, y, z) {
            var pan = this.context.createPanner();
            pan.setPosition(x || 0, y || 0, z || 0);
            return pan;
        },
        createFilter: function (type, freq, q) {
            var filter = this.context.createBiquadFilter(),
                types = { hipass: 1, lowpass: 0 };
            filter.type = type && types[type] || type['lowpass'];
            filter.frequency.value = freq || 1000;
            filter.Q.value = q || 0;
            filter.gain.value = 0;
            return filter;        
        },
        createDelayNode: function (time) {
            var delay = this.context.createDelayNode();
            delay.delayTime.value = time || 0;
            return delay;
        },
        createCompressor: function (ratio, threshold, attack, release) {
            var comp = this.context.createDynamicsCompressor();
            comp.threshold.value = threshold; // -24
            comp.ratio.value = ratio; // 12
            comp.attack.value = attack; // 0.003000000026077032
            comp.release.value = release; // 0.25
            return comp;
        }
    };

    var Utils = {
        rand: function (min, max) {
            return Math.random() * (max - min) + min;
        },
        scale: function (x, a1, a2, b1, b2) {
            return b1 + (x - a1) * (b2 - b1) / (a2 - a1);
        }
    };

    function Point (args) {
        var self = this;
        this.args = args || (args = {});
        this.space = this.args.space;
        this.attrs = {};
        this.position = {};
        this.randomize();
        this.space.on('move', function(){
            self.calculateDistance();
        });
    }

    $.extend(Point.prototype, {
        attrs: null,
        space: null,
        position: null,
        value: function () {
            return this.attrs.value * Utils.scale(this.attrs.distance, 0, 1, 1, 0);
        },
        distance: function () {
            return this.attrs.distance;
        },
        calculateDistance: function () {
            var x = (this.position.x - this.space.position.x),
                y = (this.position.y - this.space.position.y);
            this.attrs.distance = Math.sqrt((x * x) + (y * y)) / 2.01;
            this.trigger('change');
            return this;
        },
        randomize: function () {
            this.attrs.value = Utils.rand(0, 1);
            this.position.x = Utils.rand(-1, 1);
            this.position.y = Utils.rand(-1, 1);
            this.calculateDistance();
            this.trigger('randomize');
            return this;
        }
    });

    $.EventEmitter.extend(Point);

    function Space (args) {
        this.args = args || (args = {});
        this.position = { x: 0, y: 0 };
        this.generate();
    }

    $.extend(Space.prototype, {
        generate: function () {
            var n = this.args.points || 20;
            this.points = [];
            for (var i = 0; i < n; i++) {
                this.points.push(new Point({ space: this }));   
            }
            this.trigger('generate');
            return this;
        },
        move: function (mouse) {
            this.position.x = mouse.x * 2 - 1;
            this.position.y = mouse.y * 2 - 1;
            this.trigger('move');
            return this;
        }
    });

    $.EventEmitter.extend(Space);

    function InputTracking () {
        var self = this,
            state = { spacebar: false };

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

    $.EventEmitter.extend(InputTracking);

    function Interface (args) {
        if (!args) throw new Error("Need data!");

        var self = this,
            fps = args.fps || 25;

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
                var x = Utils.scale(point.position.x, -1, 1, 0, self.spaceContainer.width()),
                    y = Utils.scale(point.position.y, 1, -1, 0, self.spaceContainer.height()),
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
                    v = Utils.scale(point.value(), 0, 1, 0, 22),
                    r = (v >= 0 ? v : 0),
                    fillOpacity = Utils.scale(point.distance(), 1.5, 0, 0, 1),
                    strokeOpacity = Utils.scale(point.distance(), 1.5, 0, 1, 0);

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

        this.context = Nodes.context;

        // create nodes
        this.oscA = Nodes.createOscillator('square', Utils.rand(0, 150));
        this.oscB = Nodes.createOscillator('sine', Utils.rand(0, 1500));
        this.oscC = Nodes.createOscillator('saw', Utils.rand(0, 150));
        this.oscD = Nodes.createOscillator('saw', Utils.rand(0, 1500));
        this.oscE = Nodes.createOscillator('sine', Utils.rand(0, 150));
        this.oscF = Nodes.createOscillator('square', Utils.rand(0, 15000));

        this.xmodGainA = Nodes.createGainNode(0);
        this.xmodGainB = Nodes.createGainNode(0);
        this.xmodGainC = Nodes.createGainNode(0);
        this.xmodGainD = Nodes.createGainNode(0);
        this.xmodGainE = Nodes.createGainNode(0);
        this.xmodGainF = Nodes.createGainNode(0);
        
        this.oscGainA = Nodes.createGainNode(0);
        this.oscGainB = Nodes.createGainNode(0);
        this.oscGainC = Nodes.createGainNode(0);
        
        this.oscPanA = Nodes.createPanner(-0.5, 0.1, 0);
        this.oscPanB = Nodes.createPanner(0.5, 0.1, 0);
        this.oscPanC = Nodes.createPanner(-0.005, -0.1, 0);
        this.oscPanD = Nodes.createPanner(0.005, -0.1, 0);
        this.oscPanE = Nodes.createPanner(-0.05, -0.5, 0);
        this.oscPanF = Nodes.createPanner(0.05, -0.5, 0);
        
        this.hipass = Nodes.createFilter('hipass', 5);
        this.lowpass = Nodes.createFilter('lowpass', 10000);
        
        this.feedback = Nodes.createDelayNode(Utils.rand(0, 1));
        this.feedbackGain = Nodes.createGainNode(0);
        this.feedbackCompressor = Nodes.createCompressor(10, 0, 0.0005, 0.0005);
        
        this.output = Nodes.createGainNode(0);
        this.outputCompressor = Nodes.createCompressor(1.5, -1, 0.1, 0.25);

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
        this.outputCompressor.connect(this.context.destination);

        this.update = function(points){
            this.oscA.detune.value = Utils.scale(points[0].value(), 0, 1, -500, 500);
            this.oscB.detune.value = Utils.scale(points[1].value(), 0, 1, -125, 125);
            this.oscC.detune.value = Utils.scale(points[2].value(), 0, 1, -250, 250);
            this.oscD.detune.value = Utils.scale(points[3].value(), 0, 1, -250, 250);
            this.oscE.detune.value = Utils.scale(points[4].value(), 0, 1, -250, 250);
            this.oscF.detune.value = Utils.scale(points[5].value(), 0, 1, -500, 500);

            this.xmodGainA.gain.value = points[6].value() * 100000;
            this.xmodGainB.gain.value = points[7].value() * 100000;
            this.xmodGainC.gain.value = points[8].value() * 100000;
            this.xmodGainD.gain.value = points[9].value() * 100000;
            this.xmodGainE.gain.value = points[10].value() * 100000;
            this.xmodGainF.gain.value = points[11].value() * 100000;
            
            this.oscGainA.gain.value = Utils.scale(points[12].value(), 0, 1, 0.5, 1);
            this.oscGainB.gain.value = Utils.scale(points[13].value(), 0, 1, 0.5, 1);
            this.oscGainC.gain.value = Utils.scale(points[14].value(), 0, 1, 0, 0.75);
            
            this.hipass.frequency.value = Utils.scale(points[15].value(), 0, 1, 5, 10000);
            this.lowpass.frequency.value = Utils.scale(points[16].value(), 0, 1, 30, 5000);
            
            this.feedback.delayTime.value = Utils.scale(points[17].value(), 0, 1, 0, 0.5);
            this.feedbackGain.gain.value = Utils.scale(points[18].value(), 0, 1, 0.5, 1);
        };

        this.newTones = function(){
            this.oscA.frequency.value = Utils.rand(0, 150);
            this.oscB.frequency.value = Utils.rand(0, 1500);
            this.oscC.frequency.value = Utils.rand(0, 150);
            this.oscD.frequency.value = Utils.rand(0, 1500);
            this.oscE.frequency.value = Utils.rand(0, 150);
            this.oscF.frequency.value = Utils.rand(0, 15000);
        };

        this.play = function(){
            this.output.gain.setTargetValueAtTime(1, this.context.currentTime, 0.01);
        };

        this.stop = function(){
            this.output.gain.setTargetValueAtTime(0, this.context.currentTime, 0.1);
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
        if (!Nodes.context) setTimeout(function(){ $('#not-supported').fadeIn('slow'); }, 500);
        $('#tibersynth').length && new TiberSynth();
    });

})(jQuery, Raphael);
