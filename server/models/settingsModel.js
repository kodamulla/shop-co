const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
    siteTitle: { type: String, default: "Shop.co" },
    bannerImages: [{ type: String }],
    maintenanceMode: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);