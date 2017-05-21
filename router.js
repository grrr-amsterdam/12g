#!/usr/bin/env node
//var util = require('util')
var sc = require('subcommander');
var db = require('./lib/db/router.js').commands(sc);
 
sc.command( 'version', {
    desc: 'display app\'s version',
    callback: function () {
        // @todo: show package.json version
        console.log( 'version' );
    }
} );
 
sc.parse();
