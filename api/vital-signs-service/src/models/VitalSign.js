const mongoose = require('mongoose');

const VitalSignSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    bodyTemperature: { type: Number, required: true },
    bloodPressure: { type: String, required: true },
    respiratoryRate: { type: Number, required: true },
    recordedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('VitalSign', VitalSignSchema);
