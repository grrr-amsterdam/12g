#!/usr/bin/env node
/**
 * @author David Spreekmeester <david@grrr.nl>
 */

const version = require('./version.js')


module.exports = {
    commands: function(subcommander) {
        subcommander.command( 'version', {
            desc: 'Show the version number',
            callback: function () {
                console.log(version.get());
            }
        })
    }
};
