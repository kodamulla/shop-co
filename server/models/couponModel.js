const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: [true, 'Coupon code is required'],
        unique: true,
        uppercase: true, 
        trim: true
    },
    discount: {
        type: Number,
        required: [true, 'Discount percentage is required'],
        min: [1, 'Minimum discount is 1%'],
        max: [100, 'Maximum discount cannot exceed 100%']
    },
    expiryDate: {
        type: Date,
        required: [true, 'Expiry date is required']
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Coupon', couponSchema);