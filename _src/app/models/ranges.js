
define(function (require) {

    return Backbone.Model.extend({
        defaults: {
            hipass_frequency: [5, 5000],
            lowpass_frequency: [30, 10000],
            xmodAmount: 40000,
            feedback_delay: [0.001, 0.5],
            feedbackGain: [0.42, 0.9],
            oscGainA: [0.5, 0.8],
            oscGainB: [0.5, 0.8],
            oscGainC: [0.2, 0.6]
        }
    });

});
