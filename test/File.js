const fs = require('fs')

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

const result = find(`${__dirname}/../utils`, /.js$/)

console.log(result, result.length)