const fs = require('fs')

function read(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(`${__dirname}/${path}`, 'utf-8', (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

read('./data/puzzleData.txt')
    .then(data => {
        const raws = data.split(/\r\n|\s/)
            .filter(item => item.length === 2)
        const colors = []
        for (let i = 0; i < raws.length; i += 4) {
            colors.push(`0x${raws[i]}${raws[i+1]}${raws[i+2]}${raws[i+3]}`)
        }
        console.log(colors.length)  
    })