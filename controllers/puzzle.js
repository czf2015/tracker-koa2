const Router = require('koa-router')
const {read} = require('../utils/File.js')

const router = new Router()

router
    .get('/puzzle', async ctx => {
        await read('../test/data/puzzleData.txt')
            .then(data => {
                const raws = data.split(/\r\n|\s/)
                    .filter(item => item.length === 2)
                const colors = []
                for (let i = 0; i < raws.length; i += 4) {
                    colors.push(`#${raws[i]}${raws[i+1]}${raws[i+2]}${raws[i+3]}`)
                }
                ctx.body = colors
            })
    })

    
module.exports = router