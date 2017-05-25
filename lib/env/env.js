#!/usr/bin/env node
/**
 * @author David Spreekmeester <david@grrr.nl>
 */
var envfile = require('envfile')
//var env = require('node-env-file');


var env = module.exports = {
    /**
     * Returns the current environment name
     * @return String
     */
    getName: function() {
        for (e in process.env) {
            if (
                e.slice(-4) === '_ENV' &&
                process.env[e]
            ) {
                /* @todo 
                 * This should not pick the first
                 * _ENV var it finds in the env.
                 */
                return process.env[e]
            }
        }
    },

    /**
     * Retrieves the environment variables as a Promise.
     * @return Promise
     */
    get: function() {
        return new Promise(function(resolve, reject) {
            var sourcePath = '.env'

            envfile.parseFile(sourcePath, function (err, obj) {
                if (err) reject(err)
                if (obj) resolve(env.stripQuotesIterate(obj))
            })
        })
    },

    stripQuotesIterate: function(obj) {
        for (var p in obj) {
            obj[p] = env.stripQuotes(obj[p])
        }

        return obj
    },

    stripQuotes: function(str) {
        var c1 = str.charAt(0)
        var ce = str.charAt(str.length - 1)

        if (
            (c1 === '"' && ce === '"') ||
            (c1 === "'" && ce === "'")
        ) {
            return str.substr(1, str.length - 2);
        } 

        return str
    }
    
};
