
(function(){

    var tibersynth = this,
        utils = tibersynth.utils;
        
    var nodes = tibersynth.nodes = {};

    nodes.oscA = utils.createNode('oscillator', { type: 'square', frequency: utils.rand(0, 100) });
    nodes.oscB = utils.createNode('oscillator', { type: 'sine', frequency: utils.rand(0, 1500) });
    nodes.oscC = utils.createNode('oscillator', { type: 'saw', frequency: utils.rand(0, 150) });
    nodes.oscD = utils.createNode('oscillator', { type: 'saw', frequency: utils.rand(0, 1500) });
    nodes.oscE = utils.createNode('oscillator', { type: 'sine', frequency: utils.rand(0, 150) });
    nodes.oscF = utils.createNode('oscillator', { type: 'square', frequency: utils.rand(0, 15000) });
    nodes.xmodGainA = utils.createNode('gain');
    nodes.xmodGainB = utils.createNode('gain');
    nodes.xmodGainC = utils.createNode('gain');
    nodes.xmodGainD = utils.createNode('gain');
    nodes.xmodGainE = utils.createNode('gain');
    nodes.xmodGainF = utils.createNode('gain');
    nodes.oscGainA = utils.createNode('gain');
    nodes.oscGainB = utils.createNode('gain');
    nodes.oscGainC = utils.createNode('gain');
    nodes.oscPanA = utils.createNode('panner', { x: -0.5, y: 0.1, z: 0 });
    nodes.oscPanB = utils.createNode('panner', { x: 0.5, y: 0.1, z: 0 });
    nodes.oscPanC = utils.createNode('panner', { x: -0.005, y: -0.1, z: 0});
    nodes.oscPanD = utils.createNode('panner', { x: 0.005, y: -0.1, z: 0 });
    nodes.oscPanE = utils.createNode('panner', { x: -0.05, y: -0.5, z: 0 });
    nodes.oscPanF = utils.createNode('panner', { x: 0.05, y: -0.5, z: 0 });
    nodes.preFilterCompressor = utils.createNode('compressor', { ratio: 15, threshold: -2, attack: 0.1, release: 0.25 });
    nodes.hipass = utils.createNode('filter', { type: 'hipass', frequency: 5, q: 0.95 });
    nodes.lowpass = utils.createNode('filter', { type: 'lowpass', frequency: 10000, q: 0.95 });
    nodes.feedback = utils.createNode('delay', { time: utils.rand(0, 1) });
    nodes.feedbackGain = utils.createNode('gain');
    nodes.feedbackCompressor = utils.createNode('compressor', { ratio: 20, threshold: -2, attack: 0.001, release: 0.001 });
    nodes.output = utils.createNode('gain');
    nodes.eqLow = utils.createNode('filter', { type: 'lowshelf', frequency: 80, q: 1, gain: -2 });
    nodes.eqLowMid = utils.createNode('filter', { type: 'peak', frequency: 350, q: 2.5, gain: -5 });
    nodes.eqHighMid = utils.createNode('filter', { type: 'peak', frequency: 4500, q: 0.5, gain: 1 });
    nodes.eqHigh = utils.createNode('filter', { type: 'highshelf', frequency: 8000, q: 1, gain: 15 });
    nodes.outputCompressor = utils.createNode('compressor', { ratio: 20, threshold: -10, attack: 0.1, release: 0.25 });
    // nodes.analyser = utils.createNode('analyser', { size: 512, max: 0 });

    nodes.oscB.connect(nodes.xmodGainA);
    nodes.xmodGainA.connect(nodes.oscA.frequency);
    nodes.oscA.connect(nodes.xmodGainB); 
    nodes.xmodGainB.connect(nodes.oscB.frequency); 
    nodes.oscD.connect(nodes.xmodGainC);
    nodes.xmodGainC.connect(nodes.oscC.frequency);
    nodes.oscC.connect(nodes.xmodGainD); 
    nodes.xmodGainD.connect(nodes.oscD.frequency);
    nodes.oscF.connect(nodes.xmodGainE);
    nodes.xmodGainE.connect(nodes.oscE.frequency);
    nodes.oscE.connect(nodes.xmodGainF); 
    nodes.xmodGainF.connect(nodes.oscF.frequency); 
    nodes.oscA.connect(nodes.oscPanA);
    nodes.oscB.connect(nodes.oscPanB);
    nodes.oscC.connect(nodes.oscPanC);
    nodes.oscD.connect(nodes.oscPanD);
    nodes.oscE.connect(nodes.oscPanE);
    nodes.oscF.connect(nodes.oscPanF);
    nodes.oscPanA.connect(nodes.oscGainA);
    nodes.oscPanB.connect(nodes.oscGainA);
    nodes.oscPanC.connect(nodes.oscGainB);
    nodes.oscPanD.connect(nodes.oscGainB);
    nodes.oscPanE.connect(nodes.oscGainC);
    nodes.oscPanF.connect(nodes.oscGainC);
    nodes.oscGainA.connect(nodes.preFilterCompressor);
    nodes.oscGainB.connect(nodes.preFilterCompressor);
    nodes.oscGainC.connect(nodes.preFilterCompressor);
    nodes.preFilterCompressor.connect(nodes.hipass);
    nodes.hipass.connect(nodes.lowpass);
    nodes.lowpass.connect(nodes.output);
    nodes.lowpass.connect(nodes.feedback);
    nodes.feedback.connect(nodes.feedbackGain);
    nodes.feedbackGain.connect(nodes.feedbackCompressor);
    nodes.feedbackCompressor.connect(nodes.hipass);
    nodes.output.connect(nodes.eqLow);
    nodes.eqLow.connect(nodes.eqLowMid);
    nodes.eqLowMid.connect(nodes.eqHighMid);
    nodes.eqHighMid.connect(nodes.eqHigh);
    nodes.eqHigh.connect(nodes.outputCompressor);
    nodes.outputCompressor.connect(tibersynth.context.destination);
    // nodes.analyser.connect(tibersynth.context.destination);

    tibersynth.inits.push(function(){
        var space = tibersynth.space;
        space.addPoint().on('change', function(){
            nodes.oscA.detune.value = utils.scale(this.value(), 0, 1, -500, 500);
        });
        space.addPoint().on('change', function(){
            nodes.oscB.detune.value = utils.scale(this.value(), 0, 1, -125, 125);
        });
        space.addPoint().on('change', function(){
            nodes.oscC.detune.value = utils.scale(this.value(), 0, 1, -250, 250);
        });
        space.addPoint().on('change', function(){
            nodes.oscD.detune.value = utils.scale(this.value(), 0, 1, -250, 250);
        });
        space.addPoint().on('change', function(){
            nodes.oscE.detune.value = utils.scale(this.value(), 0, 1, -250, 250);
        });
        space.addPoint().on('change', function(){
            nodes.oscF.detune.value = utils.scale(this.value(), 0, 1, -500, 500);
        });
        space.addPoint().on('change', function(){
            nodes.xmodGainA.gain.value = this.value() * 50000;
        });
        space.addPoint().on('change', function(){
            nodes.xmodGainB.gain.value = this.value() * 50000;
        });
        space.addPoint().on('change', function(){
            nodes.xmodGainC.gain.value = this.value() * 50000;
        });
        space.addPoint().on('change', function(){
            nodes.xmodGainD.gain.value = this.value() * 50000;
        });
        space.addPoint().on('change', function(){
            nodes.xmodGainE.gain.value = this.value() * 50000;
        });
        space.addPoint().on('change', function(){
            nodes.xmodGainF.gain.value = this.value() * 50000;
        });
        space.addPoint().on('change', function(){
            nodes.oscGainA.gain.value = utils.scale(utils.exp(this.value()), 0, 1, 0.5, 0.8);
        });
        space.addPoint().on('change', function(){
            nodes.oscGainB.gain.value = utils.scale(utils.exp(this.value()), 0, 1, 0.5, 0.8);
        });
        space.addPoint().on('change', function(){
            nodes.oscGainC.gain.value = utils.scale(utils.exp(this.value()), 0, 1, 0.2, 0.6);
        });
        space.addPoint().on('change', function(){
            nodes.hipass.frequency.value = utils.scale(this.value(), 0, 1, 5, 10000);
        });
        space.addPoint().on('change', function(){
            nodes.hipass.Q.value = utils.scale(this.value(), 0, 1, 0.7, 1.2);
        });
        space.addPoint().on('change', function(){
            nodes.lowpass.frequency.value = utils.scale(this.value(), 0, 1, 30, 5000);
        });
        space.addPoint().on('change', function(){
            nodes.lowpass.Q.value = utils.scale(this.value(), 0, 1, 0.7, 1.2);
        });
        space.addPoint().on('change', function(){
            nodes.feedback.delayTime.value = utils.scale(utils.exp(this.value()), 0, 1, 0.001, 0.5);
        });
        space.addPoint().on('change', function(){
            nodes.feedbackGain.gain.value = utils.scale(utils.exp(this.value()), 0, 1, 0.4, 0.85);
        });

        tibersynth.mouse.on('down', function(){
            var currentTime = tibersynth.context.currentTime;
            nodes.output.gain.setTargetValueAtTime(0.4, currentTime, 0.01);
        });
        tibersynth.mouse.on('up', function(){
            var currentTime = tibersynth.context.currentTime;
            nodes.output.gain.setTargetValueAtTime(0, currentTime, 0.1);
        });
        tibersynth.keyboard.on('down', function(key){
            if (key === 'R'){
                nodes.oscA.frequency.value = utils.rand(0, 150);
                nodes.oscB.frequency.value = utils.rand(0, 1500);
                nodes.oscC.frequency.value = utils.rand(0, 150);
                nodes.oscD.frequency.value = utils.rand(0, 1500);
                nodes.oscE.frequency.value = utils.rand(0, 150);
                nodes.oscF.frequency.value = utils.rand(0, 15000);
            }
        })
    });

}).apply(tibersynth);
