
define(function (require) {

    var GravityPoints = require('collections/gravity-points'),
        Patch = require('models/patch');

    return Backbone.Model.extend({
        defaults: { x: 0, y: 0 },
        constructor: function () {
            this.points = new GravityPoints();
            this.patch = new Patch();
            return Backbone.Model.apply(this, arguments);
        },
        initialize: function (args) {
            this.points.reset(args.points);
            this.patch.set(args.patch);
        },
        toJSON: function () {
            var attrs = _.clone(this.attributes);
            attrs.points = this.points.toJSON();
            attrs.patch = this.patch.toJSON();
            return attrs;
        },
        move: function (posX, posY) {
            this.set({ x: posX, y: posY });
            this.points.each(function (point) {
                point.calculateDistance(posX, posY);
            });
            return this;
        }
    });

});
