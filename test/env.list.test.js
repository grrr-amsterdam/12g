#!/usr/bin/env node
/**
 * @author David Spreekmeester <david@grrr.nl>
 */

const assert    = require('assert');
const lister    = require('../lib/env/lister')
//const template  = require('12g-env-template');
//const fs        = require('fs');

//var srcPath     = __dirname + '/mocks/.env'
//var dstPath     = __dirname + '/mocks/.env.template'
//var shouldPath  = __dirname + '/mocks/.env.template.should'

describe('List', function() {
    var mockvars = {
        FOO: 'Foo',
        BAR: 'Bar'
    };

    describe('#env list', function() {
        it('should not return json', function() {
            var result = lister.list(mockvars)
            assert(typeof result !== 'object', 'Is not an object')
        })
    })

    describe('#env list --output=json', function() {
        it('should return a json list', function() {
            var result = lister.list(mockvars, 'json')
            assert.equal(result, '{"FOO":"Foo","BAR":"Bar"}', "Is valid JSON");
        })
    })
    //describe('#initialize', function() {
        //it('should have a mock .env file', function() {
            //assert(fs.statSync(srcPath).isFile())
        //})
    //})

    //describe('#create()', function() {
        //it('should create a template from an existing .env file', function() {
            //template.create(srcPath, dstPath)
            //.then(success => {
                //console.log(success)
                //assert(success, true);

                //var tplContent = fs.readFileSync(dstPath)
                    //.toString('utf8')
                //var tplShould = fs.readFileSync(shouldPath)
                    //.toString('utf8')
                //assert.equal(tplContent, tplShould)

                //fs.unlinkSync(dstPath)
            //})
        //})
    //})
})
