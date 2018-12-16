
define(function (require) {

    var template = require('text!templates/info-modal.hbs');

    return Backbone.View.extend({
        className: 'info-modal',
        template: Handlebars.compile(template),
        events: { 'click .play': 'play' },
        initialize: function () { this.render(); },
        render: function () {
            var html = this.template({});
            this.$el
                .hide()
                .html(html)
                .fadeIn(350);
            return this;
        },
        play: function () {
            this.$el.fadeOut(350);
            this.trigger('play');
            return false;
        }
    });

});
