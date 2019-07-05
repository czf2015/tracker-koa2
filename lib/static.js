const fs = require('fs')

export default function (res, path, contentType, resCode = 200) {
    fs.readFile(__dirname + path, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' })
            res.end('500 - Internal Error')
        } else {
            res.writeHead(resCode, { 'Content-Type': contentType })
            res.end(data)
        }
    })
}