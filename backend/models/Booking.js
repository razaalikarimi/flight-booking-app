const mongoose = require("mongoose");

const passengerSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    age: Number,
  },
  { _id: false }
);

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    flightId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flight",
      required: true,
    },
    passengerInfo: passengerSchema,
    totalPrice: { type: Number, required: true },
    travelDate: { type: String, required: true },
    bookingDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
