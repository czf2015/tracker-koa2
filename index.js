const Koa = require('koa')
const consola = require('consola')
const bodyParser = require('koa-bodyparser')
const session = require('koa-generic-session')
const config = require('./config.js')
// https://github.com/rkusa/koa-passport#usage
const passport = require('./middlewares/passport.js')

const app = new Koa()
app.proxy = true
app.keys = config.keys

app.use(session(config.session))
app.use(passport.initialize())
app.use(passport.session())

app.use(bodyParser({
    extendTypes: ['json', 'form', 'text']
}))

require('fs').readdirSync(config.routers).forEach(item => {
    const router = require(`${config.routers}/${item}`)
    app.use(router.routes())
        .use(router.allowedMethods())
})

app.listen(config.port, config.host)

consola.ready({
    message: `Server listening on http://${config.host}:${config.port}`,
    badge: true
})
