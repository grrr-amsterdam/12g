#!/usr/bin/env node
var assert = require('assert');
var env = require('node-env-file');
var cli = require('cli');
//var lodash = require('lodash');

process.env.FOO = "defaultfoo";
 
// Load any undefined ENV variables form a specified file. 
env('.env');
//env(__dirname + '/.env');
assert.equal(process.env.FOO, "defaultfoo");
assert.equal(process.env.BAR, "bar1");
assert.equal(process.env.BAZ, "1");
assert.equal(process.env.QUX, "");
assert.equal(process.env.QUUX, undefined);
 
// Load another ENV file - and overwrite any defined ENV variables. 
env('.env2', {overwrite: true});
assert.equal(process.env.FOO, "foo2");
assert.equal(process.env.BAR, "bar2");
assert.equal(process.env.BAZ, "2");
assert.equal(process.env.QUX, "");
assert.equal(process.env.QUUX, undefined);

exports.printMsg = function() {
    console.log("Hello world.");
}

cli.withStdinLines(function(lines, newline) {
    cli.info("Processing...");
    this.output(lines.sort().join(newline));
});
