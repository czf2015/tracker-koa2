const passport = require('koa-passport')
const { Strategy } = require('passport-local')
const User = require('../models/User.js')

// Serialize user
passport.serializeUser((user, done) => done(null, user.id))
// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id)
  done(null, user)
})

// [passport-local](https://github.com/jaredhanson/passport-local)
passport.use(new Strategy((username, password, done) => {
  User.findOne({username}, (err, user) => {
    if (err) return done(err)
    if (!user) return done(null, false, '用户不存在')
    if (!user.verifyPassword(password)) return done(null, false, '密码错误')
    return done(null, user)
  })
}))

module.exports = passport