const fs = require('fs')
const stream = require('stream')

const fileHandle = fs.readFile('error.js', (err, data) => {
    let spool = ''
    stream.on('data', data => {
        spool += data
    })
    stream.on('end', data => {
        console.log(spool)
    })
    // console.log(data)
})