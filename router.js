#!/usr/bin/env node
/**
 * @author David Spreekmeester <david@grrr.nl>
 */

const version   = require('./lib/version/version.js')
const args      = require('./lib/arguments.js')


var sc = require('subcommander');
require('./lib/db/router.js').commands(sc);
require('./lib/env/router.js').commands(sc);
require('./lib/version/router.js').commands(sc);
require('./lib/dock/router.js').commands(sc);
 
sc.option( 'help', {
    abbr: 'h',
    desc: 'Display help'
})
.option('version', {
    abbr: 'v',
    desc: 'Display version'
})

var versionArgs = ['-v', '--v', '--version']
if (versionArgs.includes(args.get())) {
    console.log(version.get())
} else {
    sc.parse()
}
