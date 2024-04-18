const VitalSign = require('../models/VitalSign');

exports.addVitalSign = async (req, res) => {
    const { patientId, bodyTemperature, bloodPressure, respiratoryRate } = req.body;
    try {
        const newVitalSign = new VitalSign({
            patientId,
            bodyTemperature,
            bloodPressure,
            respiratoryRate
        });
        await newVitalSign.save();
        res.status(201).json(newVitalSign);
    } catch (error) {
        res.status(400).json({ message: "Error adding vital sign", error: error.message });
    }
};

exports.getVitalSigns = async (req, res) => {
    try {
        const vitalSigns = await VitalSign.find();
        res.status(200).json(vitalSigns);
    } catch (error) {
        res.status(500).json({ message: "Error fetching vital signs", error: error.message });
    }
};
