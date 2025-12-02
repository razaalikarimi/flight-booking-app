const mongoose = require("mongoose");
require("dotenv").config();
const Flight = require("../models/Flight");

async function main() {
  await mongoose.connect(
    process.env.MONGO_URI || "mongodb://127.0.0.1:27017/flight_app"
  );
  const flights = await Flight.find().lean();
  console.log("FLIGHTS IN DB:", flights);
  await mongoose.disconnect();
}
main().catch((err) => {
  console.error(err);
  process.exit(1);
});
