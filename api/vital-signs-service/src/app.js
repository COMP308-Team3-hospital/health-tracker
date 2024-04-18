const express = require('express');
const mongoose = require('mongoose');
const vitalSignRoutes = require('./routes/vitalSignRoutes');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected for Vital Signs"))
    .catch(err => console.error("MongoDB connection error:", err));

app.use('/api/vitalsigns', vitalSignRoutes);

if (process.env.NODE_ENV !== 'test') {
    const server = app.listen(process.env.PORT || 5001, () => console.log(`Vital Signs Service running on port ${process.env.PORT || 5001}`));
    module.exports = server;
} else {
    module.exports = app;  // Export without listening during tests
}