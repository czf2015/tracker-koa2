const { EventEmitter } = require('events')

class Server extends EventEmitter {
    constructor() {
        console.log('init')
        super()
    }
}

console.log('before')
const server = new Server()
console.log('after')

server.on('abc', () => {
    console.log('abc')
})

server.emit('abc')