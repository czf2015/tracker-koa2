const fs = require('fs');
const { join } = require('path')

class Folder {
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

module.exports = Folder
exports.folder = new Folder()

// const folder = new Folder()
// const files = folder.find(`${__dirname}/..`, 'md')
// console.log(files)