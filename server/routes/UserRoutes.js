require("dotenv").config();
const express = require("express");
const { User, Feedback } = require("../models");
const bcrypt = require("bcryptjs"); // Import bcryptjs for password hashing
const router = express.Router();

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).send(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Create a new user
router.post("/", async (req, res) => {
  const { name, email, password, google_id } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      google_id,
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login route for users
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Compare password with hashed password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    // Send success response with user details (you can also send a JWT here)
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new feedback
router.post("/feedback", async (req, res) => {
  try {
    const { content, userId, position, company, image_url } = req.body;

    // Validate required fields
    if (!content || !userId || !position || !company) {
      return res
        .status(400)
        .json({ error: "All fields except image_url are required" });
    }

    // Check if the user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create feedback
    const feedback = await Feedback.create({
      content,
      user_id: userId,
      position,
      company,
      image_url: image_url || null, // If image_url is not provided, set it to null
    });

    res.status(201).json(feedback);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/feedbacks", async (req, res) => {
  try {
    // Retrieve all feedbacks from the database
    const feedbacks = await Feedback.findAll({
      include: {
        model: User, // Include associated user information (e.g., name, email)
        as: 'user', // Use the alias defined in the model
        attributes: ["name", "email"], // Only include name and email for the user
      },
    });

    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
