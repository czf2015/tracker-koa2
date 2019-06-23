const Router = require('koa-router')

const router = new Router()

router.get('/', async ctx => {
    ctx.body = {title: 'Example'}
})

module.exports = router