const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email !== process.env.DEFAULT_USER_EMAIL ||
      password !== process.env.DEFAULT_USER_PASSWORD
    ) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name: "Test User", email, password });
    }

    const token = generateToken(user._id);
    return res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
