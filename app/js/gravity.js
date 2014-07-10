
(function(){

    var tibersynth = this,
        utils = tibersynth.utils;

    var gravitySketch = new Processing.Sketch(function (processing) {

        var ps = processing,
            sketch = this;

        // var analyser = tibersynth.nodes.analyser,
        //     analyserData = new Uint8Array(analyser.frequencyBinCount),
        //     analyserRange = analyser.frequencyBinCount;

        function setup () {
            ps.frameRate(30);
            ps.background(236, 236, 236);
        }

        function drawPoint (point, i) {
            var value = point.value(),
                d = point.distance(),
                x = utils.scale(point.position.x, -1, 1, 0, ps.width),
                y = utils.scale(point.position.y, 1, -1, 0, ps.height),
                r = utils.scale(utils.exp(value), 0, 1, 3, 90),
                fo = utils.exp(utils.scale(d, 1, 0, 0.35, 1)) * 255,
                so = utils.exp(d) * 255;
            ps.fill(0, 0, 0, fo);
            ps.stroke(200, 219, 229, so);
            ps.ellipse(x, y, r, r);
            if (d < value && tibersynth.mouse.down){
                ps.stroke(255, 255, 255, fo);
                ps.line(ps.pmouseX, ps.pmouseY, x, y);
            }
        }

        function draw () {
            setTimeout(function(){
                ps.background(236, 236, 236);
                tibersynth.space.points.forEach(drawPoint);
                // analyser.getByteFrequencyData(analyserData);
            }, 0);
        }

        ps.setup = setup;
        ps.draw = draw;

    });

    gravitySketch.options.pauseOnBlur = true;

    tibersynth.inits.push(function(){
        var canvas = $('#space canvas#gravity');
        tibersynth.gravity = new Processing(canvas[0], gravitySketch);
        tibersynth.viewport.on('resize', function(){
            var width = this.width,
                height = this.height;
            canvas.css({ width: width, height: height });
            tibersynth.gravity.size(width, height);
        });
    });

}).apply(tibersynth);
