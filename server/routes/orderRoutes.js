const express = require('express');
const { getOrders, updateOrderStatus } = require('../controllers/orderController');

const router = express.Router();

const Order = require('../models/orderModel');


// Get all orders (Manager view)
router.get('/', getOrders);

// Update order status
router.put('/:id/status', updateOrderStatus);

module.exports = router;