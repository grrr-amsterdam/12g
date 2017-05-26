#!/usr/bin/env node
/**
 * @author David Spreekmeester <david@grrr.nl>
 */
const mysqlDump = require('mysqldump');
const env       = require('../env/env.js');
const shell     = require('shelljs');
const error     = require('../error.js');
 

module.exports = {
    backup: function(source) {
        //cli.info('Current env:')
        //cli.info(env.getCurrentName())

        //cli.info('Source env:')
        //cli.info(source);


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
