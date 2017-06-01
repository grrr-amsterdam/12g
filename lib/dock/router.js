#!/usr/bin/env node
/**
 * @author David Spreekmeester <david@grrr.nl>
 */

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
