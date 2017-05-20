#!/usr/bin/env node
//var util = require('util')
var sc = require('subcommander');
var db = require('./lib/db.js');
 
sc.command( 'version', {
    desc: 'display app\'s version',
    callback: function () {
        // @todo: show package.json version
        console.log( 'version' );
    }
} );
 
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
        db.migrate();
        //var port = options.port,
        //hostname = options.hostname;
 
        //console.log( port, hostname );
    }
} );
 
dbc.command('backup', {
    desc: 'Backup a database',
    callback: function () {
        db.backup();
        // @todo
    }
} );
 
sc.parse();
