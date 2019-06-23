const fs = require('fs')

const stream = fs.createReadStream('../README.md')

let spool = ''

stream.on('data', data => {
    spool += data
})

stream.on('end', data => {
    console.log(spool)
})