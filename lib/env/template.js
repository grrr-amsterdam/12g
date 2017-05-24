#!/usr/bin/env node
/**
 * @author David Spreekmeester <david@grrr.nl>
 */
var fs = require('fs');
var chalk = require('chalk');

var template = module.exports = {
    /**
     * Create a .env.template from the .env file
     */
    srcPath: '.env',
    dstPath: '.env.template',

    create: function() {
        fs.readFile(this.srcPath, 'utf8', function (err, data) {
            if (err) throw err;
            fs.truncate(module.exports.dstPath, 0, (err) => {
                if (err) throw err;

                var writeLine = function(element) {
                    var split = element.split('=')
                    if (
                        split[0] == "" || 
                        typeof split[0] == "undefined"
                    ) {
                        fs.appendFileSync(
                            module.exports.dstPath, "\n"
                        )
                    } else {
                        var emptied = split[0]
                        split[1] ? emptied += "=" : true
                        emptied += "\n"

                        fs.appendFileSync(
                            module.exports.dstPath, emptied
                        )
                    }
                };
                data.toString().split('\n').forEach(writeLine)
            });
        });

        console.log(
            chalk.green('√') + ' Template created: ' +
            chalk.bgGreen.black(this.dstPath)
        )
    }
};
