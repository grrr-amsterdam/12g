#!/usr/bin/env node
/**
 * @author David Spreekmeester <david@grrr.nl>
 */
const dotenv    = require('12g-cleandotenv')
const cap_wrap  = require('capistrano-ssh-wrapper')

var env = module.exports = {
    /**
     * Retrieves the variables in .env,
     * both local and remote.
     * @param string target The target environment
     * @return Promise
     */
    get: function(target) {
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
    },

    /**
     * Returns the current environment name
     * @return String
     */
    getCurrentName: function() {
        for (e in process.env) {
            if (
                e.slice(-4) === '_ENV' &&
                process.env[e]
            ) {
                /* @todo 
                 * This should not pick the first
                 * _ENV var it finds in the env.
                 */
                return process.env[e]
            }
        }
    },

    /**
     * Returns whether this is a local environment
     * @param string target The target environment
     * @return bool
     */
    isLocal: function(target) {
        return target == env.getCurrentName()
    },

    /**
     * Returns whether this is a remote environment
     * @param string target The target environment
     * @return bool
     */
    isRemote: function(target) {
        return target != env.getCurrentName()
    }
};
