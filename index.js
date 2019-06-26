const Koa = require('koa')
const consola = require('consola')
const bodyParser = require('koa-bodyparser')
const session = require('koa-generic-session')
const config = require('./config.js')
// https://github.com/rkusa/koa-passport#usage
const passport = require('./middlewares/passport.js')
const home = require('./controllers/home.js')
const account = require('./controllers/account.js')

const app = new Koa()
// [cookie]s(https://github.com/pillarjs/cookies#example)
app.proxy = true

// https://github.com/koajs/koa/blob/master/docs/api/index.md#appkeys
// These are passed to KeyGrip, however you may also pass your own KeyGrip instance. 
// app.keys = new KeyGrip(['im a newer secret', 'i like turtle'], 'sha256')
app.keys = config.keys
app.use(session(config.session))

app.use(passport.initialize())
app.use(passport.session())

app.use(bodyParser({
    extendTypes: ['json', 'form', 'text']
}))


app.use(home.routes())
    .use(home.allowedMethods())

app.use(account.routes())
    .use(account.allowedMethods())

app.listen(config.port, config.host)

consola.ready({
    message: `Server listening on http://${config.host}:${config.port}`,
    badge: true
})
