const http = require('http')

const opts = {
    host: 'error', // 错误
    port: 80,
    path: '/'
}

const req = http.get(opts, res => {
    console.log('This will never get called')
})

req.on('error', e => {
    console.log('Got that pesky error trapped')
})