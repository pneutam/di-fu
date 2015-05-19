var VError = require('verror');
var fs = require('fs');
var path = require('path');
var _ = require('underscore');

function Helper() {
    var _this = this;

    /*
    _this.state = {
        component: 0,
        reference: 1,
        factory: 
    }
    */

    /*
    _this.wrapChain = function(fn, inner, outer) {
        return function() {
            fn.apply(inner);
            return outer;
        }
    }
    */

    _this.splitAt = function(text, delim, leftDefault, rightDefault) {
        if (_.isUndefined(text))
            throw new VError('splitAt: text not defined.')
        if (_.isUndefined(delim))
            throw new VError('splitAt: delim not defined.')
        if (_.isUndefined(leftDefault))
            leftDefault = '';
        if (_.isUndefined(rightDefault))
            rightDefault = text;
        var i = text.indexOf(delim);

        if (i < 0)
            return {
                left: leftDefault,
                right: rightDefault
            };
        else
            return {
                left: text.substr(0, i),
                right: text.substr(i + delim.length)
            };
    }

    _this.stem = function(p) {
        var s = path.basename(p);
        var e = path.extname(p);
        if (e.length > 0)
            s = s.substr(0, s.length - e.length);
        return s;
    }

    return _this;
}

module.exports = new Helper();