
define(function (require) {

    function calculateDistance (x, y) {
        var d = Math.sqrt((x * x) + (y * y)) / 2.01;
        return plonk.constrain(d, 0, 1);
    }

    return Backbone.Model.extend({
        idAttribute: 'label',
        defaults: { label: '', x: 0, y: 0, weight: 0, value: 0, distance: 0 },
        randomize: function () {
            this.set({
                x: plonk.rand(-1, 1),
                y: plonk.rand(-1, 1),
                weight: plonk.rand(0, 1)
            });
            return this;
        },
        calculateDistance: function (posX, posY) {
            var x = (this.get('x') - posX),
                y = (this.get('y') - posY),
                distance = calculateDistance(x, y),
                value = this.get('weight') * plonk.scale(distance, 0, 1, 1, 0);
            this.set({ distance: distance, value: value });
            return this;
        }
    });

});
