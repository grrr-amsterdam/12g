#!/usr/bin/env node
//var util = require('util')
var sc = require('subcommander');
require('./lib/db/router.js').commands(sc);
require('./lib/env/router.js').commands(sc);
 
sc.option( 'help', {
    abbr: 'h',
    desc: 'Display help'
})

sc.command( 'version', {
    desc: 'display app\'s version',
    callback: function () {
        // @todo: show package.json version
        console.log( 'version' );
    }
})
  
sc.parse();
