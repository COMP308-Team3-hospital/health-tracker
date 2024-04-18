const Alert = require('../models/Alert');

exports.createAlert = async (req, res) => {
    const { patientId, message } = req.body;
    try {
        const newAlert = new Alert({ patientId, message });
        await newAlert.save();
        res.status(201).json(newAlert);
    } catch (error) {
        res.status(400).json({ message: "Error creating alert", error: error.message });
    }
};

exports.getAlerts = async (req, res) => {
    try {
        const alerts = await Alert.find();
        res.status(200).json(alerts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching alerts", error: error.message });
    }
};
