#!/usr/bin/env node
/**
 * @author David Spreekmeester <david@grrr.nl>
 */
const template = require('12g-env-template')
const chalk = require('chalk')
const env = require('./env.js')
const envlist = require('./list.js')
const dotenv = require('12g-cleandotenv')

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

        sub.command('name', {
            desc: 'Display the current environment name',
            callback: function (options) {
                console.log(
                    chalk.bgGreen.black(env.getCurrentName())
                )
            }
        })

        sub.command('list', {
            desc: 'Display the environment variables',
            callback: function (options) {
                if (!options.target) {
                    console.log(
                        chalk.red('ERROR ') +
                        'For which target? Use the -t flag.'
                    )
                    process.exit(1)
                }

                envlist.list(options.target)
            }
        })
        .option( 'target', {
            abbr: 't',
            desc: 'Target environment'
        } )

    }
};