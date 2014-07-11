
define(function (require) {

    var isCompatibleBrowser = require('utils/is-compatible-browser');

    var keyboard = require('instances/keyboard'),
        synthEngine = require('instances/synth-engine');

    var Space = require('models/space');

    var InfoModal = require('views/info-modal'),
        UnsupportedModal = require('views/unsupported-modal'),
        PlayingSurface = require('views/playing-surface');

    var app = {
        ui: {
            container: '#container',
            sidebar: '#sidebar',
            playingSurface: '#playing-surface',
            modal: '#modal-container'
        },
        inits: $.Callbacks('once memory'),
        run: function (options) {
            options || (options = {});
            _.each(this.ui, function (id, name) {
                this.ui[name] = $(id);
            }, this);
            this.synthEngine = synthEngine;
            this.model = new Space();
            this.model.regenerate();
            this.inits.fire(options);
            this.render();
            return this;
        },
        render: function () {
            if (!isCompatibleBrowser()) return this.failWithUnsupported();
            var infoModal = new InfoModal()
                .on('play', this.play, this);
            this.ui.modal.append(infoModal.el);
            return this;
        },
        play: function () {
            synthEngine.connectNodes()
                .bindPatchRouting(this.model.patch);
            var playingSurface = new PlayingSurface({
                model: this.model,
                el: this.ui.playingSurface
            });
            playingSurface
                .on('play', synthEngine.play, synthEngine)
                .on('stop', synthEngine.stop, synthEngine);
            keyboard
                .on('keydown', function (key) {
                    if (key === 'R') {
                        this.model.regenerate();
                    } else if (key === 'Z') {
                        this.model.undo();
                    } else if (key === 'Y') {
                        this.model.redo();
                    }
                }, this);
            this.ui.sidebar.fadeIn(250);
            return this;
        },
        failWithUnsupported: function () {
            var unsupportedModal = new UnsupportedModal();
            this.ui.modal.append(unsupportedModal.el);
            return this;
        }
    };

    return app;

});
