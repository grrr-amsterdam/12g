#!/usr/bin/env node
/**
 * @author David Spreekmeester <david@grrr.nl>
 */


module.exports = {
    get: function() {
        var pjson = require('../../package.json');
        return pjson.version;
    }
};

