const fs = require('fs');

/**
 * 
 * @param {*} src 
 * @param {*} type 
 */
export function find(src, type) {
    const files = []

    const findFiles = (src) => {
        fs.readdirSync(src).forEach(path => {
            const _src = `${src}/${path}`;
            const stat = fs.statSync(_src);

            if (stat.isFile()) {
                if (_src.endsWith(type)) {
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
export function copy(src, dst) {
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
export function remove(src) {
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