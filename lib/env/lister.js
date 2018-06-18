#!/usr/bin/env node
/**
 * @author David Spreekmeester <david@grrr.nl>
 */
const Table     = require('cli-table3')
const env       = require('./env.js')

var lister = module.exports = {
    /**
     * Lists the environment variables in different formats.
     * @param Object vars    The environment variables
     * @param String format Output format (f.i. 'json')
     * @return String       Output
     */
    list: function(vars, format) {
        if (format == 'json') {
            return JSON.stringify(vars)
        }

        return lister._tablify(vars)
    },

    _tablify: function(obj) {
        var opts = {
            chars: {'mid': '', 'left-mid': '',
                'mid-mid': '', 'right-mid': ''
            }
        };
        var table = new Table(opts);
        var rows = []
        for (prop in obj) {
            var row = { [prop]: obj[prop]}
            table.push(row)
        }

        return table.toString()
    },
};

