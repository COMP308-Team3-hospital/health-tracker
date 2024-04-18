// Importing dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/user.routes');

// Load environment variables
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

const app = express();

// Middleware
app.use(cors());
app.use(express.json());  // for parsing application/json

// Routes
app.use('/api/users', userRoutes);

if (process.env.NODE_ENV !== 'test') {
  const server = app.listen(process.env.PORT || 5000, () => console.log(`Server running on port ${process.env.PORT || 5000}`));
  module.exports = server;
} else {
  module.exports = app; // For testing, export app without starting the server
}