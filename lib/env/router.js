#!/usr/bin/env node
/**
 * @author David Spreekmeester <david@grrr.nl>
 */
const template = require('12g-env-template')
const chalk = require('chalk')

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
                console.log(
                    chalk.green('√') + ' Template created: ' +
                    chalk.bgGreen.black(template.dstPath)
                )
            }
        })
    }
};
