#!/usr/bin/env node
/**
 * @author David Spreekmeester <david@grrr.nl>
 */
const _ = require('lodash')

function getArguments() {
    var args = []
    var baseCommandPos = false

    for (var i in process.argv) {
        if (
            baseCommandPos !== false &&
            i > (baseCommandPos + 1)
        ) {
            args.push(process.argv[i])
        }

        if (
            (
                _.endsWith(process.argv[i], '.js') ||
                '12g' === process.argv[i]
            ) && baseCommandPos === false
        ) {
            // This is the executable or the entry node script
            baseCommandPos = Number(i)
        }
    }

    return args.join(' ')
}

module.exports = {
    commands: function(subcommander) {
        var dock = subcommander.command('dock', {
            desc: 'Docker Compose convenience method',
            callback: function (options) {
                var dock = require('./dock.js')
                dock(getArguments())
            }
        })
    }
};
