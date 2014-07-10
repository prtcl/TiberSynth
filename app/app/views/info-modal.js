
define(function (require) {

    var template = require('text!templates/info-modal.hbs');

    return Backbone.View.extend({
        className: 'info-modal',
        template: Handlebars.compile(template),
        events: { 'click .play': 'play' },
        render: function () {
            var html = this.template({});
            this.$el
                .hide()
                .html(html)
                .fadeIn(250);
            return this;
        },
        play: function () {
            this.$el.fadeOut(250);
            this.trigger('play');
            return false;
        }
    });

});
