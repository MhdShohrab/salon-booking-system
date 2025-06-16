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
  image: {
    type: String,
    default: "/images/default-salon.jpg",
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
      index: '2dsphere'
    }
  },
  // For backward compatibility
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
  // add more fields as needed
});

// Create a compound index for faster geospatial queries
SalonSchema.index({ location: '2dsphere' });

module.exports = mongoose.model("Salon", SalonSchema);
