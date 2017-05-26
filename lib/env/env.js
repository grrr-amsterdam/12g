#!/usr/bin/env node
/**
 * @author David Spreekmeester <david@grrr.nl>
 */
//var envfile = require('envfile')
var dotenv = require('12g-cleandotenv')
//var env = require('node-env-file');
var Table = require('cli-table2');

var env = module.exports = {
    /**
     * Returns the current environment name
     * @return String
     */
    getCurrentName: function() {
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

    isLocal: function(target) {
        return target == env.getCurrentName()
    },

    isRemote: function(target) {
        return target != env.getCurrentName()
    }
};
