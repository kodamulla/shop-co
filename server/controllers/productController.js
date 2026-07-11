const Product = require('../models/Product');
const supabase = require('../config/supabase'); // 👈 අලුත් Supabase Connection එක

// @desc    Create a new product
// @route   POST /api/products
// @access  Private/Manager
const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, sizes, countInStock } = req.body;
        
        let imageUrl = "/Logoicon.png"; // Default image

        // 👈 ෆයිල් එකක් තියෙනවා නම් Supabase එකට upload කරනවා
        if (req.file) {
            // ෆයිල් එකට අලුත් නමක් හදනවා හැප්පෙන්නේ නැති වෙන්න
            const fileName = `products/${Date.now()}_${req.file.originalname.replace(/\s+/g, '_')}`;
            
            const { data, error } = await supabase.storage
                .from('shopco-images') // ඔයාගේ Bucket එකේ නම මෙතනට දෙන්න
                .upload(fileName, req.file.buffer, {
                    contentType: req.file.mimetype,
                });
            
            if (error) throw error;
            
            // Upload කරපු ෆයිල් එකේ Public URL එක ගන්නවා
            const { data: publicUrlData } = supabase.storage
                .from('shopco-images')
                .getPublicUrl(fileName);
                
            imageUrl = publicUrlData.publicUrl;
        }

        const product = new Product({
            name,
            description,
            price,
            category,
            sizes: typeof sizes === 'string' ? JSON.parse(sizes) : sizes,
            imageUrl, // 👈 දැන් මෙතන තියෙන්නේ Supabase එකෙන් ආපු URL එක
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
        let updateData = { ...req.body };
        
        // 👈 Edit කරද්දී අලුත් පින්තූරයක් දැම්මොත් Supabase එකට upload කරන්න
        if (req.file) {
            const fileName = `products/${Date.now()}_${req.file.originalname.replace(/\s+/g, '_')}`;
            
            const { data, error } = await supabase.storage
                .from('shopco-images') 
                .upload(fileName, req.file.buffer, {
                    contentType: req.file.mimetype,
                });
            
            if (error) throw error;
            
            const { data: publicUrlData } = supabase.storage
                .from('shopco-images')
                .getPublicUrl(fileName);
                
            updateData.imageUrl = publicUrlData.publicUrl;
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