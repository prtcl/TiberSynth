
define(function (require) {

    var viewport = require('instances/viewport');

    return Backbone.View.extend({
        className: 'playing-surface',
        events: {
            'mousedown': 'mouseDown',
            'mouseup': 'mouseUp',
            'mousemove': 'trackMousePosition',
            'keydown': 'keyDown'
        },
        initialize: function () {
            this.listenTo(this.model, 'change', this.update, this);
            this.listenTo(viewport, 'resize', this.resize, this);
            this.draw();
        },
        mouseDown: function () {
            this.model.set('playing', true);
            this.trigger('play');
        },
        mouseUp: function () {
            this.model.set('playing', false);
            this.trigger('stop');
        },
        trackMousePosition: function (e) {
            var width = viewport.get('width'),
                height = viewport.get('height'),
                left = this.$el.offset().left,
                x = (e.pageX - left) / width,
                y = ((e.pageY - height) * -1) / height;
            x = plonk.scale(x, 0, 1, -1, 1);
            y = plonk.scale(y, 0, 1, -1, 1);
            this.model.move(x, y);
            return this;
        },
        resize: function () {
            var width = this.$el.width(),
                height = this.$el.height();
            this.svg
                .attr('width', width)
                .attr('height', height);
            this.x.range([0, width]);
            this.y.range([height, 0]);
            this.update();
            return this;
        },
        draw: function () {
            var width = this.$el.width(),
                height = this.$el.height();
            this.dl = d3.select(this.el);
            this.svg = this.dl.append('svg')
              .append('g')
                .attr('class', 'plot-container');
            this.svg.style('opacity', 0)
              .transition().duration(1000)
                .style('opacity', 1);
            this.x = d3.scale.linear()
                .domain([-1, 1])
                .range([0, width]);
            this.y = d3.scale.linear()
                .domain([-1, 1])
                .range([height, 0]);
            this.z = d3.scale.linear()
                .domain([0, 1])
                .range([4, 50]);
            return this;
        },
        update: function () {
            var data = this.model.points.toJSON(),
                x = this.x, y = this.y, z = this.z,
                points;
            function cx (d) { return x(d.x || 0); }
            function cy (d) { return y(d.y || 0); }
            function r (d) { return z(plonk.log(d.value)); }
            function opacity (d) { return plonk.log(plonk.scale(d.distance, 1, 0, 0.35, 0.8)); }
            points = this.svg.selectAll('.gravity-point')
                .data(data, function (d) { return d.label; });
            points.enter()
              .append('circle')
                .attr('class', 'gravity-point')
                .attr('cx', cx)
                .attr('cy', cy)
                .attr('r', r);
            points
                .attr('r', r)
                .style('opacity', opacity)
              .transition().duration(50)
                .attr('cx', cx)
                .attr('cy', cy);
            points.exit()
                .remove();
            return this;
        }
    });

});
