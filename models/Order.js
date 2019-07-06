const mongoose = require('mongoose')


const schema = new mongoose.Schema({
    status: String,
    custom_id: [{user_id: { type: mongoose.Types.ObjectId, ref: 'Custom' }}],
    coupon_id: { type: mongoose.Types.ObjectId, ref: 'Coupon' },
    logistics_id: { type: mongoose.Types.ObjectId, ref: 'Logistics' },
    cost: {
        price: Number,
        discount: Number,
        reduce: Number,
        logistic: Number,
        total: Number
    },
    timestamp: {
        type: Date,
        default: Date.now()
    }
})


module.exports = mongoose.model('Order', schema)