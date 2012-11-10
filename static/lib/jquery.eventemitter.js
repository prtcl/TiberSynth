// jQuery EventEmitter
// https://github.com/prtcl/jquery-eventemitter

(function($){

    function EventEmitter (args) {
        if (!(this instanceof EventEmitter)) return new EventEmitter(args);
        this._eventCallbacks = {};
    }

    EventEmitter.prototype = {
        on: function (name, callback) {
            if (!name || !$.isFunction(callback)) return this;
            var ec = (this._eventCallbacks || (this._eventCallbacks = {}));
            (ec[name] || (ec[name] = $.Callbacks())).add(callback);
            return this;
        },
        one: function (name, callback) {
            if (!name || !$.isFunction(callback)) return this;
            function once () {
                callback && callback.apply(this, arguments);
                this.off(name, once);
            }
            this.on(name, once);
            return this;
        },
        off: function (name, callback) {
            if (!name || !this._eventCallbacks) return this;
            var ec = this._eventCallbacks,
                c = ec[name];
            c && (callback ? c.remove(callback) : c.disable());
            return this;
        },
        trigger: function (name) {
            if (!name) return this;
            var ec = this._eventCallbacks || (this._eventCallbacks = {}),
                args = Array.prototype.slice.call(arguments, 1),
                callbacks = ec[name];
            callbacks && callbacks.fire.apply(this, args);
            return this;
        }
    };

    EventEmitter.extend = function (obj) {
        if (!obj) return false;
        var target;
        if ($.isPlainObject(obj)) {
            target = obj;
        } else if ($.isFunction(obj) && $.isPlainObject(obj.prototype)) {
            target = obj.prototype;
        }
        $.extend(target || {}, EventEmitter.prototype);
        return obj;
    };

    $.extend({
        EventEmitter: EventEmitter
    });

})(jQuery);