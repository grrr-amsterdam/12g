#!/usr/bin/env node
/**
 * @author David Spreekmeester <david@grrr.nl>
 */
var shorthand = module.exports = {

    /**
     * Expands a shorthand for the indicated environment.
     * 'p' becomes production
     * 's' becomes staging
     * 'i' becomes integration
     * 'd' becomes development
     * 't' becomes testing
     * @param string environment The target environment
     * @return string   The expanded target environment name.
     *                  Returns the original argument in case
     *                  the shorthand doesn't match.
     */
    expand: function(environment) {
        var shorthands = {
            p: 'production',
            s: 'staging',
            i: 'integration',
            d: 'development',
            t: 'testing'
        }

        if (environment in shorthands) {
            return shorthands[environment]
        }

        return environment
    }
};
