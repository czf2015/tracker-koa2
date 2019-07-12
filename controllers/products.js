const Router = require('koa-router')
const receive = require('../middleware/receive.js')
const Product = require('../models/Product.js')

const router = new Router({
    prefix: '/products'
})

router
    .get('/', receive(Product, 'find'))
    .get('/:id', receive(Product))

module.exports = router