#!/usr/bin/env node
/**
 * @author David Spreekmeester <david@grrr.nl>
 */

const _ = require('lodash')
const version = require('./lib/version/version.js')


/**
 * This method returns the cli arguments, to override Subcommander
 * @return string The cli arguments passed to this app
 */
function getArguments() {
    var args = []
    var baseCommandPos = false

    for (var i in process.argv) {
        if (
            baseCommandPos !== false &&
            i > (baseCommandPos)
        ) {
            args.push(process.argv[i])
        }

        if (
            (
                _.endsWith(process.argv[i], '.js') ||
                _.endsWith(process.argv[i], '12g')
            ) && baseCommandPos === false
        ) {
            // This is the executable or the entry node script
            baseCommandPos = Number(i)
        }
    }

    return args.join(' ')
}

var args = getArguments()
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
if (versionArgs.includes(args)) {
    console.log(version.get())
} else {
    sc.parse()
}
