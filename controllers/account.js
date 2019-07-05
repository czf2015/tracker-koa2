const Router = require('koa-router')
const register = require('../middleware/register.js')
const login = require('../middleware/login.js')
const logout = require('../middleware/logout.js')
const verify = require('../middleware/verify.js')
const authorize = require('../middleware/authorize.js')


const router = new Router({
  prefix: '/account'
})

router.post('/register', register)

router.post('/login', login)

router.get('/logout', logout)

router.post('/verify', verify)

router.get('/user', authorize)


module.exports = router