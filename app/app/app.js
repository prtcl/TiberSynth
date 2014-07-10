
define(function (require) {

    var isCompatibleBrowser = require('utils/is-compatible-browser');

    var app = {
        inits: $.Callbacks('once memory'),
        run: function (options) {
            if (!isCompatibleBrowser()) return this.failWithUnsupported();
            options || (options = {});
            this.inits.fire(options);
            return this;
        },
        failWithUnsupported: function () {

            return this;
        }
    };

    return app;

});
