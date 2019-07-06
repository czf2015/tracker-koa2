const mongoose = require('mongoose')


const schema = new mongoose.Schema({
    user_id: { type: mongoose.Types.ObjectId, ref: 'User' },
    message: String,
    name: String,
    stack: String,
    timestamp: {
        type: Date,
        default: Date.now()
    }
})


module.exports = mongoose.model('Error', schema)
