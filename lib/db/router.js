#!/usr/bin/env node
const backup = require('./backup.js')
const migrate = require('./migrate.js')
const cli = require('cli')

module.exports = {
    commands: function(subcommander) {
        var dbc = subcommander.command('db', {
                desc: 'Handle database content'
            })
        ;
            
        dbc.command('migrate', {
            desc: 'Migrate database content between environments',
            callback: function (options) {
                if (!options.source) {
                    cli.error('Please provide the source')
                    this.usage()
                    process.exit(1)
                }
                if (!options.destination) {
                    cli.error('Please provide the destination')
                    this.usage()
                    process.exit(1)
                }

                migrate.migrate(
                    options.source, options.destination
                )
            }
        })
        .option( 'source', {
            abbr: 's',
            desc: 'Source environment'
        } )
        .option( 'destination', {
            abbr: 'd',
            desc: 'Destination environment'
        } );
         
        dbc.command('backup', {
            desc: 'Backup a database',
            callback: function (options) {
                if (!options.source) {
                    cli.error('Please provide the source')
                    this.usage()
                    process.exit(1)
                }

                backup.backup(options.source, dbc)
            }
        })
        .option( 'source', {
            abbr: 's',
            desc: 'Source environment'
        } )

    }
};
