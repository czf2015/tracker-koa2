const passport = require('./passport.js')

module.exports = (ctx, next) => {
  // 必须 return
  return passport.authenticate('local', (err, status, info) => {
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