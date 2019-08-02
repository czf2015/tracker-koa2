const Koa = require('koa')

const app = new Koa()

// 
app
    // logger
    .use(async (ctx, next) => {
        await next()
        const time = ctx.response.get('Response-Time')
        console.log(`${ctx.method} ${ctx.url} ${time}`)
    })
    // response-time
    .use(async (ctx, next) => {
        const start = Date.now()
        await next
        const duration = Date.now() - start
        ctx.set('Response-time', `${duration}ms`)
    })
    // response
    .use(async ctx => {
        ctx.body = 'Hello, World!'
        ctx.search
    })

app.listen(3000)