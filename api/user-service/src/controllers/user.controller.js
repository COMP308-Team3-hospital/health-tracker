const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const newUser = new User({ name, email, password, role });
    await newUser.save();
    res.status(201).send("User registered successfully");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user || !(await user.isValidPassword(password))) {
        return res.status(401).send("Invalid email or password.");
      }

      // Generate a token
      const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1h'  // Token expires in 1 hour
      });

      res.status(200).json({
        message: "Login successful",
        token,
        userId: user._id,
        role: user.role
      });
    } catch (error) {
      res.status(500).json({ message: "Server error during login." });
    }
  };
