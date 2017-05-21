#!/usr/bin/env node
var mysqlDump = require('mysqldump');

module.exports = {
    backup: function() {
        console.log('Backing up database...');

        mysqlDump({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'test',
            dest:'./data.sql' // destination file 
        },function(err){
            // create data.sql file; 
        })
    }
};
