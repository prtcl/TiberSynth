
define(function (require){

    var _window = $(window);

    var viewport = new Backbone.Model({
        mobile: (window.hasOwnProperty('orientation') || Math.min(screen.width, screen.height) <= 800),
        screenX: Math.min(screen.width, screen.height),
        screenY: Math.max(screen.width, screen.height),
        width: _window.width(),
        height: _window.height()
    });

    _window.on('resize', _.debounce(function () {
        viewport
            .set({ width: _window.width(), height: _window.height() })
            .trigger('resize');
    }, 50));

    return viewport;

});
