
define(function (require) {

    var isCompatibleBrowser = require('utils/is-compatible-browser');

    var synthEngine = require('instances/synth-engine');

    var InfoModal = require('views/info-modal'),
        UnsupportedModal = require('views/unsupported-modal');

    var app = {
        ui: {
            container: '#container',
            modal: '#modal-container'
        },
        inits: $.Callbacks('once memory'),
        run: function (options) {
            options || (options = {});
            _.each(this.ui, function (id, name) {
                this.ui[name] = $(id);
            }, this);
            this.inits.fire(options);
            this.render();
            return this;
        },
        render: function () {
            if (!isCompatibleBrowser()) return this.failWithUnsupported();
            var infoModal = new InfoModal()
                .on('play', this.play, this)
                .render();
            this.ui.modal.append(infoModal.el);
            return this;
        },
        play: function () {
            synthEngine.connectRouting();
            return this;
        },
        failWithUnsupported: function () {
            var unsupportedModal = new UnsupportedModal()
                .render();
            this.ui.modal.append(unsupportedModal.el);
            return this;
        }
    };

    return app;

});
