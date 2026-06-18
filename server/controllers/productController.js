const Product = require('../models/Product');

// @desc    Create a new product
// @route   POST /api/products
// @access  Private/Manager
const createProduct = async (req, res) => {
    try {
        // Frontend eken (hari Postman eken) ewena data tika ganna
        const { name, description, price, category, sizes, imageUrl, countInStock } = req.body;

        // Aluth product ekak hadanna
        const product = new Product({
            name,
            description,
            price,
            category,
            sizes,
            imageUrl,
            countInStock
        });

        // Eka Database eke save karanna
        const savedProduct = await product.save();
        
        // Save wechcha data eka return karanna
        res.status(201).json(savedProduct);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createProduct };