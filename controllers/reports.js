const Router = require('koa-router')
const receive = require('../middleware/receive.js')
const Report = require('../models/Report.js')

const router = new Router({
    prefix: '/reports'
  })

router.get('/:openid', receive(Report))

module.exports = router