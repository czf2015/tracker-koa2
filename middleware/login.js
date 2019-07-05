const passport = require('./passport.js')

module.exports = (ctx, next) => {
  passport.authenticate('local', (err, status, info) => {
    console.log(ctx)
    console.log(err, status, info)
    if (err) {
      ctx.body = {
        code: -1,
        msg: err
      }
    } else {
      if (status) {
        ctx.body = {
          code: 0,
          msg: '登录成功',
        }
        return ctx.login(status)
      } else {
        ctx.body = {
          code: 1,
          msg: info
        }
      }
    }
  })(ctx, next)
}