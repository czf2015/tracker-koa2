const net = require('net')

const chatServer = net.createServer()
const clientList = []
const cleanup = []

chatServer.on('connection', client => {
    client.name = `${client.remoteAddress}: ${client.remotePort}`

    client.write('Hi!\n')

    clientList.push(client)

    client.on('data', data => {              
        clientList.forEach(item => {
            if (item !== client) {
                if (item.writable) {
                    item.write(`${client.name} says ${data}\n`)
                } else {
                    cleanup.push(item)
                    item.destory()
                }
            }
        })
        
        cleanup.forEach(item => {
            clientList.splice(clientList.indexOf(item), 1)
        })
    })

    client.on('end', () => {
        console.log(`${client.name} quit`)
        clientList.splice(clientList.indexOf(client), 1)
    })

    client.on('error', err => {
        console.or(Error)
    })
})

chatServer.listen(9000)