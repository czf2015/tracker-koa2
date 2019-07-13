const Router = require('koa-router')
const Detail = require('../models/Detail.js')
const { query } = require('../middleware/receive.js')


const router = new Router({
  prefix: '/details'
})

router
  .get('/:id', query(Detail))


module.exports = router