require('dotenv').config();
const express = require('express');
const { User } = require('../models');  // Import User model
const bcrypt = require('bcryptjs'); // Import bcryptjs for password hashing
const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).send(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Create a new user
router.post('/', async (req, res) => {
  try {
    const { name, email, password, google_id } = req.body;

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword, google_id });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login route for users
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    // Compare password with hashed password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Incorrect password' });
    }

    // Send success response with user details (you can also send a JWT here)
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




module.exports = router;
