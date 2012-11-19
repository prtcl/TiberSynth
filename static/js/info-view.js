
(function(){

    var tibersynth = this;

    tibersynth.infoView = {
        init: function (args) {
            var self = this;
            this.args = args || {};
            this.el = this.args.el;
            $('.play', this.el).on('click', function(){ self.close(); });
            return this;
        },
        render: function () {
            this.el.fadeIn('slow');
            return this;
        },
        close: function () {
            this.el.fadeOut('slow');
            return this;
        }
    };

    tibersynth.inits.push(function(){
        tibersynth.infoView.init({ el: $('#info-view') }).render();
    });

}).apply(tibersynth);