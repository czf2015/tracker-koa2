const assert = require('assert')

assert.equal(1, true, 'Truthy')

assert.notStrictEqual(0, false, 'Falsy')

assert.ok([] !== [], 'Truthy')

assert.notDeepEqual({x: {y: 1, z: 2}}, {x: {y: 1, z: 3}}, 'Falsy')

assert.throws(() => {
    // console.log('Throw errors')
    throw new Error('Not throw errors')
})

assert.doesNotThrow(() => {
    // console.log('Not throw errors')
    throw new Error('Throw errors')
})