const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Category name is required'],
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: false
    },
    // 👈 මේ imageUrl කොටස අලුතින් එකතු කළා
    imageUrl: {
        type: String,
        default: "/Logoicon.png"
    }
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;