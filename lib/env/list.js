#!/usr/bin/env node
/**
 * @author David Spreekmeester <david@grrr.nl>
 */
const dotenv    = require('12g-cleandotenv')
const Table     = require('cli-table2')
const env       = require('./env.js')
const error     = require('../error.js')
const cap       = require('../capistrano/capistrano.js')

var list = module.exports = {
    /**
     * Retrieves the environment variables as a Promise.
     * @param String target The target environment name
     *                      (f.i. 'staging')
     * @return Promise
     */
    list: function(target) {
        if (target == env.getCurrentName()) {
            dotenv.load().then(e => {
                console.log(list.tablify(e))
            }).catch(err => {
                error.exit(
                    err.code == 'ENOENT'
                    ? 'No .env file was found.'
                    : err.toString()
                )
            })

            return
        }

        // @todo: otherwise, fetch remotely
        console.log('other env')
        var ssh = cap.findSshConfig(target)
        if (ssh) {
            console.log(ssh)
        }
    },

    tablify: function(obj) {
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

