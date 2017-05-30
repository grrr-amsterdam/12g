#!/usr/bin/env node
/**
 * @author David Spreekmeester <david@grrr.nl>
 */

const assert    = require('assert');
const _         = require('lodash')
const dock      = require('../lib/dock/dock.js')


describe('Dock', function() {
    describe('#dock', function() {
        it('should create a docker command', function() {
            var cmd = 'Bla bla -bla bla --1290 !#'
            var out = dock(cmd, false)

            assert(_.startsWith(out, 'docker exec -it'))
            assert(_.endsWith(out, cmd))
        })
    })
})

