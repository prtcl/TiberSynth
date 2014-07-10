
define(function (require) {

    return Backbone.Model.extend({
        defaults: {
            oscA_frequency: 0,
            oscB_frequency: 0,
            oscC_frequency: 0,
            oscD_frequency: 0,
            oscE_frequency: 0,
            oscF_frequency: 0,
            oscA_detune: 0,
            oscB_detune: 0,
            oscC_detune: 0,
            oscD_detune: 0,
            oscE_detune: 0,
            oscF_detune: 0,
            xmodGainA_gain: 0,
            xmodGainB_gain: 0,
            xmodGainC_gain: 0,
            xmodGainD_gain: 0,
            xmodGainE_gain: 0,
            xmodGainF_gain: 0,
            oscGainA_gain: 0,
            oscGainB_gain: 0,
            oscGainC_gain: 0,
            hipass_frequency: 0,
            hipass_Q: 0,
            lowpass_frequency: 0,
            lowpass_Q: 0,
            feedback_delay: 0,
            feedbackGain: 0
        }
    });

});
