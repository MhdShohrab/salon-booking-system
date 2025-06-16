// # First terminal (backend) ->5000 port pe chal rha
// cd server
// nodemon server.js

// # Second terminal (frontend)  ->3000 port pe chal rha
// cd ..\client
// npm start

//ctrl C to terminate the live server.
//this file Starts Express server and connects routes/middleware
//server/server.js file
require('dotenv').config(); // <-- Must be the first thing
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db');

// Import routes
const salonRoutes = require('./routes/salonRoutes');
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/bookings');

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Mount routes
app.use('/api/salons', salonRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);

// Simple test route
app.get('/', (req, res) => {
  res.send('Salon booking API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));