#!/usr/bin/env node
/**
 * @author David Spreekmeester <david@grrr.nl>
 */

var sc = require('subcommander');
require('./lib/db/router.js').commands(sc);
require('./lib/env/router.js').commands(sc);
require('./lib/version/router.js').commands(sc);
require('./lib/dock/router.js').commands(sc);
 
sc.option( 'help', {
    abbr: 'h',
    desc: 'Display help'
})

sc.parse();
