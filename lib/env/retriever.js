#!/usr/bin/env node
/**
 * @author David Spreekmeester <david@grrr.nl>
 */
const env       = require('./env')
const shorthand = require('./shorthand')
const dotenv    = require('12g-cleandotenv')
const cap_wrap  = require('capistrano-ssh-wrapper')

var retriever = module.exports = {
    /**
     * Retrieves the variables in .env,
     * both local and remote.
     * @param string target The target environment
     * @return Promise
     */
    retrieve: function(target) {
        target = shorthand.expand(target)
        var capEnvPath = 'shared/.env'

        return new Promise(function(resolve, reject) {
            if (env.isRemote(target)) {
                cap_wrap.getFile(target, capEnvPath)
                .then(result => {
                    return resolve(dotenv.clean(result))
                })
                .catch(err => {
                    return reject(err)
                })

                return
            }

            dotenv.load().then(localEnv => {
                return resolve(localEnv)
            }).catch(err => {
                return reject(err)
            })
        })
    }
};
