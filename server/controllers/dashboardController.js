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

        const categoryData = await Product.aggregate([
            { $group: { _id: "$category", count: { $sum: 1 } } },
            { $project: { name: "$_id", value: "$count", _id: 0 } }
        ]);

        const topProducts = await Product.find().sort({ soldCount: -1 }).limit(4);

        // අලුත් Chart එකට අදාළ දත්ත (Store Visits vs Orders)
        const weeklyAnalytics = [
            { day: 'Mon', orders: 12, visits: 150 },
            { day: 'Tue', orders: 18, visits: 220 },
            { day: 'Wed', orders: 15, visits: 180 },
            { day: 'Thu', orders: 25, visits: 290 },
            { day: 'Fri', orders: 35, visits: 380 },
            { day: 'Sat', orders: 45, visits: 500 },
            { day: 'Sun', orders: 30, visits: 410 },
        ];

        res.status(200).json({
            success: true,
            stats: { totalRevenue, totalOrders, activeProducts, totalCustomers },
            categoryData,
            topProducts,
            weeklyAnalytics // මේකත් යවනවා
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

module.exports = { getDashboardStats };