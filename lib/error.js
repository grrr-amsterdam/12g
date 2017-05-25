#!/usr/bin/env node
/**
 * @author David Spreekmeester <david@grrr.nl>
 */
var chalk = require('chalk')

module.exports = {
    exit: function(msg) {
        var output = chalk.bgRed(chalk.white('[ERROR]'))
            + ' ' + msg
        console.log(output)
        process.exit(1)
    }
};
