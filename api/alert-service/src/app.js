const express = require('express');
const mongoose = require('mongoose');
const alertRoutes = require('./routes/alertRoutes');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected for Alert Service"))
    .catch(err => console.error("MongoDB connection error:", err));

app.use('/api/alerts', alertRoutes);

if (process.env.NODE_ENV !== 'test') {
    const server = app.listen(process.env.PORT || 5000, () => console.log(`Server running on port ${process.env.PORT || 5002}`));
    module.exports = server;
  } else {
    module.exports = app; // For testing, export app without starting the server
  }