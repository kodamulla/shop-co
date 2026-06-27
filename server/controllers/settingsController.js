const Settings = require('../models/settingsModel'); 

const getSettings = async (req, res) => {
    try {
        const settings = await Settings.findOne();
        res.status(200).json(settings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching settings' });
    }
};

const updateSettings = async (req, res) => {
    try {
        const updatedSettings = await Settings.findOneAndUpdate({}, req.body, { new: true, upsert: true });
        res.status(200).json(updatedSettings);
    } catch (error) {
        res.status(500).json({ message: 'Error updating settings' });
    }
};

module.exports = { getSettings, updateSettings };