#!/usr/bin/env node
//var util = require('util')
var sc = require( 'subcommander' );
 
sc.command( 'version', {
    desc: 'display app\'s version',
    callback: function () {
        console.log( 'version' );
    }
} );
 
var srv = sc.command( 'server', {
        desc: 'handle the server'
    } )
    .option( 'port', {
        abbr: 'p',
        desc: 'Server port',
        default: '8080'
    } )
    .option( 'hostname', {
        abbr: 'H',
        desc: 'Server hostname'
    } );
    
srv.command( 'start', {
    desc: 'start the server',
    callback: function ( options ) {
        var port = options.port,
            hostname = options.hostname;
 
        console.log( port, hostname );
    }
} );
 
srv.command( 'stop', {
    desc: 'stop the server',
    callback: function () {
        // callback body 
    }
} );
 
sc.parse();
