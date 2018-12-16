
define(function (require) {

    var GravityPoint = require('models/gravity-point');

    return Backbone.Collection.extend({
        model: GravityPoint,
        serializeParams: function () {
            var data = {};
            this.each(function (model) {
                data[model.id] = model.get('value');
            });
            return data;
        }
    });

});
