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
    console.log(`Found ${salons.length} salons in database`);
    
    // Compute distance for each salon
    const salonsWithDistance = salons.map((salon) => {
      let salonLat, salonLon;
      
      // Handle both data formats (new and old)
      if (salon.location && salon.location.coordinates && salon.location.coordinates.length === 2) {
        // New format - using GeoJSON [longitude, latitude]
        [salonLon, salonLat] = salon.location.coordinates;
      } else if (salon.latitude !== undefined && salon.longitude !== undefined) {
        // Old format - separate latitude and longitude fields
        salonLat = salon.latitude;
        salonLon = salon.longitude;
      } else {
        // Skip salons without location data
        return null;
      }
      
      const distance = getDistanceFromLatLonInMeters(
        parseFloat(latitude),
        parseFloat(longitude),
        salonLat,
        salonLon
      );
      
      return { 
        _id: salon._id,
        name: salon.name,
        address: salon.address,
        image: salon.image,
        distance: distance
      };
    }).filter(salon => salon !== null);
    
    // Sort salons by distance (nearest first)
    salonsWithDistance.sort((a, b) => a.distance - b.distance);
    
    console.log(`Returning ${salonsWithDistance.length} salons with distances`);
    
    // Return the sorted salons
    res.json(salonsWithDistance);
  } catch (err) {
    console.error("Error fetching nearby salons:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
