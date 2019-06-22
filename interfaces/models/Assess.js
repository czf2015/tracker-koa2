const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  precision: Number, // 射击准度
  accuracy: Number, // 瞄准精度
  deviation: Number, // 击发误差
  meta: {
    create_time: {
      type: Date,
      default: Date.now()
    },
    region: String, // 地区(分隔符'-')
    groups: [String], // 群属(分隔符'-')
    features: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Account' }]
  }
})

const Assess = mongoose.model('Assess', schema)

module.exports = Assess