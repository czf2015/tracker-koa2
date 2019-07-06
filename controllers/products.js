const Router = require('koa-router')
const Product = require('../models/Product.js')

const router = new Router({
    prefix: '/products'
})

router
    .get('/', async ctx => {
        const results = await Product.find(ctx.params)
        ctx.body = { status: 'success', results }
    })
    .get('/:id', async ctx => {
        const result = await Product.findOne(ctx.params)
        ctx.body = { status: 'success', result }
    })

module.exports = router