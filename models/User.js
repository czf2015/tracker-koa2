const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const SALT_WORK_FACTOR = 10
const MAX_LOGIN_ATTEMPTS = 5
const LOCK_TIME = 2 * 60 * 60 * 1000

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'user'
  },
  birthday: {
    type: Date
  },
  gender: {
    type: String,
  },
  weight: {
    type: Number
  },
  // interest: {
  //   type: [String]
  // },
  // education: {
  //   type: [String]
  // },
  // occupation: {
  //   type: [String]
  // },
  // phone: {
  //   type: Number,
  //   required: true,
  //   unique: true
  // },
  email: {
    type: String,
    required: true,
    // unique: true
  },
  password: {
    type: String,
    required: true
  },
  token: String,
  login_attempts: {
    type: Number,
    required: true,
    default: 0
  },
  lock_until: {
    type: Date,
  },
  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    }
  }
})

// 增加虚拟字段
// Virtuals 是 document 的属性，但是不会被保存到 MongoDB。 getter 可以用于格式化和组合字段数据， setter 可以很方便地分解一个值到多个字段。
schema.virtual('isLocked').get(function() {
  return !!(this.lock_until && this.lock_until > Date.now())
})

schema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }

  next()
})
// 
schema.pre('save', function (next) {
  if (!this.isModified('password')) return next()
  // 加盐
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err)
    // 哈希
    bcrypt.hash(this.password, salt, (error, hash) => {
      if (error) return next(error)
      this.password = hash
      next()
    })
  })
})
// 实例方法
schema.methods = {
  comparePassword(_password, password) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(_password, password, (err, isMatch) => {
        if (!err) {
          resolve(isMatch)
        } else {
          reject(err)
        }
      })
    })
  },
  incLoginAttepts(user) {
    return new Promise((resolve, reject) => {
      if (this.lock_until && Date.now() > this.lock_until) {
        this.update({
          $set: {
            login_attempts: 1
          },
          $unset: {
            lock_until: 1
          }
        }, err => {
          if (!err) {
            resolve(true)
          } else {
            reject(err)
          }
        })
      } else {
        let updates = {
          $inc: {
            login_attempts: 1
          }
        }

        if (this.login_attempts + 1 >= MAX_LOGIN_ATTEMPTS && !this.isLocked) {
          updates.$set = {
            lock_until: Date.now() + LOCK_TIME
          }
        }

        this.update(updates, err => {
          if (!err) {
            resolve(true)
          } else {
            reject(err)
          }
        })
      }
    })
  },
  getToken() {
    const token = jwt.sign({
      username: this.username
    }, 'track', {
      expiresIn: 7200
    })

    return token
  },
  toJSON() {
    return {
      id: this.id,
      username: this.username
    }
  }
}

const User = mongoose.model('User', schema)

module.exports = User