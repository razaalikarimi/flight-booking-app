const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema(
  {
    airlineName: { type: String, required: true },
    airlineLogo: { type: String },
    flightNumber: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    departureTime: { type: String, required: true },
    arrivalTime: { type: String, required: true },
    duration: { type: String, required: true },
    price: { type: Number, required: true },
    date: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Flight", flightSchema);
