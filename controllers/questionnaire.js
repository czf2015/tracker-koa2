const Router = require('koa-router')
const Questionnaire = require('../models/Questionnaire.js')

const router = new Router()

['questions', 'relations'].forEach(item => {
    router.get(`/questionnaire/${item}`, async ctx => {
        const results = await Questionnaire.findOne({}, {[item]: 1, _id: 0})
        ctx.body = {status: 'success', results}
    })
})

module.exports = router