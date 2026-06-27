const ActivityLog = require('../models/activityLogModel');

const getLogs = async (req, res) => {
    try {
        const logs = await ActivityLog.find().sort({ timestamp: -1 });
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching logs' });
    }
};

module.exports = { getLogs };