module.exports = {
  db: 'mongodb://127.0.0.1:27017/track',
  redis: {
    get host() {
      return '127.0.0.1'
    },
    get port() {
      return 6739
    }
  },
  smtp: {
    get host() {
      return 'smtp.qq.com'
    },
    get user() {
      return '122385930@qq.com'
    },
    get pass() {
      return 'ednnmccwxcbhbjic' // 邮箱设置里面
    },
    get code() {
      return Math.random().toString(16).slice(2, 6).toUpperCase()
    },
    get expire() {
      return new Date().getTime() + 60 * 1000
    }
  }
}