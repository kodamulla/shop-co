const Coupon = require('../models/couponModel');

// 1. Create a new coupon (Manager)
const createCoupon = async (req, res) => {
    try {
        const { code, discount, expiryDate } = req.body;

        
        const existingCoupon = await Coupon.findOne({ code: code.toUpperCase() });
        if (existingCoupon) {
            return res.status(400).json({ message: 'Me coupon code eka kalin pawichi karala thiyenne!' });
        }

        const coupon = await Coupon.create({
            code,
            discount,
            expiryDate
        });

        res.status(201).json({ message: 'Coupon created successfully', coupon });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 2. Get all coupons (Manager Dashboard)
const getCoupons = async (req, res) => {
    try {
        // Aluthma ewa udata enna sort karala gannawa (-1)
        const coupons = await Coupon.find().sort({ createdAt: -1 });
        res.status(200).json(coupons);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 3. Validate a coupon (Customer Checkout)
const validateCoupon = async (req, res) => {
    try {
        const { code } = req.body;

        const coupon = await Coupon.findOne({ 
            code: code.toUpperCase(),
            isActive: true 
        });

        if (!coupon) {
            return res.status(404).json({ message: 'Invalid or inactive coupon code' });
        }

        
        if (new Date(coupon.expiryDate) < new Date()) {
            return res.status(400).json({ message: 'This coupon has expired!' });
        }

        res.status(200).json({
            code: coupon.code,
            discount: coupon.discount,
            message: `Coupon applied! You get ${coupon.discount}% off.`
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 4. Delete a coupon (Manager)
const deleteCoupon = async (req, res) => {
    try {
        const coupon = await Coupon.findByIdAndDelete(req.params.id);
        if (!coupon) {
            return res.status(404).json({ message: 'Coupon not found' });
        }
        res.status(200).json({ message: 'Coupon deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createCoupon,
    getCoupons,
    validateCoupon,
    deleteCoupon
};