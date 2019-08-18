const fs = require('fs');

/**
 * 
 * @param {*} src 
 * @param {*} type 
 */
function find(src, reg) {
    const files = []

    const findFiles = (src) => {
        fs.readdirSync(src).forEach(path => {
            const _src = `${src}/${path}`;
            const stat = fs.statSync(_src);

            if (stat.isFile()) {
                if (path.match(reg)) {
                    files.push(_src);
                }
            } else {
                findFiles(_src);                
            }
        })
    }

    findFiles(src)

    return files
}

/**
 * 
 * @param {*} src 
 * @param {*} dst 
 */
function copy(src, dst) {
    fs.exists(dst, isExist => {
        if (isExist) {
            fs.readdir(src, (err, paths) => {
                if (err) throw err
                paths.forEach(path => {
                    const _src = `${src}/${path}`
                    const _dst = `${src}/${path}`
                    fs.stat(_src, (err, stat) => {
                        if (err) throw err
                        if (stat.isFile()) {
                            const readStream = fs.createReadStream(_src)
                            const writeStream = fs.createWriteStream(_dst)
                            readStream.pipe(writeStream)
                        } else {
                            copy(_src, _dst)
                        }
                    })
                })
            })
        }
    })
}

/**
 * 
 * @param {*} src 
 */
function remove(src) {
    if (fs.existsSync(src)) {
        fs.readdirSync(src).forEach(path => {
            const _src = `${src}/${path}`
            if (fs.statSync(_src).isFile()) {
                fs.unlinkSync(_src)
            } else {
                remove(_src)
            }
        })
    }

    fs.rmdirSync(src)
}

/**
 * 
 * @param {*} path 
 */
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

module.exports = {
    find,
    copy,
    remove,
    read,
}