#!/usr/bin/env node
/**
 * @author David Spreekmeester <david@grrr.nl>
 */
const mysqlDump = require('mysqldump');
const util = require('util');
const envfile = require('envfile')
const env = require('./../env/env.js');
const cli = require('cli');
const Q = require('q');
 
var config = {
    init: function() {
        var sourcePath = '.env'

        envfile.parseFile(sourcePath, function (err, obj) {
            if (!err) {
                config.env = obj
                //console.info('file parsed');
                //console.log(obj);
            };
        })
    },

    env: {},

    findHost: function() {
        //console.info('findhost');
        //console.info(this.env)
        return this.env
    }
};

module.exports = {
    backup: function(source) {
        cli.info('Current env:')
        cli.info(env.getName())

        cli.info('Source env:')
        cli.info(source);
        //return Q.fcall(config.init)
        //.then(config.findHost)

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
