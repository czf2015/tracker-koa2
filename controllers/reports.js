const Router = require('koa-router')
const Report = require('../models/Report.js')

const router = new Router({
    prefix: '/reports'
  })

router.get('/:openid',async ctx => {
  try {
    const result = await Report.findOne(ctx.params)
    ctx.body = {status: 'success', result}
  } catch(err) {
    ctx.body = {status: 'fail', err}
  }
})

module.exports = router