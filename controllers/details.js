const Router = require('koa-router')
const Detail = require('../models/Detail.js')

const router = new Router({
    prefix: '/details'
  })

router.get('/:id', async ctx => {
    console.log(ctx.params)
    const result = await Detail.findOne(ctx.params)
    ctx.body = {status: 'success', result}
})

module.exports = router