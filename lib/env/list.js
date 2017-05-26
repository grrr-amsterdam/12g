#!/usr/bin/env node
/**
 * @author David Spreekmeester <david@grrr.nl>
 */
//const dotenv    = require('12g-cleandotenv')
const Table     = require('cli-table2')
const env       = require('./env.js')
const error     = require('../error.js')

var list = module.exports = {
    /**
     * Retrieves the environment variables as a Promise.
     * @param String target The target environment name
     *                      (f.i. 'staging')
     * @return Promise
     */
    list: function(target) {
        var environment = env.get(target)
        .then(environment => {
            console.log(list._tablify(environment))
        })
        .catch(err => {
            console.log(err)
            error.exit('Could not find a .env file on ' + target)
        })
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

