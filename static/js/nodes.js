
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
    nodes.hipass = utils.createNode('filter', { type: 'hipass', frequency: 5 });
    nodes.lowpass = utils.createNode('filter', { type: 'lowpass', frequency: 10000 });
    nodes.feedback = utils.createNode('delay', { time: utils.rand(0, 1) });
    nodes.feedbackGain = utils.createNode('gain');
    nodes.feedbackCompressor = utils.createNode('compressor', { ratio: 10, threshold: 0, attack: 0.0005, release: 0.00005 });
    nodes.outputCompressor = utils.createNode('compressor', { ratio: 1.5, threshold: -1, attack: 0.1, release: 0.25 });
    nodes.output = utils.createNode('gain');
    nodes.analyser = utils.createNode('analyser', { size: 512, max: 0 });

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
    nodes.oscGainA.connect(nodes.hipass);
    nodes.oscGainB.connect(nodes.hipass);
    nodes.oscGainC.connect(nodes.hipass);
    nodes.hipass.connect(nodes.lowpass);
    nodes.lowpass.connect(nodes.output);
    nodes.lowpass.connect(nodes.feedback);
    nodes.feedback.connect(nodes.feedbackGain);
    nodes.feedbackGain.connect(nodes.feedbackCompressor);
    nodes.feedbackCompressor.connect(nodes.hipass);
    nodes.feedbackGain.connect(nodes.output);
    nodes.output.connect(nodes.outputCompressor);
    nodes.outputCompressor.connect(nodes.analyser);
    nodes.analyser.connect(tibersynth.context.destination);

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
            nodes.xmodGainA.gain.value = this.value() * 100000;
        });
        space.addPoint().on('change', function(){
            nodes.xmodGainB.gain.value = this.value() * 100000;
        });
        space.addPoint().on('change', function(){
            nodes.xmodGainC.gain.value = this.value() * 100000;
        });
        space.addPoint().on('change', function(){
            nodes.xmodGainD.gain.value = this.value() * 100000;
        });
        space.addPoint().on('change', function(){
            nodes.xmodGainE.gain.value = this.value() * 100000;
        });
        space.addPoint().on('change', function(){
            nodes.xmodGainF.gain.value = this.value() * 100000;
        });
        space.addPoint().on('change', function(){
            nodes.oscGainA.gain.value = utils.scale(this.value(), 0, 1, 0.5, 1);
        });
        space.addPoint().on('change', function(){
            nodes.oscGainB.gain.value = utils.scale(this.value(), 0, 1, 0.5, 1);
        });
        space.addPoint().on('change', function(){
            nodes.oscGainC.gain.value = utils.scale(this.value(), 0, 1, 0, 0.75);
        });
        space.addPoint().on('change', function(){
            nodes.hipass.frequency.value = utils.scale(this.value(), 0, 1, 5, 10000);
        });
        space.addPoint().on('change', function(){
            nodes.lowpass.frequency.value = utils.scale(this.value(), 0, 1, 30, 5000);
        });
        space.addPoint().on('change', function(){
            nodes.feedback.delayTime.value = utils.scale(this.value(), 0, 1, 0, 0.5);
        });
        space.addPoint().on('change', function(){
            nodes.feedbackGain.gain.value = utils.scale(this.value(), 0, 1, 0.5, 1);
        });

        tibersynth.mouse.on('down', function(){
            var currentTime = tibersynth.context.currentTime;
            nodes.output.gain.setTargetValueAtTime(1, currentTime, 0.01);
        });
        tibersynth.mouse.on('up', function(){
            var currentTime = tibersynth.context.currentTime;
            nodes.output.gain.setTargetValueAtTime(0, currentTime, 0.1);
        });
    });

}).apply(tibersynth);
