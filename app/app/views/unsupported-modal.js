
define(function (require) {

    var template = require('text!templates/unsupported-modal.hbs');

    return Backbone.View.extend({
        className: 'unsupported-modal',
        template: Handlebars.compile(template),
        render: function () {
            var html = this.template({});
            this.$el
                .hide()
                .html(html)
                .fadeIn(250);
            return this;
        }
    });

});
