const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true, // e.g., T-Shirts, Jeans, Dresses
    },
    sizes: {
        type: [String], // e.g., ['S', 'M', 'L', 'XL']
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0,
    }
}, {
    timestamps: true // Item eka add karapu/update karapu welawa auto save wenawa
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;