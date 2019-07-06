const mongoose = require('mongoose')


const schema = new mongoose.Schema({
    id: String, 
    name: String,
    inventory: Number,
    used: Number
})


module.exports = mongoose.model('Wrap', schema)
