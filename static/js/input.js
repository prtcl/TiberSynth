
(function(){

    var tibersynth = this;

    var KEYMAP = {
        '8': 'backspace',
        '9': 'tab',
        '13': 'enter',
        '16': 'shift',
        '17': 'control',
        '18': 'alt',
        '27': 'escape',
        '32': 'spacebar',
        '82': 'R'
    };

    tibersynth.viewport = { width: 0, height: 0, offset: {} };
    tibersynth.keyboard = {};
    tibersynth.mouse = { x: 0, y: 0, down: false };

    $.EventEmitter.extend(tibersynth.mouse);
    $.EventEmitter.extend(tibersynth.keyboard);

    tibersynth.inits.push(function(){
        var _window = $(window),
            space = $('#space');
        var eventHandlers = {
            resize: (function(){
                var timer;
                return function (e) {
                    timer && clearTimeout(timer);
                    timer = setTimeout(function() {
                        tibersynth.viewport.width = space.width();
                        tibersynth.viewport.height = space.height();
                        tibersynth.viewport.offset = space.offset();
                    }, 100);
                };
            })(),
            keydown: function (e) {
                var key = KEYMAP[e.which];
                key && tibersynth.keyboard.trigger('down', key);
            },
            keyup: function (e) {
                var key = KEYMAP[e.which];
                key && tibersynth.keyboard.trigger('up', key);
            },
            mousedown: function (e) {
                tibersynth.mouse.down = true;
                tibersynth.mouse.trigger('down');
            },
            mouseup: function (e) {
                tibersynth.mouse.down = false;
                tibersynth.mouse.trigger('up');
            },
            mousemove: function(e){
                setTimeout(function(){
                    var width = tibersynth.viewport.width,
                        height = tibersynth.viewport.height,
                        left = tibersynth.viewport.offset.left;
                    tibersynth.mouse.x = (e.pageX - left) / width;
                    tibersynth.mouse.y = ((e.pageY - height) * -1) / height;
                    tibersynth.mouse.trigger('move');
                }, 0);
            }
        };
        _window
            .on('resize', eventHandlers.resize)
            .on('keydown', eventHandlers.keydown)
            .on('keyup', eventHandlers.keyup)
            .trigger('resize');
        space
            .on('mousedown', eventHandlers.mousedown)
            .on('mouseup', eventHandlers.mouseup)
            .on('mousemove', eventHandlers.mousemove);
    });

}).apply(tibersynth);
