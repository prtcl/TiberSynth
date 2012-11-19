
(function(){

    var tibersynth = this,
        utils = tibersynth.utils;

    function GravityPoint (args) {
        var self = this;
        this.space = args.space || tibersynth.space;
        this.attrs = { value: utils.rand(0, 1), distance: 0 };
        this.position = { x: utils.rand(-1, 1), y: utils.rand(-1, 1) };
        this.calculateDistance();
        this.space.on('move', function(){
            self.calculateDistance();
        });
    }

    $.extend(GravityPoint.prototype, {
        attrs: null,
        space: null,
        position: null,
        value: function () {
            return this.attrs.value * utils.scale(this.attrs.distance, 0, 1, 1, 0);
        },
        distance: function () {
            return this.attrs.distance;
        },
        calculateDistance: function () {
            var x = (this.position.x - this.space.position.x),
                y = (this.position.y - this.space.position.y),
                distance = Math.sqrt((x * x) + (y * y)) / 2.01;
            this.attrs.distance = utils.constrain(distance);
            this.trigger('change');
            return this;
        },
        randomize: function () {
            this.attrs.value = utils.rand(0, 1);
            this.position.x = utils.rand(-1, 1);
            this.position.y = utils.rand(-1, 1);
            this.calculateDistance();
            return this;
        }
    });

    $.EventEmitter.extend(GravityPoint);

    tibersynth.space = {
        position: { x: 0, y: 0 },
        points: [],
        move: function (x, y) {
            this.position.x = x;
            this.position.y = y;
            this.trigger('move');
            return this;
        },
        addPoint: function () {
            var point = new GravityPoint({ space: this });
            this.points.push(point);
            this.trigger('add', point);
            return point;
        }
    };

    $.EventEmitter.extend(tibersynth.space);

    tibersynth.inits.push(function(){
        tibersynth.mouse.on('move', function(){
            var x = utils.scale(this.x, 0, 1, -1, 1),
                y = utils.scale(this.y, 0, 1, -1, 1);
            tibersynth.space.move(x, y);
            // console.log(tibersynth.space.position.x, tibersynth.space.position.y);
        });
        tibersynth.keyboard.on('down', function(key){
            if (key === 'R') tibersynth.space.points.forEach(function(point){ point.randomize(); });
        });
    });

}).apply(tibersynth);
