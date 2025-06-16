// Script to seed the database with test salon data
// server/seedSalons.js
require('dotenv').config();
const mongoose = require('mongoose');
const Salon = require('./models/Salon');
const connectDB = require('./config/db');

// Connect to the database
connectDB();

// Sample salon data (locations around a central point - adjust coordinates as needed)
const salonData = [
  {
    name: "Style & Scissors",
    address: "123 Main St, City Center",
    image: "/images/default-salon.jpg",
    location: {
      type: "Point",
      coordinates: [77.2090, 28.6139] // Delhi coordinates
    }
  },
  {
    name: "Trendy Cuts",
    address: "456 Market Ave, Downtown",
    image: "/images/default-salon.jpg",
    location: {
      type: "Point",
      coordinates: [77.2140, 28.6160] // Near Delhi
    }
  },
  {
    name: "Hair Masters",
    address: "789 Fashion Blvd, Uptown",
    image: "/images/default-salon.jpg",
    location: {
      type: "Point",
      coordinates: [77.2050, 28.6120] // Near Delhi
    }
  },
  {
    name: "Clipper's Edge",
    address: "321 Style St, Westside",
    image: "/images/default-salon.jpg",
    location: {
      type: "Point",
      coordinates: [77.2000, 28.6100] // Near Delhi
    }
  },
  {
    name: "Elegant Salon & Spa",
    address: "654 Beauty Rd, Eastside",
    image: "/images/default-salon.jpg",
    location: {
      type: "Point",
      coordinates: [77.2200, 28.6200] // Near Delhi
    }
  },
  {
    name: "The Barber Shop",
    address: "987 Trim Lane, Northside",
    image: "/images/default-salon.jpg",
    location: {
      type: "Point",
      coordinates: [77.2100, 28.6250] // Near Delhi
    }
  }
];

// Function to seed the database
const seedDatabase = async () => {
  try {
    // Clear existing salons
    await Salon.deleteMany({});
    console.log('Cleared existing salon data');
    
    // Insert new salons
    await Salon.insertMany(salonData);
    console.log('Successfully seeded salon data');
    
    // Disconnect from the database
    mongoose.disconnect();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding database:', error);
    mongoose.disconnect();
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();
