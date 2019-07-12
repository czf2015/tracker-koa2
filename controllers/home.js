const Router = require('koa-router')
const receive = require('../middleware/receive.js')
const Assess = require('../models/Assess.js')

const router = new Router()

router.get('/', async ctx => {
    ctx.body = {title: 'Example'}
})

module.exports = router