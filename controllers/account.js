const Router = require('koa-router')
const Redis = require('koa-redis')
// [郵箱驗證](https://nodemailer.com/about/)
// [短信驗證](https://blog.csdn.net/ziwoods/article/details/77878594?utm_source=blogxgwz2)
const nodemailer = require('nodemailer')
// https://github.com/rkusa/koa-passport
const passport = require('../utils/passport.js')
const axios = require('../utils/axios.js')
const { smtp } = require('../config.js')
const User = require('../models/User.js')

const router = new Router({
  prefix: '/account'
})

const redisStore = new Redis().client

router.post('/register', async ctx => {
  // ctx.request.body
  const {username, password, email, code} = ctx.request.body

  if (code) {
    const saveCode = await redisStore.hget(`nodemail:${username}`, 'code')
    const saveExpire = await redisStore.hget(`nodemail:${username}`, 'expire')

    if (code === saveCode) {
      if (new Date().getTime() > saveExpire) {
        ctx.body = {
          code: -1,
          msg: '验证码已过期，请重新尝试'
        }
        return false
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '请填写正确的验证码'
      }
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '请填写验证码'
    }
  }

  const user = await User.find({
    username
  })

  if (user.length) {
    ctx.body = {
      code: -1,
      msg: '已被注册'
    }
    return
  }
  // 创建新账户
  const newUser = await User.create({
    username,
    password,
    email
  })

  if (!newUser) {
    ctx.body = {
      code: -1, 
      msg: '注册失败'
    }
  } else {
    axios.post('/account/login', {
      username,
      password
    }).then(res => {
      if (res.data && res.data.code === 0) {
        ctx.body = {
          code: 0,
          msg: '注册成功',
          username: res.data.username
        }
      } else {
        ctx.body = {
          code: -1,
          msg: res.data.msg
        }
      }
    })
  }
})


router.post('/login', (ctx, next) => {
  return passport.authenticate('local', (err, username, info, status) => {
    if (err) {
      ctx.body = {
        code: -1,
        msg: err
      }
    } else {
      if (username) {
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
  })(ctx, next)
})


router.post('/verify', async (ctx, next) => {
  const {username, email} = ctx.request.body
  const saveExpire = await redisStore.hget(`nodemail:${username}`, 'expire')

  if (saveExpire && new Date().getTime() < saveExpire) {
    ctx.body = {
      code: -1,
      msg: '验证请求过于频繁，1分钟内1次'
    }
    return false
  }

  // https://github.com/nodemailer/nodemailer/blob/master/examples/oauth2.js
  const {host, user, pass, expire, code} = smtp
  
  const transporter = nodemailer.createTransport({
    host,
    auth: {
      user,
      pass
    }
  })
 
  const info = {
    from: `"认证邮件" <${user}>`,
    to: email,
    subject: 'track注册码',
    html: `您在"track网站"中注册，您的邀请码是${code}`
  }

  await transporter.sendMail(info, (err, info) => {
    if (err) return

    redisStore.hmset(`nodemail:${username}`, {expire, code})

    transporter.close()
  })

  ctx.body = {
    code: 0,
    msg: '验证码已发送，可能会有延时，有效期1分钟'
  }
})


router.get('/logout', ctx => {
  ctx.logout()
  ctx.redirect('/')
})


router.get('/getUser', ctx => {
  if (ctx.isAuthenticated()) {
    const {username, email} = ctx.session.passport.user
    ctx.body = {  
      username,
      email
    }
  } else {
    ctx.body = {
      username: '',
      email: ''
    }
  }
})


module.exports = router