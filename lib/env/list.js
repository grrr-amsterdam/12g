#!/usr/bin/env node
/**
 * @author David Spreekmeester <david@grrr.nl>
 */
const dotenv    = require('12g-cleandotenv')
const Table     = require('cli-table2')
const env       = require('./env.js')
const error     = require('../error.js')
const cap_wrap  = require('capistrano-ssh-wrapper')

var list = module.exports = {
    /**
     * Retrieves the environment variables as a Promise.
     * @param String target The target environment name
     *                      (f.i. 'staging')
     * @return Promise
     */
    list: function(target) {
        if (env.isRemote(target)) {
            cap_wrap.getFile(target, 'shared/.env')
            .then(result => {
                console.log(
                    list._tablify(dotenv.clean(result))
                )
            })
            .catch(err => {
                console.log('ERROR')
                console.log(err)
            })

            return
        }

        dotenv.load().then(e => {
            console.log(list._tablify(e))
        }).catch(err => {
            error.exit(
                err.code == 'ENOENT'
                ? 'No .env file was found.'
                : err.toString()
            )
        })

        return
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

