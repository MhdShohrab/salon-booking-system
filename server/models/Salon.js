// 4th div of home section(near by saloon)
// Mongoose model for the "salons" collection
// server/models/Salon.js
// schema of location

const mongoose = require("mongoose");

const SalonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  // add more fields as needed
});

module.exports = mongoose.model("Salon", SalonSchema);
