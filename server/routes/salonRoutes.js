// 4th div of home section(near by saloon)
// routes/salonRoutes.js
//ye file database se data fetch krke deta h.
// API endpoint logic for getting salons from DB
//db se data yahi fetch kr rha h.
const express = require("express");
const router = express.Router();
const Salon = require("../models/Salon");

// Utility function to calculate distance between two coordinates (in meters)
const getDistanceFromLatLonInMeters = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371000; // Earth's radius in meters
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// ===========================
// GET /api/salons/nearby
// ===========================
router.get("/nearby", async (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res
      .status(400)
      .json({ message: "Latitude and longitude are required" });
  }

  try {
    // Fetch all salons from the database
    const salons = await Salon.find();
    // Compute distance for each salon if coordinates exist
    const salonsWithDistance = await salons
      ?.filter((salon) => salon?.location && salon?.location?.coordinates)
      .map((salon) => {
        const [lon, lat] = salon.location.coordinates; // GeoJSON format: [longitude, latitude]
        const distance = getDistanceFromLatLonInMeters(
          parseFloat(latitude),
          parseFloat(longitude),
          lat,
          lon
        );
        return { ...salon._doc, distance };
      });
    // Sort salons by distance (nearest first)
    salonsWithDistance.sort((a, b) => a.distance - b.distance);
    // Return the sorted salons
    res.json(salonsWithDistance);
  } catch (err) {
    console.error("Error fetching nearby salons:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// oigesjghoehjrh

// router.post('/nearby',async(req,res)=>{
//   const {latitude , longitude, name} = req.body
//   res.json(sa)
// })

module.exports = router;
