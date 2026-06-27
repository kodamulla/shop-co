const Order = require('../models/orderModel');
const Product = require('../models/Product');
const User = require('../models/userModel');

const getDashboardStats = async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments();
        const totalCustomers = await User.countDocuments({ role: 'user' });
        const activeProducts = await Product.countDocuments();
        
        const orders = await Order.find();
        const totalRevenue = orders.reduce((acc, order) => acc + (order.totalAmount || 0), 0);

        res.status(200).json({
            success: true,
            stats: { totalRevenue, totalOrders, activeProducts, totalCustomers }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

module.exports = { getDashboardStats };