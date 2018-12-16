
define(function (require) {

    var keymap = require('data/keymap');

    return new (Backbone.View.extend({
        el: window,
        events: { 'keydown': 'keyDown' },
        keyDown: function (e) {
            var key = keymap[e.which];
            this.trigger('keydown', key);
        }
    }))();

});
