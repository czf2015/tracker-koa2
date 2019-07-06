const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    user_id: { type: mongoose.Types.ObjectId, ref: 'User' },
    userName: String,
    postalCode: String,
    provinceName: String,
    cityName: String,
    countyName: String,
    detailInfo: String,
    nationalCode: String,
    telNumber: String,
})


module.exports = mongoose.model('Address', schema)
