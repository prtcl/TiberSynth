
define(function (require) {

    var template = require('text!templates/control-bar.hbs');

    return Backbone.View.extend({
        className: 'control-bar',
        template: Handlebars.compile(template),
        events: {
            'mouseleave': 'toggleSlide',
            'mouseenter .toggle-slide': 'toggleSlide',
            'change .range-slider': 'saveSliderValues'
        },
        ui: {
            toggleButton: '.toggle-slide',
            filterRange: '.filter-range',
            noiseBalance: '.noise-balance',
            feedbackEmphasis: '.feedback-emphasis'
        },
        initialize: function () {
            _.bindAll(this, 'toggleSlide');
            this.render();
        },
        render: function () {
            var html = this.template(this.model.toJSON());
            this.$el.empty()
                .append(html);
            _.each(this.ui, function (selector, name) {
                this.ui[name] = $(selector, this.el);
            }, this);
            return this;
        },
        toggleSlide: _.debounce(function () {
            if (this.$el.hasClass('slide-out')) {
                this.$el.removeClass('slide-out');
                this.ui.toggleButton.html('&raquo;');
            } else {
                this.$el.addClass('slide-out');
                this.ui.toggleButton.html('&laquo;');
            }
            return this;
        }, 100),
        serializeSliderData: function () {
            var data = {
                filterRange: Math.round(this.ui.filterRange.val()),
                noiseBalance: Math.round(this.ui.noiseBalance.val()),
                feedbackEmphasis: Math.round(this.ui.feedbackEmphasis.val())
            };
            return data;
        },
        saveSliderValues: function () {
            var data = this.serializeSliderData();
            this.model.set(data);
            return this;
        }
    });

});
