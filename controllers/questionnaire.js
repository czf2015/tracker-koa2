const Router = require('koa-router')
const Questionnaire = require('../models/Questionnaire.js')

const router = new Router()

router.get('/questionnaire', async ctx => {
    const result = await Questionnaire.findOne()
    ctx.body = {status: 'success', result}
})

module.exports = router