#!/usr/bin/env node
/**
 * @author David Spreekmeester <david@grrr.nl>
 */
const template  = require('12g-env-template')
const chalk     = require('chalk')
const env       = require('./env.js')
const lister    = require('./lister.js')
const retriever = require('./retriever.js')
const dotenv    = require('12g-cleandotenv')
const error     = require('../error.js')

const errorMsg  = {
    'env': 'For which environment? Use: -e [environment]',
    'var': 'Which environment variable? Use: --var [environment variable]'
};

const exitWithoutArg = function(options, arg) {
    if (!options[arg]) {
        console.log(chalk.red('ERROR ') + errorMsg[arg]);
        process.exit(1)
    }
};

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
                .then(success => {
                    console.log(
                        chalk.green('√') + ' Template created: ' +
                        chalk.bgGreen.black(template.dstPath)
                    )
                })
                .catch(err => {
                    console.log(err)
                })
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
                exitWithoutArg(options, 'env');

                retriever.retrieve(options.env)
                .then(result => {
                    console.log(lister.list(result, options.output))
                })
                .catch(err => {
                    error.exit(err)
                })
            }
        })
        .option('env', {
            abbr: 'e',
            desc: 'Target environment'
        })
        .option('output', {
            abbr: 'o',
            desc: 'Output format'
        })

        sub.command('get', {
            desc: 'Display an environment variable',
            callback: function (options) {
                exitWithoutArg(options, 'env');
                exitWithoutArg(options, 'var');

                retriever.retrieve(options.env)
                .then(result => {
                    result[options.var] = result[options.var] === undefined
                        ? ''
                        : result[options.var]
                    console.log(result[options.var]);
                })
                .catch(err => {
                    error.exit(err)
                })
            }
        })
        .option('env', {
            abbr: 'e',
            desc: 'Target environment'
        })
        .option('var', {
            desc: 'Environment variable'
        })
    }
};
