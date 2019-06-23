const net = require('net')


const chatServer = net.createServer()
const clientList = []
const cleanup = []
const chunk = []


chatServer.on('connection', client => {
    client.name = `${client.remoteAddress}: ${client.remotePort}`

    client.write('Hi!\n')

    clientList.push(client)

    client.on('data', d => {              
        clientList.forEach(clientItem => {
            if (clientItem !== client) {
                if (clientItem.writable) {
                    clientItem.write(`${client.name} says ${d}\n`)
                } else {
                    cleanup.push(clientItem)
                    clientItem.destory()
                }
            }
        })
        
        cleanup.forEach(clientItem => {
            clientList.splice(clientList.indexOf(clientItem), 1)
        })
    })

    client.on('end', () => {
        console.log(`${client.name} quit`)
        clientList.splice(clientList.indexOf(client), 1)
    })

    client.on('error', e => {
        console.error(e)
    })
})


chatServer.listen(9000)