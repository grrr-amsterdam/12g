#!/usr/bin/env node
var backup = require('./backup.js');
var migrate = require('./migrate.js');

module.exports = {
    commands: function(sc) {
        var input = sc.parse();

        var whichBackupSource = function() {
            if (2 in input) {
                return input[2];
            }
            if ('s' in input) {
                return input[s];
            }
            if ('source' in input) {
                return input[source];
            }
        };
        
        var dbc = sc.command('db', {
                desc: 'Handle database content'
            })
            .option( 'source', {
                abbr: 's',
                desc: 'Source environment',
                default: 'production'
            } )
            .option( 'destination', {
                abbr: 'd',
                desc: 'Destination environment',
                default: 'development'
            } );
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
                var source = whichBackupSource();
                console.log(source);
                backup.backup(source);
                // @todo
            }
        })
    }
};
