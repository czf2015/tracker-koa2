const fs = require('fs')

export default function (res, path, contentType, responseCode = 200) {
    fs.readFile(__dirname + path, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' })
            res.end('500 - Internal Error')
        } else {
            res.writeHead(responseCode, { 'Content-Type': contentType })
            res.end(data)
        }
    })
}