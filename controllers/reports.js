const Router = require('koa-router')
const Report = require('../models/Report.js')
const { query } = require('../middleware/receive.js')

const router = new Router({
  prefix: '/reports'
})

router
  .get('/:openid', query(Report))
  .get('/', query(Report, true))


module.exports = router