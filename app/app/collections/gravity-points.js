
define(function (require) {

    var GravityPoint = require('models/gravity-point');

    return Backbone.Collection.extend({
        model: GravityPoint
    });

});
