#!/usr/bin/env node
/**
 * @author David Spreekmeester <david@grrr.nl>
 */
const mysqlDump = require('mysqldump');
const util = require('util');
const envfile = require('envfile')
const env = require('./../env/env.js');
const cli = require('cli');
 
var config = {
    init: function() {
        return new Promise(function(resolve, reject) {
            var sourcePath = '.env'

            envfile.parseFile(sourcePath, function (err, obj) {
                if (err) reject(err)
                if (obj) {
                    config.env = obj
                    console.info('file parsed');
                    resolve()
                }
            })
        })
    },

    env: {},

    findHost: function() {
        //console.info('findhost');
        console.info(config.env)
        return config.env
    }
};

module.exports = {
    backup: function(source) {
        cli.info('Current env:')
        cli.info(env.getName())

        cli.info('Source env:')
        cli.info(source);

        config.init().then(result => {
            config.findHost()
        })


        //mysqlDump({
            //host: 'localhost',
            //user: 'root',
            //password: '',
            //database: 'test',
            //dest:'./data.sql' // destination file 
        //},function(err){
            //// create data.sql file; 
        //})
    }
};
