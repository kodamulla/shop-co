const express = require('express');
const router = express.Router();
const {
    createCoupon,
    getCoupons,
    validateCoupon,
    deleteCoupon
} = require('../controllers/couponController');

// Manager endpoints
router.post('/create', createCoupon);
router.get('/', getCoupons);
router.delete('/:id', deleteCoupon);

// Customer endpoint 
router.post('/validate', validateCoupon);

module.exports = router;