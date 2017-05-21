#!/usr/bin/env node
var backup = require('./backup.js');
var migrate = require('./migrate.js');

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
                migrate.migrate();
                //var port = options.port,
                //hostname = options.hostname;
         
                //console.log( port, hostname );
            }
        });
         
        dbc.command('backup', {
            desc: 'Backup a database',
            callback: function () {
                backup.backup();
                // @todo
            }
        });
    }
};
