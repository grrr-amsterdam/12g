#!/usr/bin/env node
var mysqlDump = require('mysqldump');

module.exports = {
    commands: function(sc) {
        var dbc = sc.command('db', {
                desc: 'Handle database content'
            })
            /*
            .option( 'port', {
                abbr: 'p',
                desc: 'Server port',
                default: '8080'
            } )
            .option( 'hostname', {
                abbr: 'H',
                desc: 'Server hostname'
            } );
           */
        ;
            
        dbc.command('migrate', {
            desc: 'Migrate database content between environments',
            callback: function ( options ) {
                // @todo
                module.exports.migrate();
                //var port = options.port,
                //hostname = options.hostname;
         
                //console.log( port, hostname );
            }
        });
         
        dbc.command('backup', {
            desc: 'Backup a database',
            callback: function () {
                module.exports.backup();
                // @todo
            }
        });
    },

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
    },

    migrate: function() {
        console.log('Migrating database...');
    }
}
