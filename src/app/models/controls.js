
define(function (require) {

    return Backbone.Model.extend({
        defaults: {
            filterRange: 80,
            noiseBalance: 80,
            feedbackEmphasis: 80
        }
    });

});
