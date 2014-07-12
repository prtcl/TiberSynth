
define(function (require) {

    var template = require('text!templates/control-bar.hbs');

    return Backbone.View.extend({
        className: 'control-bar',
        template: Handlebars.compile(template),
        events: {
            'mouseenter .toggle-slide': 'toggleSlide',
            'click .toggle-slide': 'toggleSlide'
        },
        initialize: function () {
            _.bindAll(this, 'toggleSlide');
            this.render();
        },
        render: function () {
            var html = this.template(this.model.toJSON());
            this.$el.empty()
                .append(html);
            this.ui = {
                toggleButton: $('.toggle-slide', this.el)
            };
            return this;
        },
        toggleSlide: function () {
            if (this.$el.hasClass('slide-out')) {
                this.$el.removeClass('slide-out');
                this.ui.toggleButton.html('&raquo;');
            } else {
                this.$el.addClass('slide-out');
                this.ui.toggleButton.html('&laquo;');
            }
            return this;
        }
    });

});
