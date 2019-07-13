const Router = require('koa-router')
const Assess = require('../models/Assess.js')

const router = new Router()

router
    .get('/', async ctx => {
        ctx.body = { title: 'Example' }
    })


module.exports = router