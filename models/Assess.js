const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  precision: Number, // 射击准度
  accuracy: Number, // 瞄准精度
  deviation: Number, // 击发误差
  meta: {
    user_id: { type: mongoose.Types.ObjectId, ref: 'User' },
    groups: [String], // 群属(分隔符'-')
    region: String, // 地区(分隔符'-')
  }
})


module.exports = mongoose.model('Assess', schema)
