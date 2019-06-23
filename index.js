const Koa = require('koa')
const consola = require('consola')
const bodyParser = require('koa-bodyparser')
const session = require('koa-generic-session')
const mongoose = require('mongoose')
const config = require('./config.js')
// https://github.com/rkusa/koa-passport#usage
const passport = require('./utils/passport.js')
const home = require('./controllers/index.js')
const users = require('./controllers/users.js')

mongoose.connect(config.db, {
    useNewUrlParser: true
})

const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

const app = new Koa()
// [cookie]s(https://github.com/pillarjs/cookies#example)
app.proxy = true

app.use(home.routes())
    .use(home.allowedMethods())

app.use(users.routes())
    .use(users.allowedMethods())

app.use(bodyParser({
    extendTypes: ['json', 'form', 'text']
}))

// https://github.com/koajs/koa/blob/master/docs/api/index.md#appkeys
// These are passed to KeyGrip, however you may also pass your own KeyGrip instance. 
// app.keys = new KeyGrip(['im a newer secret', 'i like turtle'], 'sha256')
app.keys = config.keys
app.use(session(config.session))

app.use(passport.initialize())
app.use(passport.session())

app.listen(port, host)

consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
})
