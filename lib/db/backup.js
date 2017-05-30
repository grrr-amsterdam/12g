#!/usr/bin/env node
/**
 * @author David Spreekmeester <david@grrr.nl>
 */
const mysqlDump     = require('mysqldump')
const env           = require('../env/env.js')
const shorthand     = require('../env/shorthand.js')
const shell         = require('shelljs')
const error         = require('../error.js')
const cap_config    = require('capistrano-config')
const fs            = require('fs')
const mysql         = require('mysql2');
const mysqlssh      = require('mysql-ssh');


var backup = module.exports = {

    sshConnected: false,

    dbUser: null,
    dbPass: null,
    dbName: null,
    dbHost: null,

    /**
     * @var ssh2.Client conn The SSH2 Connection
     */
    conn: null,

    /**
     * @var unknown sock The socket connection by net.createServer
     */
    sock: null,

    sshConfig: {},

    _getSshConfig: function() {
        return {
            host: backup.sshConfig.host,
            port: 22,
            username: backup.sshConfig.user,
            // @todo make key dynamic
            privateKey: fs.readFileSync(process.env.HOME + '/.ssh/id_rsa')
        }
    },

    backup: function(source) {
        source      = shorthand.expand(source)
        backup.sshConfig = cap_config.getConfig(source)

        env.get(source).then(envVars => {
            backup._connect(envVars)
        })
        .catch(err => {
            console.log(err.code)
            error.exit(err)
        })
    },

    _connect(envVars) {
        mysqlssh.connect(backup._getSshConfig(), backup._getDbConfig(envVars))
        .then(client => {
            backup._query(client)
            console.log('Backup module reports client to be ready')
        })
        .catch(err => {
            console.log('Backup module caught an error.')
            console.log(err)
        })
    },

    _query: function(client) {
        //client.query('SELECT * FROM `calefax_users`', function (err, results, fields) {
        client.query('SELECT * FROM `wp_users`', function (err, results, fields) {
            if (err) throw err
            console.log(results[0]); // results contains rows returned by server 
            //console.log(fields); // fields contains extra meta data about results, if available 
            mysqlssh.close()
        })
    },

    _getDbConfig: function(envVars) {
        return {
            user: envVars.DB_USER,
            password: envVars.DB_PASSWORD,
            host: envVars.DB_HOST,
            database: envVars.DB_DATABASE 
                ? envVars.DB_DATABASE
                : envVars.DB_NAME
        }
    },

};

//mysqlDump({
    //host: e.DB_HOST,
    //user: e.DB_USER,
    //password: e.DB_PASSWORD,
    //database: db,
    //dest:'./backup.sql' // destination file 
//}, function(err){
    //error.exit(err)
//})
