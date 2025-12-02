const express = require("express");
const Flight = require("../models/Flight");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/all-debug", async (req, res) => {
  const flights = await Flight.find().lean();
  res.json({ flights });
});

router.post("/search", protect, async (req, res) => {
  try {
    const { from, to, travelDate, passengers } = req.body;
    console.log("Search request:", {
      from,
      to,
      travelDate,
      passengers,
      user: req.user?.email,
    });

    const flights = await Flight.find({
      from: { $regex: new RegExp(`^${from}$`, "i") },
      to: { $regex: new RegExp(`^${to}$`, "i") },
      date: travelDate,
    });

    return res.json({ flights, passengers });
  } catch (err) {
    console.error("Flight search error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
