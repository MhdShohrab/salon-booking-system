// 4th div of home section(near by saloon)
// Connects to MongoDB database using Mongoose
// server/config/db.js

const mongoose = require("mongoose");

// Load the URI from environment variables
const uri = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    // Try connecting to MongoDB
    const conn = await mongoose.connect(uri);

    // Use backticks for template literals
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    // Use backticks here as well
    console.error(`Error: ${err.message}`);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB;
