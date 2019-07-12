const Router = require('koa-router')
const receive = require('../middleware/receive.js')
const Detail = require('../models/Detail.js')

const router = new Router({
    prefix: '/details'
  })

router.get('/:id', receive(Detail))

module.exports = router