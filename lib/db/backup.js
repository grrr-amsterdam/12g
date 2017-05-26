#!/usr/bin/env node
/**
 * @author David Spreekmeester <david@grrr.nl>
 */
const mysqlDump = require('mysqldump');
const env       = require('../env/env.js');
const shorthand = require('../env/shorthand.js');
const shell     = require('shelljs');
const error     = require('../error.js');
 

module.exports = {
    backup: function(source) {
        source = shorthand.expand(source)

        env.get(source).then(e => {
            var db = e.DB_DATABASE 
                ? e.DB_DATABASE
                : e.DB_NAME

            mysqlDump({
                host: e.DB_HOST,
                user: e.DB_USER,
                password: e.DB_PASSWORD,
                database: db,
                dest:'./backup.sql' // destination file 
            }, function(err){
                error.exit(err)
            })
        })
        .catch(err => {
            error.exit(err)
        })
    }
};
