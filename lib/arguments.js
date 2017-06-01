#!/usr/bin/env node
/**
 * @author David Spreekmeester <david@grrr.nl>
 */
const _         = require('lodash')

module.exports = {
    /**
     * This method returns the cli arguments, to override Subcommander
     * @return string The cli arguments passed to this app
     */
    get: function() {
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
}
