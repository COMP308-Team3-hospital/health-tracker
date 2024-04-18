const express = require('express');
const mongoose = require('mongoose');
const tipRoutes = require('./routes/tipRoutes');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected for Tips Service"))
    .catch(err => console.error("MongoDB connection error:", err));

app.use('/api/tips', tipRoutes);

if (process.env.NODE_ENV !== 'test') {
    const server = app.listen(process.env.PORT || 5003, () => console.log(`Server running on port ${process.env.PORT || 5003}`));
    module.exports = server;
  } else {
    module.exports = app; // For testing, export app without starting the server
  }