const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    user_id: { type: mongoose.Types.ObjectId, ref: 'User' },
    name: String,
    code: String,
    gender: {
        type: Number,
        default: 0 // { 0: '未知', 1: '男', 2: '女' }
    },
    birthday: Date,
    nation: String,
    address: String,
})


module.exports = mongoose.model('Identity', schema)
