#!/usr/bin/env node
/**
 * @author David Spreekmeester <david@grrr.nl>
 */

const shell = require('shelljs')
const path  = require('path')
const spawn = require('child_process').spawn

var dock = {

    /**
     * @param string    args        The arguments passed to the 'dock' subcommand
     * @param bool      execute     Whether to execute the command, or to return it
     *                              (for unit testing)
     */
    dock: function(args, execute = true) {
        /**
         */
        var cmd = '/usr/local/bin/docker exec -it '
            + dock._stripDashes(dock._getDirName())
            + '_web_1 '
            + args

        if (execute) {
            return spawn('sh', ['-c', cmd], { stdio: 'inherit' })
        }

        return cmd
    },

    _stripDashes: function(str) {
        return str.replace('-', '')
    },

    _getDirName: function() {
        var pwd = shell.pwd().toString()
        var els = pwd.split(path.sep) 
        var dir = els[els.length - 1]
        return dir
    }
}

module.exports = dock.dock
