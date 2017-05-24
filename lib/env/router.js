#!/usr/bin/env node
/**
 * @author David Spreekmeester <david@grrr.nl>
 */
const template = require('./template')

module.exports = {
    commands: function(subcommander) {
        var sub = subcommander.command('env', {
                desc: 'Tools for environment contexts'
            })
        ;
            
        sub.command('template', {
            desc: 'Create a .env.template from an .env file',
            callback: function (options) {
                template.create()
            }
        })
    }
};
