const Order = require('../models/orderModel');

// @desc    Get all orders (Manager view)
// @route   GET /api/orders
const getOrders = async (req, res) => {
    try {
       
        const orders = await Order.find({}).populate('user', 'name email');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Orders ganna fail wuna', error: error.message });
    }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Me ID ekata adala Order eka hambawune naha' });
        }

        order.status = status;
        const updatedOrder = await order.save();

        res.status(200).json({
            message: 'Order status eka successfully update wuna',
            updatedOrder
        });
    } catch (error) {
        res.status(500).json({ message: 'Order status update karanna fail wuna', error: error.message });
    }
};

module.exports = {
    getOrders,
    updateOrderStatus
};