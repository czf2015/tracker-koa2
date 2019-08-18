const Router = require('koa-router')
const Assess = require('../models/Assess.js')

const router = new Router()

router
    .get('/refund', async ctx => {
        ctx.body = { page: 'refund' }
    })


module.exports = router