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

    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true, // Update wuna aluth data eka return karanna
      runValidators: true, // Schema eke rules check karanna
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