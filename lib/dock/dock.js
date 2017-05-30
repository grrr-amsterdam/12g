#!/usr/bin/env node
/**
 * @author David Spreekmeester <david@grrr.nl>
 */

const shell = require('shelljs')
const path  = require('path')

var dock = {

    /**
     * @param string    args        The arguments passed to the 'dock' subcommand
     * @param bool      execute     Whether to execute the command, or to return it
     *                              (for unit testing)
     */
    dock: function(args, execute = true) {
        /**
         */
        var cmd = 'docker exec -it '
            + dock._stripDashes(dock._getDirName())
            + '_web_1 '
            + args

        if (execute) {
            shell.exec(cmd, function(code, stdout, stderr) {
                if (code != 0) {
                    // @todo error handling
                    console.log('Program stderr:', stderr);
                }
            });
            return
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
