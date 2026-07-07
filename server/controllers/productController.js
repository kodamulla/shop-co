const Product = require('../models/Product');

// @desc    Create a new product
// @route   POST /api/products
// @access  Private/Manager
const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, sizes, countInStock } = req.body;
        
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : "/Logoicon.png";

        const product = new Product({
            name,
            description,
            price,
            category,
            sizes: typeof sizes === 'string' ? JSON.parse(sizes) : sizes,
            imageUrl,
            countInStock
        });

        const savedProduct = await product.save();
        res.status(201).json(savedProduct);

    } catch (error) {
        console.error("Backend Error:", error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({}); 
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a product
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        
        // පින්තූරයක් update වෙනවා නම් ඒක අල්ලගන්න
        let updateData = { ...req.body };
        if (req.file) {
            updateData.imageUrl = `/uploads/${req.file.filename}`;
        }
        
        // sizes string එකක් නම් array එකක් කරන්න
        if (updateData.sizes && typeof updateData.sizes === 'string') {
            updateData.sizes = JSON.parse(updateData.sizes);
        }

        const product = await Product.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createProduct, getProducts, updateProduct, deleteProduct };