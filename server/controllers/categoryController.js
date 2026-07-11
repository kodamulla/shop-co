const Category = require('../models/categoryModel');
const supabase = require('../config/supabase'); // 👈 අලුත් Supabase Connection එක

// 1. Create a Category (POST)
const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        
        let imageUrl = "/Logoicon.png";
        
        // 👈 පින්තූරයක් තියෙනවා නම් Supabase එකට upload කරනවා
        if (req.file) {
            const fileName = `categories/${Date.now()}_${req.file.originalname.replace(/\s+/g, '_')}`;
            
            const { data, error } = await supabase.storage
                .from('shopco-images') // Bucket name එක
                .upload(fileName, req.file.buffer, {
                    contentType: req.file.mimetype,
                });
            
            if (error) throw error;
            
            const { data: publicUrlData } = supabase.storage
                .from('shopco-images')
                .getPublicUrl(fileName);
                
            imageUrl = publicUrlData.publicUrl;
        }

        const category = await Category.create({
            name,
            description,
            imageUrl
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

        // 👈 Edit කරද්දී අලුත් පින්තූරයක් දැම්මොත් ඒක Supabase යවනවා
        if (req.file) {
            const fileName = `categories/${Date.now()}_${req.file.originalname.replace(/\s+/g, '_')}`;
            
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