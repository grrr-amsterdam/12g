#!/usr/bin/env node
/**
 * @author David Spreekmeester <david@grrr.nl>
 */
const mysqlDump = require('mysqldump');
const env = require('./../env/env.js');
var shell = require('shelljs');
 

module.exports = {
    backup: function(source) {
        //cli.info('Current env:')
        //cli.info(env.getName())

        //cli.info('Source env:')
        //cli.info(source);

        env.get().then(e => {
            mysqlDump({
                host: e.DB_HOST,
                user: e.DB_USER,
                password: e.DB_PASSWORD,
                database: e.DB_DATABASE,
                dest:'./data.sql' // destination file 
            }, function(err){
                ////// create data.sql file; 
            })
        })


    }
};
