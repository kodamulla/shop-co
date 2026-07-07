const Category = require('../models/categoryModel');

// 1. Create a Category (POST)
const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        
        // 👈 පින්තූරයක් තියෙනවා නම් Path එක ගන්නවා, නැත්නම් Default එක දානවා
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : "/Logoicon.png";

        const category = await Category.create({
            name,
            description,
            imageUrl // 👈 අලුතින් image එක database එකට යවනවා
        });
        
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 2. Get All Categories (GET)
const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({});
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 3. Update a Category (PUT)
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        let updateData = { ...req.body };

        // 👈 Edit කරද්දී අලුතින් පින්තූරයක් දැම්මොත් ඒක අල්ලගන්නවා
        if (req.file) {
            updateData.imageUrl = `/uploads/${req.file.filename}`;
        }

        const category = await Category.findByIdAndUpdate(id, updateData, { new: true });
        if (!category) return res.status(404).json({ message: 'Category not found' });
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 4. Delete a Category (DELETE)
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findByIdAndDelete(id);
        if (!category) return res.status(404).json({ message: 'Category not found' });
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createCategory, getCategories, updateCategory, deleteCategory };