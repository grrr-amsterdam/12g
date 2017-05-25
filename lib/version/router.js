#!/usr/bin/env node
/**
 * @author David Spreekmeester <david@grrr.nl>
 */

module.exports = {
    commands: function(subcommander) {
        subcommander.command( 'version', {
            desc: 'Show the version number',
            callback: function () {
                var pjson = require('../../package.json');
                console.log(pjson.version);
            }
        })
    }
};
