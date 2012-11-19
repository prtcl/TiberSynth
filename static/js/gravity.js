
(function(){

    var tibersynth = this,
        utils = tibersynth.utils;

    function gravitySketch (processing) {

        var ps = processing,
            sketch = this;

        var analyser = tibersynth.nodes.analyser,
            analyserData = new Uint8Array(analyser.frequencyBinCount),
            analyserRange = analyser.frequencyBinCount;

        function setup () {
            ps.frameRate(30);
        }

        function drawPoint (point, i) {
            var value = point.value(),
                d = point.distance(),
                x = utils.scale(point.position.x, -1, 1, 0, ps.width),
                y = utils.scale(point.position.y, 1, -1, 0, ps.height),
                r = utils.scale(Math.pow(value, Math.log(8)), 0, 1, 1, 80),
                fo = utils.scale(d, 1, 0, 0, 255),
                so = d * 150;
            ps.fill(0, 0, 0, fo);
            ps.stroke(0, 0, 0, so);
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
                analyser.getByteFrequencyData(analyserData);
            }, 0);
        }

        ps.setup = setup;
        ps.draw = draw;

    }

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
