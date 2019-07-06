const Router = require('koa-router')
const Report = require('../models/Report.js')

const router = new Router({
    prefix: '/reports'
  })

router.get('/:openid', async ctx => {
    console.log(ctx.params)
    const result = await Report.findOne(ctx.params)
    ctx.body = {status: 'success', result}
})

module.exports = router