const Router = require('koa-router')
const register = require('../middleware/register.js')
const authorize = require('../middleware/authorize.js')
const verify = require('../middleware/verify.js')

const router = new Router({
  prefix: '/account'
})

router.post('/register', register)


router.post('/login', authorize)


router.post('/verify', verify)


router.get('/logout', ctx => {
  ctx.logout()
  ctx.redirect('/')
})


router.get('/user', ctx => {
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