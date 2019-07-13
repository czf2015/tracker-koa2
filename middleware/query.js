module.exports = (model, all = false, prerequisite = {}, skip = 0, limit = 10, sort = {}) => {
    if (all) {
        return async ctx => {
            try {
                const results = await model.find(prerequisite).skip(skip).limit(limit).sort(sort)
                ctx.body = { status: 'success', results }
            } catch (err) {
                ctx.body = { status: 'success', err }
            }
        }
    } else {
        return async ctx => {
            try {
                const result = await model.findOne(ctx.params)
                ctx.body = { status: 'success', result }
            } catch (err) {
                ctx.body = { status: 'success', err }
            }
        }
    }
}
