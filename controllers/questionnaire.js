const Router = require('koa-router')
const receive = require('../middleware/receive.js')
const Questionnaire = require('../models/Questionnaire.js')

const router = new Router()

router.get('/questionnaire', receive(Questionnaire))

module.exports = router