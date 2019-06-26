const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  precision: Number, // 射击准度
  accuracy: Number, // 瞄准精度
  deviation: Number, // 击发误差
  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    region: String, // 地区(分隔符'-')
    groups: [String], // 群属(分隔符'-')
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  }
})

const Assess = mongoose.model('Assess', schema)

module.exports = Assess