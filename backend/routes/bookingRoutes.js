const express = require("express");
const Booking = require("../models/Booking");
const Flight = require("../models/Flight");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", protect, async (req, res) => {
  try {
    const { flightId, passengerInfo, totalPrice, travelDate } = req.body;
    const flight = await Flight.findById(flightId);
    if (!flight) return res.status(404).json({ message: "Flight not found" });

    const booking = await Booking.create({
      userId: req.user._id,
      flightId,
      passengerInfo,
      totalPrice,
      travelDate,
    });

    res.status(201).json(booking);
  } catch (err) {
    console.error("Booking create error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:id", protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("flightId")
      .populate("userId", "name email");
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    if (booking.userId._id.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });
    res.json(booking);
  } catch (err) {
    console.error("Get booking error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
