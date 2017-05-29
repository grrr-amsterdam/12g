#!/usr/bin/env node
/**
 * @author David Spreekmeester <david@grrr.nl>
 */

const assert    = require('assert');
const template  = require('12g-env-template');
const fs        = require('fs');

var srcPath     = __dirname + '/mocks/.env'
var dstPath     = __dirname + '/mocks/.env.template'
var shouldPath  = __dirname + '/mocks/.env.template.should'

describe('Template', function() {
    describe('#initialize', function() {
        it('should have a mock .env file', function() {
            assert(fs.statSync(srcPath).isFile())
        })
    })

    describe('#create()', function() {
        it('should create a template from an existing .env file', function() {
            template.create(srcPath, dstPath)
            .then(success => {
                console.log(success)
                assert(success, true);

                var tplContent = fs.readFileSync(dstPath)
                    .toString('utf8')
                var tplShould = fs.readFileSync(shouldPath)
                    .toString('utf8')
                assert.equal(tplContent, tplShould)

                fs.unlinkSync(dstPath)
            })
        })
    })
})
