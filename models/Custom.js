const mongoose = require('mongoose')


const nutritionSchema = new mongoose.Schema({
    id: String,
    dose: {
        unit: String,
        dose: Number
    },
    sku_price: Number, // 20
})

const customSchema = new mongoose.Schema({
    required: [nutritionSchema],
    options: [nutritionSchema],
    specify: Number, // 1,
    quantity: Number, // 3,
    name: String, // ted,
    remark: String, // "赠品要手袋，周末配送"
})


module.exports = mongoose.model('Custom', schema)