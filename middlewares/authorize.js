const passport = require('./passport.js')

module.exports = (ctx, next) => {
    return passport.authenticate('local', (err, { username }, info, status) => {
      if (err) {
        ctx.body = {
          code: -1,
          msg: err
        }
      } else {
        if (user) {
          ctx.body = {
            code: 0,
            msg: '登录成功',
            username
          }
          return ctx.login()
        } else {
          ctx.body = {
            code: 1,
            msg: info
          }
        }
      }
    })
}