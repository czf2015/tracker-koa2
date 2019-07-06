const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    "id": Number, // 12,
    "image": String, // "http://image.lemonbox.net/img/elements/element_12.png",
    "productName": String, // "Evening Primrose",
    "priceInfo": {
        "required": Number, // 12,
        "option": Number, // 12
    }
})


module.exports = mongoose.model('Product', schema)
