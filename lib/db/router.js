#!/usr/bin/env node
const backup = require('./backup.js')
const migrate = require('./migrate.js')
const cli = require('cli')

module.exports = {
    commands: function(sc) {
        var input = sc.parse();

        var whichBackupSource = function() {
            if ('s' in input) {
                return input['s'];
            }
            if ('source' in input) {
                return input['source'];
            }
        };
        
        var dbc = sc.command('db', {
                desc: 'Handle database content'
            })
            .option( 'source', {
                abbr: 's',
                desc: 'Source environment'
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
                migrate.migrate()
                //var port = options.port,
                //hostname = options.hostname;
         
                //console.log( port, hostname );
            }
        });
         
        dbc.command('backup', {
            desc: 'Backup a database',
            callback: function (options) {
                //var source = whichBackupSource();
                if (!options.source) {
                    cli.error('Please provide the source')
                    this.usage()
                    process.exit(1)
                }

                backup.backup(options.source, dbc)
            }
        })
    }
};
