
const Koa = require('koa')
const consola = require('consola')
const bodyParser = require('koa-bodyparser')
const json = require('koa-json')
const session = require('koa-generic-session')
const Redis = require('koa-redis')
const mongoose = require('mongoose')
const config = require('./config.js')
// https://github.com/rkusa/koa-passport#usage
const passport = require('./utils/passport.js')
const users = require('./interfaces/users.js')

const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

const app = new Koa()
// [cookie]s(https://github.com/pillarjs/cookies#example)
app.proxy = true

app.use(users.routes())
    .use(users.allowedMethods())

app.use(bodyParser({
    extendTypes: ['json', 'form', 'text']
}))
app.use(json())

// https://github.com/koajs/koa/blob/master/docs/api/index.md#appkeys
// These are passed to KeyGrip, however you may also pass your own KeyGrip instance. 
// app.keys = new KeyGrip(['im a newer secret', 'i like turtle'], 'sha256')
app.keys = ['czf', 'secret']
app.use(session({ key: 'czf', prefix: 'czf:uid', store: new Redis() }))

app.use(passport.initialize())
app.use(passport.session())

mongoose.connect(config.db, {
    useNewUrlParser: true
})

app.listen(port, host)

consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
})
