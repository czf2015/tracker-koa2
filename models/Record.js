const mongoose = require('mongoose')

const infoSchema = new mongoose.Schema({
  mark: String,
  name: String,
  dir: String,
  description: String,
  category: String,
  product: String,
  platform: String,
  license: String,
  agency: String,
  vendor: String
})

const targetSchema = new mongoose.Schema({
  figure: {
    name: String,
    size: Number
  },
  init: {
    appear: Date,
    direction: {
      x: Number,
      y: Number
    },
    speed: Number
  },
  move: [{
    time: Date,
    position: {
      x: Number,
      y: Number
    }
  }],
  pause: [{
    time: Date,
    long: Date
  }],
  duration: Date,
})

const playerSchema = new mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' }, // 用户
  posture: String, // 姿势
  prop: Boolean, // 有无依托
  trace: [{
    time: Date,
    position: {
      x: Number,
      y: Number
    }
  }],
  fire: [{
    time: Date
  }], // 射击
  score: Number // 得分
})

const recordSchema = new mongoose.Schema({
  info: infoSchema,
  circumstance: {
    tag: String,
    img_url: String
  },
  weapon: {
    identifier: String,
    sight: Boolean,
    bullets: Number
  },
  targets: [targetSchema],
  players: [playerSchema]
})

const Record = mongoose.model('Record', recordSchema)

module.exports = Record