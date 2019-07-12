module.exports = (model, operation = 'findOne', handler = x => x) => {
    return async ctx => {
        // console.log(ctx.params)
        const result = await model[operation](ctx.params)
        ctx.body = {status: 'success', result: handler(result)}
    }
}