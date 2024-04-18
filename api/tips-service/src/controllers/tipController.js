const Tip = require('../models/Tip');

exports.createTip = async (req, res) => {
    const { nurseId, patientId, message } = req.body;
    try {
        const newTip = new Tip({ nurseId, patientId, message });
        await newTip.save();
        res.status(201).json(newTip);
    } catch (error) {
        res.status(400).json({ message: "Error creating tip", error: error.message });
    }
};

exports.getTipsByPatient = async (req, res) => {
    try {
        const { patientId } = req.params;
        const tips = await Tip.find({ patientId });
        res.status(200).json(tips);
    } catch (error) {
        res.status(500).json({ message: "Error fetching tips", error: error.message });
    }
};
