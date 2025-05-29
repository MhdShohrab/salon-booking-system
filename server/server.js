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
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const salonRoutes = require('./routes/salonRoutes'); // 👈 Correct path

dotenv.config();
connectDB(); // DB connection

const app = express(); // 👈 Define app before use
app.use(cors());
app.use(express.json());

// Mount routes// 4th div of home section(near by saloon)
app.use('/api/salons', salonRoutes); // 👈 Now works fine

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));