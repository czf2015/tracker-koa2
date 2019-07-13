const Router = require('koa-router')
const Questionnaire = require('../models/Questionnaire.js')
const query = require('../middleware/query.js')


const router = new Router()

router.get('/questionnaire', query(Questionnaire))


module.exports = router