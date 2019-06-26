const fs = require('fs');
const { join } = require('path')

class File {
    find(path, type) {
        const files = []
        const findFiles = (path) => {
            fs.readdirSync(path).forEach(item => {
                const fPath = join(path, item);
                const stat = fs.statSync(fPath);
                if (stat.isDirectory() === true) {
                    findFiles(fPath);
                } else {
                    if (item.split('.')[1] === type) {
                        files.push(fPath);
                    }
                }
            })
        }
        findFiles(path)
        return files
    }
}

const f = new File()
const files = f.find(`${__dirname}/..`, 'md')
console.log(files)